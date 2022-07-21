import * as S3 from "aws-sdk/clients/s3";
import { BigNumber } from "ethers";
import DataUpdaterInterface from "../DataUpdaterInterface";
import S3ConfigurationInterface from "../Util/S3/S3ConfigurationInterface";
export default class S3BasicFileDataUpdater implements DataUpdaterInterface {
    protected resourceName: string;
    protected s3Config: S3ConfigurationInterface;
    protected sourcePath: string;
    protected destinationPath: string;
    protected fileExtension: string;
    protected s3: S3;
    constructor(resourceName: string, s3Config: S3ConfigurationInterface, sourcePath: string, destinationPath: string, fileExtension: string);
    updateToken(tokenId: BigNumber, isRevealed: boolean): Promise<void>;
    protected revealToken(tokenId: BigNumber): Promise<void>;
    protected hideToken(tokenId: BigNumber): Promise<void>;
    protected buildSourceObjectKey(tokenId: BigNumber): string;
    protected buildDestinationObjectKey(tokenId: BigNumber): string;
    protected buildObjectKey(tokenId: BigNumber, path: string): string;
    protected destinationDataExists(tokenId: BigNumber): Promise<boolean>;
    protected sanitizeKey(value: string): string;
}
