import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly configService: ConfigService) {}

    client: S3Client;

    onModuleInit() {
        this.client = new S3Client({
            region: this.configService.get<string>('S3_REGION'),
            endpoint: this.configService.get<string>('S3_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
            },
            forcePathStyle: true,
        });
    }

    onModuleDestroy() {
        this.client.destroy();
    }
}
