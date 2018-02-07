import {request} from '../../axios/request'

const baseUrl="http://localhost:8080/hw/gconf";

export const gconf=function(state=[],action){
    if(action.type==="gconf/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const gconfThunk = {
    get(){
        return (dispatch)=>{
            request({method:'get',url:baseUrl+'/'})
                .then(data=>{
                    dispatch({type:'gconf/set',data:data.data})});
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
            request({method:'delete',url:baseUrl+"/"+record.gconfid}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'put',url:baseUrl+"/"+record.gconfid,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


