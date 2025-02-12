import { Injectable } from '@nestjs/common';
import { S3Service } from '../../../database/infrastructure/service/s3.service';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3FileService {
    constructor(private readonly s3Service: S3Service) {}

    async getOne(bucket: string, key: string) {
        return await this.s3Service.client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    }

    async uploadOne(bucket: string, key: string, buffer: Buffer) {
        return await this.s3Service.client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: buffer,
            }),
        );
    }
}
