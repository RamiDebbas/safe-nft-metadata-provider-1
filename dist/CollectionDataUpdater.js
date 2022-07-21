"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionDataUpdater {
    tokenRevealStatusProvider;
    dataRevealers;
    runtimes;
    constructor(tokenRevealStatusProvider, dataRevealers, runtimes) {
        this.tokenRevealStatusProvider = tokenRevealStatusProvider;
        this.dataRevealers = dataRevealers;
        this.runtimes = runtimes;
    }
    async updateSingleToken(tokenId) {
        await this.tokenRevealStatusProvider.refresh();
        await this.updateSingleTokenWithoutRefreshing(tokenId);
    }
    async updateAllTokens() {
        await this.tokenRevealStatusProvider.refresh();
        for (const tokenId of await this.tokenRevealStatusProvider.getTokenIds()) {
            await this.updateSingleTokenWithoutRefreshing(tokenId);
        }
    }
    async start() {
        if (this.runtimes.length === 0) {
            console.log("No runtime available, waiting for direct calls...");
            return;
        }
        for (const runtime of this.runtimes) {
            runtime.run(this);
        }
    }
    async updateSingleTokenWithoutRefreshing(tokenId) {
        for (const dataRevealer of this.dataRevealers) {
            await dataRevealer.updateToken(tokenId, await this.tokenRevealStatusProvider.isTokenRevealed(tokenId));
        }
    }
}
exports.default = CollectionDataUpdater;
