import { ILogValidation } from "./iLogValidation";
import * as utils from './utils';

// Define an abstract base class for a log validation object
export abstract class LogValidation implements ILogValidation {
    // Abstract property for an array of valid filters
    abstract validFilters: string[];
    // Abstract property for an array of valid file extensions
    abstract validFileExtensions: string[];
    
    // Method to validate a log
    validate(log: any): boolean {
        // Return the result of validateFileExtension OR validateLogFile
        return this.validateFileExtension() || this.validateLogFile(log);
    }

    // Method to validate the file extension of the log file
    validateFileExtension(): boolean{
        // Return true if the validFileExtensions array contains a file extension that is included in the file name
        return this.validFileExtensions.some(fileExtension => utils.getFileName().includes(fileExtension));
    }

    // Method to validate the contents of the log file
    validateLogFile(log: any): boolean{
        // Return true if the validFilters array contains a value that is included in the log text
        return this.validFilters.some(value => log.includes(value));
    }
}