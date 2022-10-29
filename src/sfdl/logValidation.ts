import { ILogValidation } from "./iLogValidation";

export abstract class LogValidation implements ILogValidation {
    abstract exceptionMessage: string;
    abstract validations: any;
    
    validate(log: any): boolean {
        return Object.keys(this.validations).some((validation) => {
            return this.validations[validation](log);
        });
    }
}