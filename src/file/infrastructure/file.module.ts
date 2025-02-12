import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { FileController } from './controllers/file.controller';
import { FileService } from '../domain/services/file.service';
import { S3FileService } from './services/s3-file.service';

@Module({
    imports: [DatabaseModule],
    controllers: [FileController],
    providers: [FileService, S3FileService],
    exports: [FileService, S3FileService],
})
export class FileModule {}
