import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserTokenService } from '../domain/services/user-token.service';
import { PrismaService } from '../../database/infrastructure/service/prisma.service';
import { HashService } from '../../common/domain/services/hash.service';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, UserTokenService, PrismaService, HashService],
})
export class UserModule {}
