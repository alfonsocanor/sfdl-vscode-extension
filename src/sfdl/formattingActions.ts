import * as constants from './constants';

const logLinesAnalyseFunctions = {
    isHeapAllocate(line){
        return line && line.includes(constants.LOG_LINE.HEAP_ALLOCATE); 
    },
    isStatementExecute(line){
        return line && line.includes(constants.LOG_LINE.STATEMENT_EXECUTE);   
    },
    isEntry(line){
        return line && (line.includes(constants.LOG_LINE.METHOD_ENTRY) || 
            line.includes(constants.LOG_LINE.SYSTEM_METHOD_ENTRY) || 
            line.includes(constants.LOG_LINE.CONSTRUCTOR_ENTRY)) ||
            line.includes(constants.LOG_LINE.CODE_UNIT_STARTED);
    },
    isExit(line){
        return line && (line.includes(constants.LOG_LINE.METHOD_EXIT) || 
            line.includes(constants.LOG_LINE.SYSTEM_METHOD_ENTRY) || 
            line.includes(constants.LOG_LINE.CONSTRUCTOR_EXIT))  ||
            line.includes(constants.LOG_LINE.CODE_UNIT_FINISHED);
    },
    extractSoqlLine(line){
        return line && !line.includes(constants.LOG_LINE.SOQL_EXECUTE);
    },
};

const invokeFormattingAction = {
    hierarchyEntryExit(logLinesArray){
        let tabs2Add = 0;
        return logLinesArray.map(line => {
            if(logLinesAnalyseFunctions.isEntry(line)){
                tabs2Add++;
                return tabs2Add2Line(tabs2Add - 1) + line;
            }

            if(logLinesAnalyseFunctions.isExit(line)){
                if(tabs2Add  === 0){
                    return tabs2Add;
                }

                tabs2Add--;
            }

            return tabs2Add2Line(tabs2Add) + line;
        });
    },

    removeHeapAllocateAndStatementExecute(logLinesArray){
        return logLinesArray.filter(
            line => {
                return !logLinesAnalyseFunctions.isHeapAllocate(line) && !logLinesAnalyseFunctions.isStatementExecute(line);
            }
        );
    },

    applyAllFormattingActions(logLinesArray){
        let logFormatted = [...invokeFormattingAction.hierarchyEntryExit(logLinesArray)];
        return invokeFormattingAction.removeHeapAllocateAndStatementExecute(logFormatted);
    }
};

function tabs2Add2Line(numberOfTabs){
    let tabs2Return = numberOfTabs === 0 ? '' : '\t';
    for(let counter = 1; counter < numberOfTabs; counter++){
        tabs2Return = tabs2Return + '\t';
    }
    return tabs2Return;
}

export function execute(logDetails, action){
    if(!logDetails){
        return '';
    }

    let logDetailsArrayOfLines = logDetails.split('\n');
    let logDetailsFormatted; 
    if(action){
        logDetailsFormatted = invokeFormattingAction[action](logDetailsArrayOfLines);
        logDetailsFormatted.join('\n');
    }
    
    return logDetailsFormatted ? logDetailsFormatted.join('\n') : logDetails;
}