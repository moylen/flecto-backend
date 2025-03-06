import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { S3FileService } from '../../infrastructure/services/s3-file.service';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { v4 as UUIDv4 } from 'uuid';
import { MultipartFile } from '@fastify/multipart';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { File } from '@prisma/client';
import { PassThrough } from 'stream';

@Injectable()
export class FileService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly s3FileService: S3FileService,
    ) {}

    private readonly BUCKET_NAME = this.configService.get<string>('S3_BUCKET_NAME');

    async findByIdOrPanic(id: number) {
        const file = await this.prismaService.file.findUnique({
            where: {
                id,
            },
        });

        if (!file) {
            throw new NotFoundException('File not found');
        }

        return file;
    }

    async getStreamByFileIdOrPanic(id: number): Promise<StreamableFile> {
        const file = await this.findByIdOrPanic(id);

        const { Body } = await this.s3FileService.getOne(this.BUCKET_NAME, file.s3Key);

        const stream = new PassThrough();
        (Body as any).pipe(stream);

        return new StreamableFile(stream, {
            type: file.mimeType,
            disposition: `inline; filename="${file.filename}"`,
        });
    }

    async uploadOne(file: MultipartFile) {
        const uniqueFilename = UUIDv4() + path.extname(file.filename);

        await this.s3FileService.uploadOne(this.BUCKET_NAME, uniqueFilename, await file.toBuffer());

        return this.prismaService.file.create({
            data: {
                filename: uniqueFilename,
                s3Key: uniqueFilename,
                bucketName: this.BUCKET_NAME,
                size: file.file.bytesRead,
                mimeType: file.mimetype,
            },
        });
    }

    async uploadMany(files: AsyncIterableIterator<MultipartFile>) {
        const result: File[] = [];
        for await (const file of files) {
            result.push(await this.uploadOne(file));
        }
        return result;
    }
}
