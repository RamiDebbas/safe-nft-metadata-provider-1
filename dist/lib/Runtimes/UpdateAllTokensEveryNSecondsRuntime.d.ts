import CollectionDataUpdater from "../../CollectionDataUpdater";
import RuntimeInterface from "../RuntimeInterface";
export default class UpdateAllTokensEveryNSecondsRuntime implements RuntimeInterface {
    private delay;
    constructor(delay: number);
    run(collectionDataUpdater: CollectionDataUpdater): Promise<void>;
}
