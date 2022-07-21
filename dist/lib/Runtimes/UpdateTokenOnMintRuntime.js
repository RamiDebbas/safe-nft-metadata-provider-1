"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class UpdateTokenOnMintRuntime {
    contract;
    fromAddress;
    constructor(contract, fromAddress = ethers_1.ethers.utils.getAddress("0x0000000000000000000000000000000000000000")) {
        this.contract = contract;
        this.fromAddress = fromAddress;
    }
    async run(collectionDataUpdater) {
        this.contract.on(this.contract.filters.Transfer(this.fromAddress), async (from, to, tokenId) => {
            console.log(`Token #${tokenId} was minted by ${to}...`);
            await collectionDataUpdater.updateSingleToken(tokenId);
        });
    }
}
exports.default = UpdateTokenOnMintRuntime;
