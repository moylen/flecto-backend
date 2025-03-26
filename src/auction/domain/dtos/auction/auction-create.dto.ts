import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, Min, Validate } from 'class-validator';
import { FutureDateTimeValidator } from '../../../../common/domain/validators/future-date-time.validator';
import { Type } from 'class-transformer';

export class AuctionCreateDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    articleId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    startPrice: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    stepPrice: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @Validate(FutureDateTimeValidator, [24])
    untilTime: Date;
}
