import { BigNumber, Contract } from "ethers";
import CollectionStatusProviderInterface from "../CollectionStatusProviderInterface";
export default class ERC721CollectionStatusProvider implements CollectionStatusProviderInterface {
    private contract;
    private totalSupply;
    private tokenIds;
    private readonly startTokenId;
    constructor(contract: Contract, startTokenId?: BigNumber | number);
    getTokenIds(): Promise<BigNumber[]>;
    isTokenRevealed(tokenId: BigNumber): Promise<boolean>;
    refresh(): Promise<void>;
}
