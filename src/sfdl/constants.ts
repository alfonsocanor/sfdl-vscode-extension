export enum LOG_LINE {
    HEAP_ALLOCATE,
    STATEMENT_EXECUTE,
    SYSTEM_METHOD_ENTRY,
    CONSTRUCTOR_ENTRY,
    CONSTRUCTOR_EXIT,
    CODE_UNIT_STARTED,
    CODE_UNIT_FINISHED,
    METHOD_ENTRY,
    METHOD_EXIT,
    SOQL_EXECUTE
}

export enum ACTION_NAME {
    name
}

export const ACTIONS = [
    {
        label: 'SFDL: Remove HEAP_ALLOCATE & STATEMENT_EXECUTE Lines',
        name: 'removeHeapAllocateAndStatementExecute',
    },
    {
        label: 'SFDL: Format Hierarchy Entry/Exit',
        name: 'hierarchyEntryExit',
    },
    {
        label: 'SFDL: Apply all actions',
        name: 'applyAllFormattingActions',
    },
];

export const EXECUTED_ACTION_SUCCESS_MESSAGE = 'Salesforce Debug Logs executed!';
export const EXECUTED_ACTION_ERROR_MESSAGE = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';