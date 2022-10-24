export interface ILogAction{
    actions: any;
    filters: any;
    apply(actionName: string, log: any): string;
}