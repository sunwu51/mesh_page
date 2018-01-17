import axios from 'axios'

const baseUrl="http://localhost:3456/user";

export const user=function(state=[],action){
    if(action.type==="user/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const userThunk = {
    get(){
        return (dispatch)=>{
            axios.request({method:'get',url:baseUrl+'/'})
                .then(data=>{
                    dispatch({type:'user/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        return (dispatch)=>{
            axios.request({method:'post',url:baseUrl+"/",data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            axios.request({method:'delete',url:baseUrl+"/"+record.id}).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            axios.request({method:'patch',url:baseUrl+"/"+record.id,data:record}).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


