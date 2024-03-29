import { LogAction } from "../logAction";

enum LOG_LINE_FILTER {
    HEAP_ALLOCATE = 'HEAP_ALLOCATE',
    STATEMENT_EXECUTE = 'STATEMENT_EXECUTE',
    SYSTEM_METHOD_ENTRY = 'SYSTEM_METHOD_ENTRY',
    CONSTRUCTOR_ENTRY = 'CONSTRUCTOR_ENTRY',
    CONSTRUCTOR_EXIT = 'CONSTRUCTOR_EXIT',
    CODE_UNIT_STARTED = 'CODE_UNIT_STARTED',
    CODE_UNIT_FINISHED = 'CODE_UNIT_FINISHED',
    METHOD_ENTRY = 'METHOD_ENTRY',
    METHOD_EXIT = 'METHOD_EXIT',
    SOQL_EXECUTE = 'SOQL_EXECUTE'
}

export class ApexLogAction extends LogAction{
    actions = {
        hierarchyEntryExit(filters: any, logLines: Array<string>){
            let tabs2Add = 0;
            return logLines.map(line => {
                if(filters.isEntry(line)){
                    tabs2Add++;
                    return filters.tabs2Add2Line(tabs2Add - 1) + line;
                }
    
                if(filters.isExit(line)){
                    if(tabs2Add  === 0){
                        return tabs2Add;
                    }
    
                    tabs2Add--;
                }
    
                return filters.tabs2Add2Line(tabs2Add) + line;
            });
        },
    
        removeHeapAllocateAndStatementExecute(filters: any, logLines: Array<string>){
            return logLines.filter(
                line => !filters.isHeapAllocate(line) && !filters.isStatementExecute(line)
            );
        },

        applyAll(filters: any, logLines: Array<string>, actions: any){        
            return Object.keys(actions)
                .filter(name => name !== 'applyAll')
                .reduce((log2Format, action) => {
                    return actions[action](filters, log2Format);
                    }, logLines
                );
        }
    };

    filters = {
        isHeapAllocate(line){
            return line && line.includes(LOG_LINE_FILTER.HEAP_ALLOCATE); 
        },
        isStatementExecute(line){
            return line && line.includes(LOG_LINE_FILTER.STATEMENT_EXECUTE);   
        },
        isEntry(line){
            return line && (line.includes(LOG_LINE_FILTER.METHOD_ENTRY) || 
                line.includes(LOG_LINE_FILTER.SYSTEM_METHOD_ENTRY) || 
                line.includes(LOG_LINE_FILTER.CONSTRUCTOR_ENTRY)) ||
                line.includes(LOG_LINE_FILTER.CODE_UNIT_STARTED);
        },
        isExit(line){
            return line && (line.includes(LOG_LINE_FILTER.METHOD_EXIT) || 
                line.includes(LOG_LINE_FILTER.SYSTEM_METHOD_ENTRY) || 
                line.includes(LOG_LINE_FILTER.CONSTRUCTOR_EXIT))  ||
                line.includes(LOG_LINE_FILTER.CODE_UNIT_FINISHED);
        },
        extractSoqlLine(line){
            return line && !line.includes(LOG_LINE_FILTER.SOQL_EXECUTE);
        },
        tabs2Add2Line(numberOfTabs: number){
            let tab = '\t';
            return tab.repeat(numberOfTabs);
        }
    };
}