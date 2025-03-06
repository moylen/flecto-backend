import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { UserPasswordUpdateDto } from '../../domain/dtos/user/user-password-update.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { Context } from '../../../auth/infrastructure/decorators/context.decorator';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';
import { UserSaveDto } from '../../domain/dtos/user/user-save.dto';
import { UserDetailSchema } from '../../domain/dtos/user/user-detail.schema';
import { UserSchema } from '../../domain/dtos/user/user.schema';
import { UserUsernameUpdateDto } from '../../domain/dtos/user/user-username-update.dto';
import { UserSearchDto } from '../../domain/dtos/user/user-search.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserSchema, isArray: true })
    @UseInterceptors(new MappingInterceptor(UserSchema))
    @Get('/')
    async findAll(@Query() dto: UserSearchDto) {
        return this.userService.findAll(dto);
    }

    @ApiOkResponse({ type: UserDetailSchema })
    @UseInterceptors(new MappingInterceptor(UserDetailSchema))
    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findByIdOrPanic(id);
    }

    @ApiOkResponse({ type: UserSchema })
    @UseInterceptors(new MappingInterceptor(UserSchema))
    @Put('/')
    async update(@Body() dto: UserSaveDto, @Context() context: ContextDto) {
        return this.userService.update(dto, context);
    }

    @ApiOkResponse({ type: UserSchema })
    @UseInterceptors(new MappingInterceptor(UserSchema))
    @Patch('/password')
    async updatePassword(@Body() dto: UserPasswordUpdateDto, @Context() context: ContextDto) {
        return this.userService.updatePassword(dto, context);
    }

    @ApiOkResponse({ type: UserSchema })
    @UseInterceptors(new MappingInterceptor(UserSchema))
    @Patch('/username')
    async updateUsername(@Body() dto: UserUsernameUpdateDto, @Context() context: ContextDto) {
        return this.userService.updateUsername(dto, context);
    }

    @ApiOkResponse({ type: UserSchema })
    @UseInterceptors(new MappingInterceptor(UserSchema))
    @Patch('/avatar/:id')
    async updateAvatar(@Param('id', ParseIntPipe) id: number, @Context() context: ContextDto) {
        return this.userService.updateAvatar(id, context);
    }
}
