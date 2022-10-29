/*
Evaluate the file base on rules defined
*/
export interface ILogValidation { 
    /**
    * Error message to display for invalid log
    */
    exceptionMessage: string;
    
    /**
    * validations in the form of function expresions evaluated 
    */
    validations: any;

    /**
    * Validate log 
    *
    * @param  log   the log capture from vscode.window
    * @return       true if the log is valid otherwise false
    */
    validate(log: any): boolean;
}