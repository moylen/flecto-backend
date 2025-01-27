import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { PrismaModule } from '../../database/infrastructure/prisma.module';
import { UserTokenService } from '../domain/services/user-token.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService, UserTokenService],
})
export class UserModule {}
