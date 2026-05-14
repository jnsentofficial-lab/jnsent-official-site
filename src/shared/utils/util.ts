type CheckIsEmptyParams<T> = {
    data: T | null;
    dispatchError: (action: { type: "SET_ERROR"; field: string; error: boolean }) => void;
    setToast: (args: { msg: string; time?: number }) => void;
    requiredFields: (string | string[])[];
};

export const util = {
    // 문자열 반환
    string: {
        // 함수 : 핸드폰 번호 치환
        formattedPhone: (target: string) => {
            let value = target.replace(/-/g, "").replace(/\D/g, "");
            value = value.length > 11 ? value.substring(0, 11) : value;

            return value.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },

        // 함수 : 생년월일 치환
        formattedBirthday: (target: string) => {
            const LIMIT = 8;
            let value = target.replace(/-/g, "").replace(/\D/g, "");
            value = value.length > LIMIT ? value.substring(0, LIMIT) : value;

            return value.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },

        // 함수 : 사업자 번호 치환
        formattedBizNo: (target: string) => {
            const LIMIT = 10;
            let value = target.replace(/-/g, "").replace(/\D/g, "");

            value = value.length > LIMIT ? value.substring(0, LIMIT) : value;

            return value.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
        },

        isKorean: (value: string) => {
            const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
            const hasHangul = regex.test(value);

            return hasHangul;
        },

        getCurrentDate: (target?: string, sliceYear: number = 2) => {
            const now = target ? new Date(target) : new Date();

            // 연도, 월, 일, 시, 분을 추출
            const year = now.getFullYear().toString().slice(-sliceYear); // 2자리 연도
            const month = String(now.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
            const day = String(now.getDate()).padStart(2, "0"); // 날짜
            const hours = String(now.getHours()).padStart(2, "0"); // 시간
            const minutes = String(now.getMinutes()).padStart(2, "0"); // 분

            // 원하는 형식으로 출력
            return `${year}.${month}.${day}`;
        },

        getCurrentPrevDateKor: (target?: string, sliceYear: number = 2, prevDay: number = 0) => {
            const now = target ? new Date(target) : new Date();

            // prevDay가 있을 경우, 날짜를 이전으로 이동
            if (prevDay) {
                now.setDate(now.getDate() - prevDay);
            }

            // 연도, 월, 일 추출
            const year = now.getFullYear().toString().slice(-sliceYear);
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");

            return `${year}년 ${month}월 ${day}일`;
        },

        getCurrentDateKor: (target?: string, sliceYear: number = 2) => {
            const now = target ? new Date(target) : new Date();

            // 연도, 월, 일, 시, 분을 추출
            const year = now.getFullYear().toString().slice(-sliceYear); // 2자리 연도
            const month = String(now.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
            const day = String(now.getDate()).padStart(2, "0"); // 날짜

            // 원하는 형식으로 출력
            return `${year}년 ${month}월 ${day}일`;
        },

        getCurrentTime: (target?: string, sliceYear: number = 2) => {
            const now = target ? new Date(target) : new Date();
            const IS_INVALID = isNaN(now.getTime());

            if (IS_INVALID) {
                return target;
            }

            // 연도, 월, 일, 시, 분을 추출
            const year = now.getFullYear().toString().slice(-sliceYear); // 2자리 연도
            const month = String(now.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
            const day = String(now.getDate()).padStart(2, "0"); // 날짜
            const hours = String(now.getHours()).padStart(2, "0"); // 시간
            const minutes = String(now.getMinutes()).padStart(2, "0"); // 분

            // 원하는 형식으로 출력
            return `${year}.${month}.${day} ${hours}:${minutes}`;
        },

        getCurrentTimeKor: (target?: string) => {
            const now = target ? new Date(target) : new Date();
            const IS_INVALID = isNaN(now.getTime());

            if (IS_INVALID) {
                return target;
            }

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, "0");

            const isAM = hours < 12;
            const period = isAM ? "오전" : "오후";
            // 0시는 오전 12시로, 오후 12시는 그대로 12시로 표기
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;

            return `${year}-${month}-${day} ${period} ${hour12.toString().padStart(2, "0")}:${minutes}`;
        },

        getCurrentFullTime: () => {
            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            const milliseconds = String(now.getMilliseconds()).padStart(3, "0"); // 밀리초 3자리

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        },

        getTestTime: () => {
            // 현재 시간에서 타임존 오프셋을 고려하여 ISO 문자열을 분리
            const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split("T");
            const time = date[1].split(".")[0];

            // 현재 날짜 객체
            const currentDate = new Date();

            // 요일을 문자열로 변환
            const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "short" }).toLowerCase();

            return { date, time, dayOfWeek };
        },

        /**
         * D-Day 계산 함수
         * @param target 대상 날짜 문자열 (ISO 등 호환되는 포맷)
         * @param options { noNegativeSign?: boolean } - true일 경우 - 안붙임 (절대값만 반환)
         * @returns { status, days, display }
         */
        getDDay: (target: string, options?: { noNegativeSign?: boolean }) => {
            const targetDateStr = target;
            const targetDate = new Date(targetDateStr); // 문자열을 Date 객체로 변환
            const today = new Date(); // 현재 날짜

            // 시간 차이 계산 (밀리초 기준)
            const diffTime = targetDate.getTime() - today.getTime();

            // 일 단위로 변환
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const status = diffDays >= 0 ? 0 : 1;

            let display: string;
            let isDelayed: boolean | undefined = undefined;

            if (options?.noNegativeSign) {
                display = Math.abs(diffDays).toString();
                isDelayed = diffDays < 0; // 날짜가 지났으면 true, 아니면 false
            } else {
                display = diffDays >= 0 ? `-${diffDays}` : `+${Math.abs(diffDays)}`;
            }

            return {
                status,
                days: options?.noNegativeSign ? Math.abs(diffDays) : diffDays,
                // days: diffDays,
                display,
                ...(options?.noNegativeSign ? { isDelayed } : {}),
            };
        },

        getExpiredDay: (date: string) => {
            const insDate = new Date(date);
            const openDate = new Date(insDate.getTime() + 25 * 60 * 60 * 1000);
            const now = new Date();
            const diffMS = openDate.getTime() - now.getTime();
            const hours = Math.floor(diffMS / (1000 * 60 * 60))
                .toString()
                .padStart(2, "0");
            const minutes = Math.floor((diffMS % (1000 * 60 * 60)) / (1000 * 60))
                .toString()
                .padStart(2, "0");
            const seconds = Math.floor((diffMS % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, "0");

            return {
                isExpired: diffMS > 0,
                time: `집계 중...${hours}시 ${minutes}분 남음`,
            };
            // return { isExpired: diffMS > 0, time: `집계 중...${hours}:${minutes}:${seconds}` }
        },

        /**
         * 다음 결제일 상태 확인 함수
         * @param {string} nextBillingDateStr - YYYY-MM-DD 등의 날짜 문자열
         * @returns {{
         *   isDateExceeded: boolean,         // 오늘이 결제일을 지났는지(초과했는지)
         *   isExceededOver3Days: boolean,    // 결제일 기준 7일 초과했는지
         *   STATE_NEED_PAY_ON_SERVICE: {     // days, status, display, isDelayed 등 반환 (getDDay 결과)
         *     status: number,
         *     days: number,
         *     display: string,
         *     isDelayed?: boolean
         *   }
         * }}
         */
        getNextBillingDateStatus: (nextBillingDateStr: string) => {
            // 날짜 문자열을 Date 객체로 변환
            const nextBillingDate = nextBillingDateStr ? new Date(nextBillingDateStr) : null;
            const today = new Date();

            // 초과 여부 체크: 오늘 > nextBillingDate
            const isDateExceeded = nextBillingDate ? today > nextBillingDate : false;

            // 7일 초과 여부 체크: (오늘 - nextBillingDate) > 7일 (밀리초 단위)
            let isExceededOver3Days = false;
            let daysLeft: number | undefined = undefined;
            if (nextBillingDate && isDateExceeded) {
                const msPerDay = 1000 * 60 * 60 * 24;
                const diffDays = Math.floor((today.getTime() - nextBillingDate.getTime()) / msPerDay);
                isExceededOver3Days = diffDays > 3;
                // 7일은 안 넘었으면 남은 일수 반환 (7 - diffDays)
                if (!isExceededOver3Days) {
                    daysLeft = 3 - diffDays;
                }
            }

            return {
                isDateExceeded,
                isExceededOver3Days,
                daysLeft,
                // ...(isDateExceeded && !isExceededOver3Days ? { daysLeft } : {})
            };
        },

        getCommaOnPrice: (price: string | number) => {
            if (isNaN(Number(price))) return "0";

            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        getRandomValue: (length: number) => {
            const chars: string = "abcdefghijklmnopqrstuvwxyz0123456789";
            let result: string = "";

            for (let i = 0; i < length; i++) {
                const randomIndex: number = Math.floor(Math.random() * chars.length);

                result += chars[randomIndex];
            }

            return result;
        },

        // 처음 태그 한 값 / 결제시 확인된 값
        getDistance: ({ lat1, lon1, lat2, lon2 }: { lat1: number; lon1: number; lat2: number; lon2: number }) => {
            const distance = ({ lat1, lon1, lat2, lon2 }: { lat1: number; lon1: number; lat2: number; lon2: number }) => {
                const R = 6371; // 지구 반지름 (단위: km)
                const dLat = deg2rad(lat2 - lat1);
                const dLon = deg2rad(lon2 - lon1);
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distanceKiloMeters = R * c; // 두 지점 간의 거리 (단위: km)
                const distanceMeters = Math.round(distanceKiloMeters * 1000);
                return { distanceKiloMeters, distanceMeters };
            };

            const deg2rad = (deg: number) => {
                return deg * (Math.PI / 180);
            };

            return distance({ lat1, lon1, lat2, lon2 });
        },
    },

    // DOM 조작
    dom: {
        setScrollDefence: (target: boolean) => {
            const WRAPPER_ID = "__scroll-defence-wrapper__";
            const existingWrapper = document.getElementById(WRAPPER_ID);

            if (target) {
                if (existingWrapper) return; // 이미 적용됨

                const wrapper = document.createElement("div");
                wrapper.id = WRAPPER_ID;
                wrapper.style.position = "fixed";
                wrapper.style.top = "0";
                wrapper.style.left = "0";
                wrapper.style.width = "100%";
                wrapper.style.height = "100%";
                wrapper.style.overflow = "hidden";
                wrapper.style.zIndex = "9999"; // 모달 위로
                wrapper.style.pointerEvents = "none"; // 기존 UI 조작 방지 X
                document.body.appendChild(wrapper);
                document.body.style.overflow = "hidden";
            } else {
                if (existingWrapper) {
                    existingWrapper.remove();
                    document.body.style.overflow = "";
                }
            }
        },

        // 대상의 스크롤 값을 0으로 변경
        setScrollTop: (target: string) => {
            const anchorElement = document.querySelector(target);

            if (anchorElement) {
                anchorElement.scrollTo({ top: 0 });
            }
        },

        setScrollDown: (target: string) => {
            const anchorElement = document.querySelector(target);

            if (anchorElement) {
                anchorElement.scrollTo({
                    top: anchorElement.scrollHeight,
                    behavior: "smooth",
                });
            }
        },

        getMaxWidthOnSpecificRoute: (currentRouteName: string) => {
            const WIDE_PC_MAX_2X_WIDTH_ROUTE = currentRouteName === "/history/sale";
            const WIDE_PC_MAX_WIDTH_ROUTE =
                currentRouteName === "/plan/select" ||
                currentRouteName === "/master" ||
                currentRouteName === "/history/detail" ||
                currentRouteName === "/history/chargeAndRefund" ||
                currentRouteName === "/history/prepaid" ||
                currentRouteName === "/product" ||
                currentRouteName === "/product/cashCharge" ||
                currentRouteName === "/settings/kiosk" ||
                currentRouteName === "/settings/storeAccount" ||
                currentRouteName === "/account" ||
                currentRouteName === "/home" ||
                currentRouteName === "/account/event";
            // const PC_MAX_WIDTH_ROUTE = currentRouteName === "/plan/status" || currentRouteName === "/plan/method";
            const TABLET_MAX_WIDTH_ROUTE = currentRouteName === "/product";
            const PHABLET_MAX_WIDTH_ROUTE = currentRouteName === "/";
            const MOBILE_MAX_WIDTH_ROUTE = currentRouteName === "/";

            if (WIDE_PC_MAX_2X_WIDTH_ROUTE) {
                return "max-w-[var(--size-pc-full-hd)]";
            }

            if (WIDE_PC_MAX_WIDTH_ROUTE) {
                return "max-w-[var(--size-pc-wide)]";
            }

            // if (PC_MAX_WIDTH_ROUTE) {
            //     return "max-w-[var(--size-pc)]";
            // }

            if (TABLET_MAX_WIDTH_ROUTE) {
                return "max-w-[var(--size-tablet)]";
            }

            if (PHABLET_MAX_WIDTH_ROUTE) {
                return "max-w-[var(--size-phablet)]";
            }

            if (MOBILE_MAX_WIDTH_ROUTE) {
                return "max-w-[var(--size-phablet)]";
            }

            return "max-w-[var(--size-pc)]";
        },
    },

    api: {
        checkIsEmptyArray: (data: any) => {
            return !Object.keys(data).length;
        },

        checkResult: (data: any) => {
            // api 호출 후 서버에서 처리한 결과 !== 통신 결과
            // 1이 정상
            return data.status === 200;
        },

        checkResultNew: (data: any) => {
            // api 호출 후 서버에서 처리한 결과 !== 통신 결과
            // 1이 정상
            return data.header?.ResultCode === 0;
        },

        checkIsSuccessful: (data: any) => {
            if (data) {
                return data.header.IsSuccessful;
            }
        },

        checkCIisAvailable: (token: string) => {
            //파라미터 혹은 쿠키,로컬 스토리지에 있는 CI 값 체크
            // const IS_HAVE_CI = window.localStorage.getItem("ci");

            return !!token;
        },

        getBodyDataOnResponse: (data: any) => {
            if (data) {
                return data.body;
            }
        },

        handleFailedMsg: (data: any) => {
            // api 콜 이후 발생 msg
            return data.statusText;
        },

        getApiReponse: ({
            msg,
            code = 999,
            success = false,
            payload = "",
            data = {},
            endpoint = "",
        }: {
            msg: string;
            code?: number;
            success?: boolean;
            payload?: any;
            data?: any;
            endpoint?: string;
        }) => {
            const result = {
                header: {
                    IsSuccessful: success,
                    ResultCode: code,
                    ResultMsg: msg,
                    pageNum: 0,
                    pageSize: 0,
                    totalCount: 0,
                    payload: payload,
                    endpoint: endpoint,
                },
                body: data,
            };

            return result;
        },

        setNestedValue: (obj: any, path: string[], value: any) => {
            let current = obj;
            path.slice(0, -1).forEach((key) => {
                if (!current[key] || typeof current[key] !== "object") {
                    current[key] = {};
                }
                current = current[key];
            });
            current[path[path.length - 1]] = value;
        },

        getNestedValue: (obj: any, path: string[]) => {
            return path.reduce((acc, key) => acc?.[key], obj);
        },

        callApi(url: string) {
            const NODE_ENV = process.env.NEXT_PUBLIC_DEV_URL ?? "development";
            let baseUrl = "http://www.test.com";

            switch (NODE_ENV) {
                // 개발 컴퓨터 + 개발 환경
                case "local":
                    // baseUrl = 'http://localhost:5000';
                    break;
                // 개발 컴퓨터 + 운영 환경
                case "local-production":
                    // baseUrl = 'http://localhost:5001';
                    break;
                // 개발 환경 ( 배포 )
                case "development":
                    baseUrl = "";
                    break;
                // 운영 환경 ( 배포 )
                case "production":
                    baseUrl = "";
                    break;
            }

            return baseUrl.concat(url);
        },

        getLog(log?: any, additionalLog?: any) {
            const now = new Date();

            return console.log(`${now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}: ${log}`, additionalLog);
        },
        debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
            let timerId: ReturnType<typeof setTimeout> | null;

            return (...args: Parameters<T>) => {
                if (timerId) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        },
    },

    analyze: {
        isMobile: () => {
            // 모바일 여부 확인하기
            // 현재 브라우저의 사용자 에이전트 문자열 가져오기
            const userAgent = navigator.userAgent;

            // 사용자 에이전트 문자열에 "Mobile" 또는 "Android" 문자열이 포함되어 있는지 확인
            return /Mobile|Android/.test(userAgent);
        },
        getCookie: (name: string): string | null => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
            return null;
        },
        getCurrentDevEnvironment: () => {
            return process.env.NEXT_PUBLIC_DEV_TYPE === "DEV";
        },
        hasEmptyValue: (obj: any) => {
            return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
        },
        debounce: <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
            let timer: ReturnType<typeof setTimeout> | null;

            return (...args: Parameters<T>) => {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(() => {
                    fn(...args);
                }, delay);
            };
        },
        async convertSha256(value: string) {
            const msgBuffer = new TextEncoder().encode(value);
            const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        },

        checkIsEmpty: <T extends Record<string, any>>({ data, dispatchError, setToast, requiredFields }: CheckIsEmptyParams<T>): boolean => {
            if (!data) {
                setToast({ msg: "입력값이 비어 있습니다.", time: 2 });
                return true;
            }

            let hasError = false;

            const checkField = (obj: any, fieldPath: (string | number)[]) => {
                const key = fieldPath[0];
                const next = obj?.[key];

                if (next === undefined) {
                    hasError = true;
                    dispatchError({
                        type: "SET_ERROR",
                        field: fieldPath.join("."),
                        error: true,
                    });
                    return;
                }

                if (fieldPath.length === 1) {
                    if (next === null || next === undefined || next === "" || next === 0) {
                        hasError = true;
                        dispatchError({
                            type: "SET_ERROR",
                            field: fieldPath.join("."),
                            error: true,
                        });
                    }
                } else {
                    if (Array.isArray(next)) {
                        next.forEach((item, idx) => checkField(item, fieldPath.slice(1)));
                    } else {
                        checkField(next, fieldPath.slice(1));
                    }
                }
            };

            requiredFields.forEach((field) => {
                if (Array.isArray(field)) {
                    checkField(data, field);
                } else {
                    checkField(data, [field]);
                }
            });

            if (hasError) {
                setToast({ msg: "필수 항목을 입력해주세요", time: 2 });
            }

            return hasError;
        },

        /**
         * 현재 환경이 주어진 타입과 일치하는지 확인하는 함수
         * @param envType "DEV" | "REAL" | "LOCAL" 등 환경 문자열 지정
         * @returns boolean
         *
         * 사용 예시: util.string.isCurrentEnv("DEV") 또는 util.string.isCurrentEnv("REAL")
         */
        isCurrentEnv: (envType: "DEV" | "REAL" | "LOCAL"): boolean => {
            const currentEnv = process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as string;
            return currentEnv.toUpperCase() === envType.toUpperCase();
        },

        getQASpecOnStore: (storeIdx: number) => {
            switch (storeIdx) {
                case 15:
                    return "구버전 사용중 이면서 결제수단 있음";

                case 23:
                    return "신버전 사용중 이면서 결제수단 있음";

                case 25:
                    return "구버전 사용중 이면서 결제수단 있으나 미납 요금 있음";

                case 26:
                    return "신버전 사용중 이면서 결제수단 있으나 미납 요금 있음";

                case 11:
                    return "구버전 사용중 이면서 결제수단은 없음";

                default:
                    break;
            }
        },
    },
};
