import { Injectable } from '@nestjs/common';
import { S3Service } from '../../../database/infrastructure/service/s3.service';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';

@Injectable()
export class S3FileService {
    constructor(private readonly s3Service: S3Service) {}

    async uploadOne(bucket: string, key: string, buffer: Buffer): Promise<PutObjectCommandOutput> {
        return await this.s3Service.client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: buffer,
            }),
        );
    }
}
