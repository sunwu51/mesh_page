import axios from 'axios'

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
            axios.get(baseUrl+'/$get.path$')
                .then(data=>{
                    dispatch({type:'$name$/set',data:data.data})});
        }
    },
    add(record){
        let _this=this;
        return (dispatch)=>{
            axios.post(baseUrl+"/$add.path$",record).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    delete(record){
        let _this=this;
        return (dispatch)=>{
            axios.delete(baseUrl+"/$delete.path$"+record.$id$).then(res=>{
                _this.get()(dispatch);
            })
        }
    },
    update(record){
        let _this=this;
        return (dispatch)=>{
            axios.patch(baseUrl+"/$update.path$"+record.$id$,record).then(res=>{
                _this.get()(dispatch);
            })
        }
    }

}


