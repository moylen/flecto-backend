import { ArticleSchema } from './article.schema';
import { ApiProperty } from '@nestjs/swagger';
import { TagSchema } from '../tag/tag.schema';
import { Expose, Transform, Type } from 'class-transformer';
import { FileSchema } from '../../../../file/infrastructure/schemas/file.schema';

export class ArticleWithComputedSchema extends ArticleSchema {
    @ApiProperty()
    @Expose()
    isLiked: boolean;

    @ApiProperty()
    @Expose()
    likesCount: number;

    @ApiProperty()
    @Expose()
    viewsCount: number;

    @ApiProperty({ type: () => [TagSchema] })
    @Type(() => TagSchema)
    @Transform(({ obj }) => obj.tags?.map((item: any) => item.tag))
    @Expose()
    tags: TagSchema[];

    @ApiProperty({ type: () => [FileSchema] })
    @Type(() => FileSchema)
    @Transform(({ obj }) => obj.files?.map((file: any) => file.file))
    @Expose()
    files: FileSchema[];
}
