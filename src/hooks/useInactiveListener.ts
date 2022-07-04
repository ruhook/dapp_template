import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { useEffect } from "react";

import { injected } from "@/config/constants/wallets";

/**
 * 对于登录的用户进行事件注册
 */
function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3ReactCore();

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {
                activate(injected, undefined, true).catch((error) => {
                    console.error("Failed to activate after chain changed", error);
                });
            };

            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    activate(injected, undefined, true).catch((error) => {
                        console.error("Failed to activate after accounts changed", error);
                    });
                }
            };

            ethereum.on("chainChanged", handleChainChanged);
            ethereum.on("accountsChanged", handleAccountsChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("chainChanged", handleChainChanged);
                    ethereum.removeListener("accountsChanged", handleAccountsChanged);
                }
            };
        }
        return undefined;
    }, [active, error, suppress, activate]);
}

export default useInactiveListener;
