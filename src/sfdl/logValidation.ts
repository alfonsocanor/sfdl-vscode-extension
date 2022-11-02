import { ILogValidation } from "./iLogValidation";
import * as utils from './utils';

export abstract class LogValidation implements ILogValidation {
    abstract validFilters: string[];
    abstract validFileExtensions: string[];
    
    validate(log: any): boolean {
        return this.validateFileExtension() || this.validateLogFile(log);
    }

    validateFileExtension(): boolean{
        return this.validFileExtensions.some(fileExtension => utils.getFileName().includes(fileExtension));
    }

    validateLogFile(log: any): boolean{
        return this.validFilters.some(value => log.includes(value));
    }
}