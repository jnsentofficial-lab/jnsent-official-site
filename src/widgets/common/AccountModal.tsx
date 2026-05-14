"use client";

import { util } from "@/shared/utils/util";
import { useConfirmModalStore } from "@/entities/common/store/useConfirmModalStore";
import Modal from "@/shared/ui/composed/Modal";

const ConfirmProxySubscriptionModal = () => {
    const { confirmModalState, setConfirmModalState, confirmModal } = useConfirmModalStore();

    return (
        <Modal
            title="선택하신 매장의 구독 결제를 시작할게요"
            description="아래 사항을 확인해주세요."
            open={confirmModalState("proxySubscription")}
            onClose={() => {
                setConfirmModalState("proxySubscription", false);
            }}
            actions={[
                {
                    type: "close",
                    title: "취소",
                    className: "border border-[var(--color-gray-200)]",
                },
                {
                    type: "action",
                    title: "시작하기",
                    className: "bg-[var(--color-blue-500)] text-white",
                    onClick: () => {
                        confirmModal("proxySubscription");
                    },
                },
            ]}
        >
            <Modal.Container className="p-[1.2rem]">
                <Modal.Item>
                    <ul className="w-full text-[1.4rem] leading-normal bg-[var(--color-gray-50)] p-[1.2rem] rounded-[0.8rem]">
                        <li className="mb-[0.8rem] before:content-['•'] before:mr-[0.6rem] before:text-[var(--color-gray-400)] leading-[1.5]">
                            <span className="keyword-focus-sm">{util.string.getCurrentDateKor("", 2)}</span>기준으로 정기결제가 이루어져요.
                        </li>

                        <li className="before:content-['•'] before:mr-[0.6rem] before:text-[var(--color-gray-400)] leading-[1.5]">
                            <span className="keyword-focus-sm">결제일 기준 30일 뒤</span> 마다 이 결제돼요.
                        </li>
                    </ul>
                </Modal.Item>
            </Modal.Container>
        </Modal>
    );
};

const Account = {
    Add: ConfirmProxySubscriptionModal,
};

export default Account;
