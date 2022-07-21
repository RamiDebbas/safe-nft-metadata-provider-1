"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const providers_1 = require("@ethersproject/providers");
class ERC721Contract extends ethers_1.Contract {
    constructor(address, providerOrRpcUrl) {
        const provider = (typeof providerOrRpcUrl === "string") ? new providers_1.JsonRpcProvider(providerOrRpcUrl) : providerOrRpcUrl;
        super(address, [
            "function maxSupply() public view returns (uint256)",
            "function totalSupply() public view returns (uint256)",
            "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
        ], provider);
    }
}
exports.default = ERC721Contract;
