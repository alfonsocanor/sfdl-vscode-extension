(()=>{"use strict";var e={169:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ApexLog=void 0;const o=i(463);class n extends o.LogProcessor{constructor(e,t,i){super(),this._logMenu=e,this._validation=t,this._action=i,this.successMessage="Salesforce Debug Logs executed!",this.exceptionMessage="Salesforce Debug Logs can't process the file. Invalid Apex Log.",this.logMenu=e,this.validation=t,this.action=i}}t.ApexLog=n},240:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ApexLogAction=void 0;const o=i(687);var n;!function(e){e.HEAP_ALLOCATE="HEAP_ALLOCATE",e.STATEMENT_EXECUTE="STATEMENT_EXECUTE",e.SYSTEM_METHOD_ENTRY="SYSTEM_METHOD_ENTRY",e.CONSTRUCTOR_ENTRY="CONSTRUCTOR_ENTRY",e.CONSTRUCTOR_EXIT="CONSTRUCTOR_EXIT",e.CODE_UNIT_STARTED="CODE_UNIT_STARTED",e.CODE_UNIT_FINISHED="CODE_UNIT_FINISHED",e.METHOD_ENTRY="METHOD_ENTRY",e.METHOD_EXIT="METHOD_EXIT",e.SOQL_EXECUTE="SOQL_EXECUTE"}(n||(n={}));class s extends o.LogAction{constructor(){super(...arguments),this.actions={hierarchyEntryExit(e,t){let i=0;return t.map((t=>{if(e.isEntry(t))return i++,e.tabs2Add2Line(i-1)+t;if(e.isExit(t)){if(0===i)return i;i--}return e.tabs2Add2Line(i)+t}))},removeHeapAllocateAndStatementExecute:(e,t)=>t.filter((t=>!e.isHeapAllocate(t)&&!e.isStatementExecute(t))),applyAll:(e,t,i)=>Object.keys(i).filter((e=>"applyAll"!==e)).reduce(((t,o)=>i[o](e,t)),t)},this.filters={isHeapAllocate:e=>e&&e.includes(n.HEAP_ALLOCATE),isStatementExecute:e=>e&&e.includes(n.STATEMENT_EXECUTE),isEntry:e=>e&&(e.includes(n.METHOD_ENTRY)||e.includes(n.SYSTEM_METHOD_ENTRY)||e.includes(n.CONSTRUCTOR_ENTRY))||e.includes(n.CODE_UNIT_STARTED),isExit:e=>e&&(e.includes(n.METHOD_EXIT)||e.includes(n.SYSTEM_METHOD_ENTRY)||e.includes(n.CONSTRUCTOR_EXIT))||e.includes(n.CODE_UNIT_FINISHED),extractSoqlLine:e=>e&&!e.includes(n.SOQL_EXECUTE),tabs2Add2Line(e){let t=0===e?"":"\t";for(let i=1;i<e;i++)t+="\t";return t}}}}t.ApexLogAction=s},498:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ApexLogMenu=void 0;const o=i(907);class n extends o.LogMenu{constructor(){super(...arguments),this.menuOptions=[{label:"SFDL: Apex - Remove HEAP_ALLOCATE & STATEMENT_EXECUTE Lines",name:"removeHeapAllocateAndStatementExecute"},{label:"SFDL: Apex - Format Hierarchy Entry/Exit",name:"hierarchyEntryExit"},{label:"SFDL: Apex - Apply all actions",name:"applyAll"}]}}t.ApexLogMenu=n},158:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ApexLogValidation=void 0;const o=i(192);class n extends o.LogValidation{constructor(){super(...arguments),this.validFilters=["APEX_CODE"],this.validFileExtensions=[".log"]}}t.ApexLogValidation=n},101:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DisplayMenu=void 0,t.DisplayMenu=class{constructor(e,t,i){this.detail=e,this.description="",this.label=`${t}`,this.name=`${i}`}}},611:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Log=void 0;const o=i(169),n=i(498),s=i(158),a=i(240),l={apexLog:new o.ApexLog(new n.ApexLogMenu,new s.ApexLogValidation,new a.ApexLogAction)};t.Log=class{constructor(e){this._logType=e}process(){l[this._logType].process()}}},687:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LogAction=void 0,t.LogAction=class{apply(e,t){let i,o=t?.split("\n");return o&&(i=this.actions[e](this.filters,o,this.actions),i.join("\n")),i?i.join("\n"):t}}},907:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LogMenu=void 0;const o=i(101),n=i(496);t.LogMenu=class{getOption(){const e=this.getMenuOptions();return this.optionSelected(e)}getMenuOptions(){return this.menuOptions.map((e=>new o.DisplayMenu("",e.label,e.name)))}async optionSelected(e){return await n.window.showQuickPick(e,{canPickMany:!1})}}},463:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LogProcessor=void 0;const o=i(496),n=i(441);t.LogProcessor=class{async process(){let e=n.getLog();if(!this.runValidation(e))return void n.displayMessage(this.exceptionMessage);let t=await this.displayMenu(),i=this.applyAction(t.name,e);this.refreshWindow(i),n.displayMessage(this.successMessage),n.navigateTop()}displayMenu(){return this.logMenu.getOption()}runValidation(e){return this.validation.validate(e)}applyAction(e,t){return this.action.apply(e,t)}refreshWindow(e){let t=o.window.activeTextEditor,i=n.selectAllPageContent();t?.edit((t=>{t.replace(i,e)}))}}},192:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LogValidation=void 0;const o=i(441);t.LogValidation=class{validate(e){return this.validateFileExtension()||this.validateLogFile(e)}validateFileExtension(){return this.validFileExtensions.some((e=>o.getFileName().includes(e)))}validateLogFile(e){return this.validFilters.some((t=>e.includes(t)))}}},441:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.displayMessage=t.navigateTop=t.selectAllPageContent=t.getFileName=t.getLog=void 0;const o=i(496);t.getLog=function(){const e=o.window.activeTextEditor?.document,t=e?.getText();return t||"no log found"},t.getFileName=function(){let e=o.window.activeTextEditor;return e?e.document.fileName:"no log found"},t.selectAllPageContent=function(){let e,t=o.window.activeTextEditor;if(t){let i=t.document.lineAt(0),n=t.document.lineAt(t.document.lineCount-1);e=new o.Range(0,i.range.start.character,t.document.lineCount-1,n.range.end.character)}return e},t.navigateTop=function(){let e=o.window.activeTextEditor;if(e){var t=new o.Position(0,0),i=new o.Selection(t,t);e.selection=i,e.revealRange(i)}},t.displayMessage=function(e){o.window.showInformationMessage(e)}},496:e=>{e.exports=require("vscode")}},t={};function i(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,i),s.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=i(496),n=i(611);e.activate=function(e){console.log("Salesforce Debug Logs (sfdl) is now active!");let i=t.commands.registerCommand("sfdl.processLog",(()=>{new n.Log("apexLog").process()}));e.subscriptions.push(i)},e.deactivate=function(){}})(),module.exports=o})();