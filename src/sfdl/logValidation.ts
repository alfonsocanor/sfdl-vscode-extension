import { ILogValidation } from "./iLogValidation";

export abstract class LogValidation implements ILogValidation {
    abstract exceptionMessage: string;
    abstract validations: any;
    
    validate(log: any): void {
        console.log('@validation');
        let isValid = Object.keys(this.validations).some((validation) => {
            console.log('@validation: ' + validation);
            return this.validations[validation](log);
        });

        if (!isValid) {
            console.log('@isNotValid');
            throw new Error(this.exceptionMessage);
        }
    }
}