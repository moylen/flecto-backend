import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserTokenService } from '../domain/services/user-token.service';
import { HashService } from '../../common/domain/services/hash.service';
import { UserController } from './controllers/user.controller';
import { UsernameUniqueValidator } from '../domain/validators/username-unique.validator';
import { UserEmailConfirmService } from '../domain/services/user-email-confirm.service';
import { NotifierModule } from '../../notifier/infrastructure/notifier.module';

@Module({
    imports: [DatabaseModule, NotifierModule],
    controllers: [UserController],
    providers: [UserService, UserTokenService, UserEmailConfirmService, UsernameUniqueValidator, HashService],
    exports: [UserService, UserTokenService, UsernameUniqueValidator],
})
export class UserModule {}
