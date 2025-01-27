import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
    public async hashPassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    public async verify(hash: string, password: string): Promise<boolean> {
        return await argon2.verify(hash, password);
    }
}
