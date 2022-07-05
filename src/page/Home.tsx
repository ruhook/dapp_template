import React from "react";
import { useEffect } from "react";
import { injected } from "@/config/constants/wallets";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { connectorLocalStorageKey } from "@/config/connectors";
import useTest from '@/stores/useTest'

export default function Home() {
    const { account, chainId, error, activate } = useActiveWeb3React();
    const {count, inc, fetch} = useTest()
    fetch()
    useEffect(() => {
        console.log(window.localStorage.getItem(connectorLocalStorageKey));

        activate(injected, undefined, true).catch(() => {
            activate(injected);
        });
    }, []);

    return <div>{account} ---- {count}</div>;
}
