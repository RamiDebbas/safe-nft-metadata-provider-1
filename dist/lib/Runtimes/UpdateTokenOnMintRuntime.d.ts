import CollectionDataUpdater from "../../CollectionDataUpdater";
import ERC721Contract from "../Util/Contracts/ERC721Contract";
import RuntimeInterface from "../RuntimeInterface";
export default class UpdateTokenOnMintRuntime implements RuntimeInterface {
    private contract;
    private fromAddress;
    constructor(contract: ERC721Contract, fromAddress?: string);
    run(collectionDataUpdater: CollectionDataUpdater): Promise<void>;
}
