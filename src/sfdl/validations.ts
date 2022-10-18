
export function execute(log){
    return isApexLog(log);
}

function isApexLog(log){
    return log && log.includes('APEX_CODE');
}