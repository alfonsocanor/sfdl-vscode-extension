/*
Define 
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
    * @return         void
    */
    validate(log: any): void;
}