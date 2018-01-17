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
            axios.get(baseUrl+'/')
                .then(data=>{
                    dispatch({type:'user/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        return (dispatch)=>{
            axios.post(baseUrl+"/",record).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            axios.delete(baseUrl+"/"+record.id).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            axios.patch(baseUrl+"/"+record.id,record).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


