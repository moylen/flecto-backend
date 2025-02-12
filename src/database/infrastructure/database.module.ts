import { Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { S3Service } from './service/s3.service';

@Module({
    providers: [PrismaService, S3Service],
    exports: [PrismaService, S3Service],
})
export class DatabaseModule {}
