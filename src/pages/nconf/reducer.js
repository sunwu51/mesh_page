import {request} from '../../axios/request'

const baseUrl="http://localhost:8080/hw/nconf";

export const nconf=function(state=[],action){
    if(action.type==="nconf/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const nconfThunk = {
    get(){
        return (dispatch)=>{
            request({method:'get',url:baseUrl+'/'})
                .then(data=>{
                    dispatch({type:'nconf/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'post',url:baseUrl+"/",data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'delete',url:baseUrl+"/"+record.nconfid}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'put',url:baseUrl+"/"+record.nconfid,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


