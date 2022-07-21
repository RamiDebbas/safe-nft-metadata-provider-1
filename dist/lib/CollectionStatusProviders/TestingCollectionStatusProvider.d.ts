import { BigNumber } from "ethers";
import CollectionStatusProviderInterface from "../CollectionStatusProviderInterface";
export default class TestingCollectionStatusProvider implements CollectionStatusProviderInterface {
    private totalSupply;
    private maxSupply;
    private startTokenId;
    constructor(totalSupply?: number, maxSupply?: number, startTokenId?: number);
    getTokenIds(): Promise<BigNumber[]>;
    isTokenRevealed(tokenId: BigNumber): Promise<boolean>;
    refresh(): Promise<void>;
}
