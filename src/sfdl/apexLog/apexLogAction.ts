import { ILogAction } from "../iLogAction";

enum LOG_LINE_FILTER {
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

export class ApexLogAction implements ILogAction{
    actions = {
        hierarchyEntryExit(filters: any, logLines: Array<string>){
            let tabs2Add = 0;
            return logLines.map(line => {
                if(super.filters.isEntry(line)){
                    tabs2Add++;
                    return filters.tabs2Add2Line(tabs2Add - 1) + line;
                }
    
                if(super.filters.isExit(line)){
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
            let tabs2Return = numberOfTabs === 0 ? '' : '\t';
            for(let counter = 1; counter < numberOfTabs; counter++){
                tabs2Return = tabs2Return + '\t';
            }
            return tabs2Return;
        }
    };

    apply(actionName: string, log: any): string {
        let logLines = log?.split('\n');
        let logFormatted; 
        
        if(logLines){
            //actions passing as another argument for applyAll function
            logFormatted = this.actions[actionName](this.filters, logLines, this.actions);
            logFormatted.join('\n');
        }
        
        return logFormatted ? logFormatted.join('\n') : log;
    }
}