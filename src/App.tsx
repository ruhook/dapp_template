import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import Web3ReactManager from "@/components/Web3ReactManager/index";

import { NetworkContextName } from "@/config";

import Home from "@/page/Home";

export function getLibrary(provider: any): Web3Provider {
    // const library = new JsonRpcProvider(RPC_URL, chainId)
    const library = new Web3Provider(provider);
    library.pollingInterval = 15000;
    return library;
}
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Router>
                    <Web3ReactManager>
                        <Route path="/" exact component={Home} />
                    </Web3ReactManager>
                </Router>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default App;
