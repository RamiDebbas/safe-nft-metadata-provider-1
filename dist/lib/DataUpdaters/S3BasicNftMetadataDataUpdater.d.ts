import { BigNumber } from "ethers";
import S3ConfigurationInterface from "../Util/S3/S3ConfigurationInterface";
import S3BasicFileDataUpdater from "./S3BasicFileDataUpdater";
export default class S3BasicNftMetadataDataUpdater extends S3BasicFileDataUpdater {
    private metadataUpdater;
    constructor(resourceName: string, s3Config: S3ConfigurationInterface, sourcePath: string, destinationPath: string, metadataUpdater: (tokenId: BigNumber, metadata: any) => any, fileExtension?: string);
    protected revealToken(tokenId: BigNumber): Promise<void>;
}
