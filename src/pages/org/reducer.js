import axios from 'axios'

const baseUrl="http://localhost:3456/org";

export const org=function(state=[],action){
    if(action.type==="org/set"){
        return action.data;
    }
    else{
        return state;
    }
}
export const orgThunk = {
    get(){
        return (dispatch)=>{
            axios.get(baseUrl+'/')
                .then(data=>{
                    dispatch({type:'org/set',data:data.data})});
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


