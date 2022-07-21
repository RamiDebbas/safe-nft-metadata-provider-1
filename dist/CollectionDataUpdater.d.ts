import { BigNumber } from "ethers";
import DataUpdaterInterface from "./lib/DataUpdaterInterface";
import RuntimeInterface from "./lib/RuntimeInterface";
import CollectionStatusProviderInterface from "./lib/CollectionStatusProviderInterface";
export default class CollectionDataUpdater {
    private tokenRevealStatusProvider;
    private dataRevealers;
    private runtimes;
    constructor(tokenRevealStatusProvider: CollectionStatusProviderInterface, dataRevealers: DataUpdaterInterface[], runtimes: RuntimeInterface[]);
    updateSingleToken(tokenId: BigNumber): Promise<void>;
    updateAllTokens(): Promise<void>;
    start(): Promise<void>;
    private updateSingleTokenWithoutRefreshing;
}
