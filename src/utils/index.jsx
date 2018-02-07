/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

export const transNR=str=>{
    try{
        var json = JSON.parse(str)
    }
    catch(e){
        alert("json格式错误")
        return {state:0,msg:"json格式错误"};
    }
    var res=""
    for(var k in json){
        var arr = json[k].match(/^(u)?(int|float)(1|2|4|8|16|32|64)(b|l)?$/)   
        if(arr){
            let pre=((arr[2]=='float'||arr[1])?'':'-')+(arr[4]=='l'?'l':'b');
            let end=arr[2]=='int'?'':'f';
            let num=arr[3];
            res+=pre+num+end+"=>"+k+","
        }
        else{
            alert("json value不合法");
            return {state:0,msg:"json value不合法"};
        }
    }
    return {state:1,msg:res.substr(0,res.length-1)}


}
