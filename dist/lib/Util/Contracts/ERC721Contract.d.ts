import { Contract } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
export default class ERC721Contract extends Contract {
    constructor(address: string, providerOrRpcUrl: JsonRpcProvider | string);
}
