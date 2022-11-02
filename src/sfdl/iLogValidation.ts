/*
Evaluate the file base on rules defined
*/
export interface ILogValidation {   
    /**
    * Validate log 
    *
    * @param  log   the log capture from vscode.window
    * @return       true if the log is valid otherwise false
    */
    validate(log: any): boolean;

    /**
    * Array of string with valid values that the log should contain
    */
   validFilters: Array<string>;

    /**
    * Array of string with valid file extensions 
    */
   validFileExtensions: Array<string>;
}