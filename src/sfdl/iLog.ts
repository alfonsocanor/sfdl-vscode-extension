import { ILogAction } from "./iLogAction";
import { ILogValidation } from "./iLogValidation";

export interface ILog {
    process(): void;
}