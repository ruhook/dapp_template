import { useEffect, useState } from "react";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { injected } from "@/config/constants/wallets";
import { isMobile } from "web3modal";
import { connectorLocalStorageKey } from "@/config/connectors";

export function useEagerConnect() {
    const { activate, active } = useWeb3ReactCore();
    const [tried, setTried] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: any) => {
            const hasSignedIn = window.localStorage.getItem(connectorLocalStorageKey);

            if (isAuthorized && hasSignedIn) {
                activate(injected, undefined, true)
                    .catch(() => {
                        setTried(true);
                    });
                // @ts-ignore TYPE NEEDS FIXING
                window.ethereum.removeAllListeners(["networkChanged"]);
            } else {
                if (isMobile() && window.ethereum && hasSignedIn) {
                    activate(injected, undefined, true)
                        .catch(() => {
                            setTried(true);
                        });
                    // @ts-ignore TYPE NEEDS FIXING
                    window.ethereum.removeAllListeners(["networkChanged"]);
                } else {
                    setTried(true);
                }
            }
        });
    }, [activate]);

    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);

    return tried;
}

export default useEagerConnect;
