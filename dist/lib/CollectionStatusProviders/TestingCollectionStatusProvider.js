"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class TestingCollectionStatusProvider {
    totalSupply;
    maxSupply;
    startTokenId;
    constructor(totalSupply = 1990, maxSupply = 10000, startTokenId = 1) {
        this.totalSupply = ethers_1.BigNumber.from(totalSupply);
        this.maxSupply = ethers_1.BigNumber.from(maxSupply);
        this.startTokenId = ethers_1.BigNumber.from(startTokenId);
    }
    async getTokenIds() {
        return [...Array(this.maxSupply).keys()].map(i => this.startTokenId.add(i));
    }
    async isTokenRevealed(tokenId) {
        return tokenId.lte(this.totalSupply);
    }
    async refresh() {
        // Nothing to do here...
    }
}
exports.default = TestingCollectionStatusProvider;
