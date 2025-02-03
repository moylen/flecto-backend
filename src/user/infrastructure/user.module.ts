import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserTokenService } from '../domain/services/user-token.service';
import { PrismaService } from '../../database/infrastructure/service/prisma.service';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, UserTokenService, PrismaService],
})
export class UserModule {}
