import {request} from '../../axios/request'

const baseUrl="$baseUrl$";

export const $name$=function(state=[],action){
    if(action.type==="$name$/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const $name$Thunk = {
    get(){
        return (dispatch)=>{
            request({method:'$get.method$',url:baseUrl+'/$get.path$'})
                .then(data=>{
                    dispatch({type:'$name$/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'$add.method$',url:baseUrl+"/$add.path$",data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'$delete.method$',url:baseUrl+"/$delete.path$"+record.$id$}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            request({method:'$update.method$',url:baseUrl+"/$update.path$"+record.$id$,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


