export class ConfigHelper {
    static normalizeBoolean(value: string): boolean {
        return Boolean(parseInt(value));
    }
}
