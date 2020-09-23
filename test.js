function parseSearchStr(search) {
    const paramList = search && search.substring(1).split('&');
    const res = {};
    paramList && paramList.forEach(param=>{
        const [k, v] = param.split('=');
        res[k] = v;
    });
    return res;
}

let search = "?mod=forumdisplay&fid=145&filter=sortid&sortid=311&orderby=dateline";

console.log(parseSearchStr(search));

