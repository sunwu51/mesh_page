import axios from "axios";
import {store} from "../index";

export function request(config){
    return axios.request(config).then(res=>{
        if(res.status===401){
            console.log("登录超时");
            store.dispatch({type:"auth/logout"});
        }else if(res.status===403){
            console.log("权限不足");
        }
        return res;
    });

}