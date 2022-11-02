import { LogValidation } from '../logValidation';

export class ApexLogValidation extends LogValidation {
    validFilters = ['APEX_CODE'];
    validFileExtensions = ['.log'];
}