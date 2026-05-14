import { create } from "zustand";

/**
 * NOTE:
 *
 * 항상 confirmModalStateSync(type)는 { isAgree, data } 구조로 반환(구조분해 할당만 지원)
 *
 * 1. 모달을 open할 때는 setConfirmModalState(type, true) 호출
 * 2. 모달에서 '확인' 또는 '취소'에 따른 confirmModal(type) / cancelModal(type, data?) 함수가 반드시 호출되어야 합니다.
 * 3. 동의/취소 여부 및 데이터는 await confirmModalStateSync(type) 으로 무조건 구조분해 할당 방식만 지원합니다.
 * 4. getConfirmModalResult(type)는 모달이 닫힐 때 true/false/undefined(초기)로 결과만 반환합니다.
 *
 * 📢 "getConfirmModalResult"는 **Promise가 아니고 동기적**으로 사용 전에 값만 조회합니다.
 * 📢 만약 아래와 같이
 *      setConfirmModalState("setDefaultMethod", true);
 *      const state = await getConfirmModalResult("setDefaultMethod");
 *      if (state) { ... }
 *   처럼 쓰면 state는 항상 (초기값) undefined이므로 조건이 작동하지 않습니다!
 *   즉 "await getConfirmModalResult"로 동의 여부를 바로 받을 수 없습니다.
 *
 * 항상 구조분해 할당:
 *    const { isAgree, data } = await confirmModalStateSync(type)
 * 만 사용하세요!
 *
 */

type ModalType =
    | "agencyPasswordReset"
    | "viewPaymentDetail"
    | "setDefaultMethod"
    | "deleteMethod"
    | "deleteStore"
    | "deleteProxyStore"
    | "confirmCancelSubscription"
    | "differentPlanCheck"
    | "alreadyPlanJoined"
    | "proxySubscription"
    | "confirmExpiredLogin"
    | "confirmLoggedOut"
    | "confirmSettlementComplete"
    | "changePlan";

interface ModalState {
    opened: boolean;
    confirmed?: boolean; // 마지막 confirm/cancel 결과 저장
    resolver?: (result: { isAgree: boolean; data: any }) => void;
    confirmData?: any; // confirm을 위한 any 타입 데이터 추가
    hasCustomResult?: boolean; // 마지막에 confirm/cancel 시 data param 사용 여부 저장
}

type Modals = Record<ModalType, ModalState>;

interface LayoutStoreType {
    modals: Modals;

    setConfirmModalState: (type: ModalType, open: boolean, confirmData?: any) => void;
    confirmModalState: (type: ModalType) => boolean;
    confirmModalStateSync: (type: ModalType) => Promise<{ isAgree: boolean; data: any }>; // 항상 구조분해 할당 방식만 지원

    confirmModal: (type: ModalType, data?: any) => void;
    cancelModal: (type: ModalType, data?: any) => void;

    getConfirmModalResult: (type: ModalType) => boolean | undefined;

    getConfirmModalData: (type: ModalType) => any;

    reset: () => void;
}

const modalTypes: ModalType[] = [
    "agencyPasswordReset",
    "viewPaymentDetail",
    "setDefaultMethod",
    "deleteMethod",
    "deleteStore",
    "deleteProxyStore",
    "confirmCancelSubscription",
    "differentPlanCheck",
    "alreadyPlanJoined",
    "proxySubscription",
    "confirmExpiredLogin",
    "confirmLoggedOut",
    "confirmSettlementComplete",
    "changePlan",
];

const getInitialModals = (): Modals =>
    modalTypes.reduce(
        (acc, type) => ({
            ...acc,
            [type]: { opened: false, confirmed: undefined, confirmData: undefined, hasCustomResult: false },
        }),
        {} as Modals,
    );

