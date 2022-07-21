"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const S3 = require("aws-sdk/clients/s3");
class S3BasicFileDataUpdater {
    resourceName;
    s3Config;
    sourcePath;
    destinationPath;
    fileExtension;
    s3;
    constructor(resourceName, s3Config, sourcePath, destinationPath, fileExtension) {
        this.resourceName = resourceName;
        this.s3Config = s3Config;
        this.sourcePath = sourcePath;
        this.destinationPath = destinationPath;
        this.fileExtension = fileExtension;
        this.s3 = new S3({
            apiVersion: "latest",
            endpoint: this.s3Config.endpoint,
            credentials: {
                accessKeyId: this.s3Config.accessKey,
                secretAccessKey: this.s3Config.secretKey,
            },
        });
    }
    async updateToken(tokenId, isRevealed) {
        if (isRevealed) {
            await this.revealToken(tokenId);
            return;
        }
    }
    async revealToken(tokenId) {
        if (await this.destinationDataExists(tokenId)) {
            console.log(`Skipping "${this.resourceName}" for token ${tokenId.toString()} (already revealed)...`);
            return;
        }
        console.log(`Revealing "${this.resourceName}" for token ${tokenId.toString()}...`);
        const sourceKey = this.sanitizeKey(`${this.s3Config.bucketName}/${this.buildSourceObjectKey(tokenId)}`);
        const destinationKey = this.buildDestinationObjectKey(tokenId);
        try {
            await this.s3.copyObject({
                Bucket: this.s3Config.bucketName,
                CopySource: sourceKey,
                Key: destinationKey,
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
    async hideToken(tokenId) {
        if (!await this.destinationDataExists(tokenId)) {
            console.log(`Skipping "${this.resourceName}" for token ${tokenId.toString()} (already hidden)...`);
            return;
        }
        console.log(`Hiding "${this.resourceName}" for token ${tokenId.toString()}...`);
        const objectKey = this.buildDestinationObjectKey(tokenId);
        try {
            await this.s3.deleteObject({
                Bucket: this.s3Config.bucketName,
                Key: objectKey,
            }).promise();
        }
        catch (error) {
            console.error(`Error deleting "${this.resourceName}" for token ${tokenId.toString()}.`);
            console.error(`Object key: ${objectKey}`);
            console.error(error);
        }
    }
    buildSourceObjectKey(tokenId) {
        return this.buildObjectKey(tokenId, this.sourcePath);
    }
    buildDestinationObjectKey(tokenId) {
        return this.buildObjectKey(tokenId, this.destinationPath);
    }
    buildObjectKey(tokenId, path) {
        return this.sanitizeKey(`${this.s3Config.pathPrefix}/${path}/${tokenId.toString()}${this.fileExtension}`);
    }
    async destinationDataExists(tokenId) {
        const objectKey = this.buildDestinationObjectKey(tokenId);
        try {
            await this.s3.headObject({
                Bucket: this.s3Config.bucketName,
                Key: objectKey,
            }).promise();
            return true;
        }
        catch (error) {
            if (error.name !== "NotFound") {
                console.error(`Error checking "${this.resourceName}" existence for token ${tokenId.toString()}.`);
                console.error(`Object key: ${objectKey}`);
                console.error(error);
            }
        }
        return false;
    }
    sanitizeKey(value) {
        // Remove leading and double "/" or keys won't be valid.
        return value.replaceAll(/[\/]+/g, "/").replace(/^\//, "");
    }
}
exports.default = S3BasicFileDataUpdater;
