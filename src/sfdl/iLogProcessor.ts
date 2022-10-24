export interface ILogProcessor {
    execute(): void;
    validation(log: any): void;
    action(action: string, log: any): string;
    applyFormat(log: string): void;
}