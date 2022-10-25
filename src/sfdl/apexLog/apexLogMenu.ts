import { LogMenu } from "../logMenu";

export class ApexLogMenu extends LogMenu {
    menuOptions = [
        {
            label: 'SFDL: Apex - Remove HEAP_ALLOCATE & STATEMENT_EXECUTE Lines',
            name: 'removeHeapAllocateAndStatementExecute',
        },
        {
            label: 'SFDL: Apex - Format Hierarchy Entry/Exit',
            name: 'hierarchyEntryExit',
        },
        {
            label: 'SFDL: Apex - Apply all actions',
            name: 'applyAll',
        },
    ];
}