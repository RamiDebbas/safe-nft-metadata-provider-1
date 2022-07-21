"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateAllTokensEveryNSecondsRuntime {
    delay;
    constructor(delay) {
        this.delay = delay;
    }
    async run(collectionDataUpdater) {
        await collectionDataUpdater.updateAllTokens();
        setTimeout(() => this.run(collectionDataUpdater), this.delay * 1000);
        console.log(`Next full update will be run in ${this.delay} seconds...`);
    }
}
exports.default = UpdateAllTokensEveryNSecondsRuntime;
