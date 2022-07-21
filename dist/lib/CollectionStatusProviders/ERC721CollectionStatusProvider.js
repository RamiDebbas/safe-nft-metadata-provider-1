"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class ERC721CollectionStatusProvider {
    contract;
    totalSupply = ethers_1.BigNumber.from(0);
    tokenIds = [];
    startTokenId;
    constructor(contract, startTokenId = 1) {
        this.contract = contract;
        this.startTokenId = ethers_1.BigNumber.from(startTokenId);
    }
    async getTokenIds() {
        if (this.tokenIds.length === 0) {
            const maxSupply = await this.contract.maxSupply();
            for (let i = this.startTokenId; i.lte(maxSupply); i = i.add(1)) {
                this.tokenIds.push(i);
            }
        }
        return this.tokenIds;
    }
    async isTokenRevealed(tokenId) {
        return tokenId.lte(this.totalSupply);
    }
    async refresh() {
        this.totalSupply = await this.contract.totalSupply();
    }
}
exports.default = ERC721CollectionStatusProvider;
