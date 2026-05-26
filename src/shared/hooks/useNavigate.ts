import { usePathname, useRouter } from "next/navigation";

const useNavigate = (fallbackUrl = "/new-home") => {
    const router = useRouter();
    const pathName = usePathname();

    const DEFENCE_ROUTE = ["/", "/new-home", "/check", "/password", "/exit/receipt", "/exit/payment"];

    // const checkSameRoute = (beforeRotue: string, afterRoute: string) => {
    //     return beforeRotue === afterRoute;
    // };

    const pushToUrl = (url: string, delay?: number) => {
        if (url === pathName) return;

        const MOVE = () => {
            setTimeout(() => router.push(url), delay ?? 0);
        };

        MOVE();
    };

    // 새탭으로 push하는 함수 추가
    const pushToUrlInNewTab = (url: string) => {
        // 새 탭에서 열기 (dirty 상태 확인할 필요 없음: 새창)
        if (!url) return;
        window.open(url, "_blank");
    };

    const replaceToUrl = (url: string, animation: boolean = true, alertSameRouteToUser: boolean = true) => {
        const MOVE = () => {
            router.replace(url);
        };

        MOVE();
    };

    const backToUrl = () => {
        const MOVE = () => {
            setTimeout(() => router.back(), 0);
        };

        MOVE();
    };

    return {
        pushToUrl,
        pushToUrlInNewTab, // 새탭 함수 반환
        replaceToUrl,
        backToUrl,
        currentPathName: pathName,
        isLandingPage: DEFENCE_ROUTE.includes(pathName),
    };
};

export default useNavigate;
