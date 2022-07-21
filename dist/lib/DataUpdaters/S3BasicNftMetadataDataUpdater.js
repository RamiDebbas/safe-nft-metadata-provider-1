"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const S3BasicFileDataUpdater_1 = require("./S3BasicFileDataUpdater");
class S3BasicNftMetadataDataUpdater extends S3BasicFileDataUpdater_1.default {
    metadataUpdater;
    constructor(resourceName, s3Config, sourcePath, destinationPath, metadataUpdater, fileExtension = ".json") {
        super(resourceName, s3Config, sourcePath, destinationPath, fileExtension);
        this.metadataUpdater = metadataUpdater;
    }
    async revealToken(tokenId) {
        if (await this.destinationDataExists(tokenId)) {
            console.log(`Skipping "${this.resourceName}" for token ${tokenId.toString()} (already revealed)...`);
            return;
        }
        console.log(`Revealing "${this.resourceName}" for token ${tokenId.toString()}...`);
        const sourceKey = this.buildSourceObjectKey(tokenId);
        const destinationKey = this.buildDestinationObjectKey(tokenId);
        try {
            const sourceData = await this.s3.getObject({
                Bucket: this.s3Config.bucketName,
                Key: sourceKey,
            }).promise();
            const sourceContent = this.metadataUpdater(tokenId, JSON.parse(sourceData.Body.toString()));
            await this.s3.upload({
                Bucket: this.s3Config.bucketName,
                Key: destinationKey,
                ContentType: sourceData.ContentType,
                Body: JSON.stringify(sourceContent, null, 2),
                ACL: "public-read",
            }).promise();
        }
        catch (error) {
            console.error(`Error copying "${this.resourceName}" for token ${tokenId.toString()}.`);
            console.error(`Source key: ${sourceKey}`);
            console.error(`Destination key: ${destinationKey}`);
            console.error(error);
        }
    }
}
exports.default = S3BasicNftMetadataDataUpdater;
