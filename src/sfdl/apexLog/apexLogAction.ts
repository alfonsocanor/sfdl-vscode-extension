import { ILogAction } from "../iLogAction";
import * as constants from './constants';

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
            console.log('@removeHeapAllocateAndStatementExecute');
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
            console.log('@isHeapAllocate');
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