// 항상 confirmModalStateSync는 { isAgree, data } 형태 반환(구조분해 할당)
export const useConfirmModalStore = create<LayoutStoreType>((set, get) => ({
    modals: getInitialModals(),

    setConfirmModalState: (type: ModalType, open: boolean, confirmData?: any) => {
        set((state) => {
            const next: ModalState = { opened: open, confirmed: undefined, confirmData: open ? confirmData : undefined, hasCustomResult: false };
            if (open) {
                return {
                    modals: {
                        ...state.modals,
                        [type]: next,
                    },
                };
            } else {
                // 닫힐 때 resolver 있으면 비동의(isAgree: false) 처리, confirmed도 false로
                const prevResolver = state.modals[type].resolver;
                if (prevResolver) prevResolver({ isAgree: false, data: undefined });
                return {
                    modals: {
                        ...state.modals,
                        [type]: { opened: false, confirmed: false, confirmData: undefined, hasCustomResult: false },
                    },
                };
            }
        });
    },

    confirmModalState: (type: ModalType) => {
        return get().modals[type].opened;
    },

    /**
     * 항상 구조분해 할당 방식만:
     *    const { isAgree, data } = await confirmModalStateSync("cropImage");
     */
    confirmModalStateSync: (type: ModalType) => {
        const cur = get().modals[type];
        // 이미 열린 모달이면 기존 resolver에 연결
        if (cur.opened && cur.resolver) {
            return new Promise<{ isAgree: boolean; data: any }>((resolve) => {
                const origResolver = cur.resolver;
                // 중첩구현: 새로 할당되는 resolver가 결과 받을 때 resolve까지 호출
                get().modals[type].resolver = (result) => {
                    if (origResolver) origResolver(result);
                    // 항상 { isAgree, data } 객체만 resolve
                    if (typeof result === "object" && result !== null && "isAgree" in result && "data" in result) {
                        resolve(result as { isAgree: boolean; data: any });
                    } else {
                        // fallback: boolean이나 undefined 등 -> 항상 객체로 반환
                        resolve({ isAgree: Boolean(result), data: undefined });
                    }
                };
            });
        }
        return new Promise<{ isAgree: boolean; data: any }>((resolve) => {
            set((state) => ({
                modals: {
                    ...state.modals,
                    [type]: {
                        ...state.modals[type],
                        opened: true,
                        confirmed: undefined,
                        resolver: (result: any) => {
                            if (typeof result === "object" && result !== null && "isAgree" in result && "data" in result) {
                                resolve(result as { isAgree: boolean; data: any });
                            } else {
                                // fallback: boolean, undefined -> 객체 형태로 반환
                                resolve({ isAgree: Boolean(result), data: undefined });
                            }
                        },
                    },
                },
            }));
        });
    },

    confirmModal: (type: ModalType, data?: any) => {
        const { resolver } = get().modals[type];
        set((state) => {
            let newModalState: ModalState;
            if (resolver) {
                resolver({ isAgree: true, data });
                newModalState = {
                    opened: false,
                    confirmed: true,
                    confirmData: undefined,
                    hasCustomResult: true,
                };
            } else {
                newModalState = {
                    opened: false,
                    confirmed: true,
                    confirmData: undefined,
                    hasCustomResult: !!data,
                };
            }
            return {
                modals: {
                    ...state.modals,
                    [type]: newModalState,
                },
            };
        });
    },

    cancelModal: (type: ModalType, data?: any) => {
        const { resolver } = get().modals[type];
        set((state) => {
            let newModalState: ModalState;
            if (resolver) {
                resolver({ isAgree: false, data });
                newModalState = {
                    opened: false,
                    confirmed: false,
                    confirmData: undefined,
                    hasCustomResult: true,
                };
            } else {
                newModalState = {
                    opened: false,
                    confirmed: false,
                    confirmData: undefined,
                    hasCustomResult: !!data,
                };
            }
            return {
                modals: {
                    ...state.modals,
                    [type]: newModalState,
                },
            };
        });
    },

    getConfirmModalResult: (type: ModalType) => {
        return get().modals[type].confirmed;
    },

    getConfirmModalData: (type: ModalType) => {
        return get().modals[type]?.confirmData;
    },

    reset: () => set({ modals: getInitialModals() }),
}));
