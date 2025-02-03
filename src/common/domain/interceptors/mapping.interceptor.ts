import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MappingInterceptor implements NestInterceptor {
    constructor(private readonly schema: any) {}

    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => plainToInstance(this.schema, data, { excludeExtraneousValues: true })));
    }
}
