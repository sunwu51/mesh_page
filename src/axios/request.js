import axios from "axios";
import {store} from "../index";
import actionTypes from "../pages/actionTypes";



export function request(config){
    return axios.request({...config,headers:{"Authorization":"Bearer "+store.getState().auth.token}}).then(res=>{
        if(res.status===401){
            console.log("登录超时");
            store.dispatch({type:actionTypes.AuthLogouted});
        }else if(res.status===403){
            console.log("权限不足");
        }
        return res;
    });
}
export function getSelection(url){
    return request({method:'get',url});
}