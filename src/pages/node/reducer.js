import {request} from '../../axios/request'

const baseUrl="http://localhost:8080/hw/node";

export const node=function(state=[],action){
    if(action.type==="node/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const nodeThunk = {
    get(){
        return (dispatch)=>{
            request({method:'get',url:baseUrl+'/'})
                .then(data=>{
                    dispatch({type:'node/set',data:data.data})});
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
            request({method:'delete',url:baseUrl+"/"+record.nid}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'put',url:baseUrl+"/"+record.nid,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


