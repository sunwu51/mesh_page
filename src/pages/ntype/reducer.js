import {request} from '../../axios/request'
import {transNR} from '../../utils/index'

const baseUrl="http://localhost:8080/hw/ntype";

export const ntype=function(state=[],action){
    if(action.type==="ntype/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const ntypeThunk = {
    get(){
        return (dispatch)=>{
            request({method:'get',url:baseUrl+'/'})
                .then(data=>{
                    dispatch({type:'ntype/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        const {state,msg} = transNR(record.datamodel)
        if(state==0){
            return {"type":"none"};
        }
        alert(msg)
        record.modelstr=msg;
        return (dispatch)=>{
            request({method:'post',url:baseUrl+"/",data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'delete',url:baseUrl+"/"+record.ntypeid}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        const {state,msg} = transNR(record.datamodel)
        if(!state){
            return {"type":"none"};
        }
        alert(msg)
        record.modelstr=msg;
        return (dispatch)=>{
            request({method:'put',url:baseUrl+"/"+record.ntypeid,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


