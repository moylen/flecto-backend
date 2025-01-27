import { UserRole } from '@prisma/client';

export class ContextDto {
    user: { id: number; role: UserRole };
}
