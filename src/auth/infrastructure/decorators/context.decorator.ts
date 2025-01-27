import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Context = createParamDecorator((_data: any, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest();
});
