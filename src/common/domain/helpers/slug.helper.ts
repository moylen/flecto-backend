import slugify from 'slugify';
import { nanoid } from 'nanoid';

export class SlugHelper {
    static getSlug(value: string) {
        return `${slugify(value, { lower: true, strict: true, trim: true })}-${nanoid(6)}`;
    }
}
