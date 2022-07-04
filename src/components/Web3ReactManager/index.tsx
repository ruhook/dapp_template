import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { network } from "@/config/constants/wallets";
import { NetworkContextName } from "@/config/index";

import useEagerConnect from "@/hooks/useEagerConnect";
import useInactiveListener from "@/hooks/useInactiveListener";

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
    const { active } = useWeb3React();
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);

    // 尝试连接到注入的提供者，如果它存在并且已经授予访问权限
    const triedEager = useEagerConnect();

    // 尝试注入后，如果网络连接从未处于活动状态或错误状态，请继续链接
    useEffect(() => {
        if (triedEager && !networkActive && !networkError && !active) {
            activateNetwork(network);
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active]);

    // 当没有连接帐户时, 对注入的 provider 进行事件注入
    useInactiveListener(!triedEager);

    // handle delayed loader state
    const [showLoader, setShowLoader] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // 在页面加载时，在尝试连接到注入的连接器之前，不要执行任何操作
    if (!triedEager) {
        return null;
    }

    // 未连接 或者 链接错误
    if (!active && networkError) {
        return <div>{ networkError?.message || 'unknownError'}</div>;
    }

    // if neither context is active, spin
    if (!active && !networkActive) {
        return showLoader ? <div>Loader</div> : null;
    }

    return children;
}
