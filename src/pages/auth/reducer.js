import axios from 'axios'
import ActionTypes from '../ActionTypes';


export const auth =(state={login:false,username:"",token:"",role:""},action)=>{
    switch (action.type){
        case ActionTypes.AuthLogined:
            return {...state,login:true,...action.data};
        case ActionTypes.AuthLogouted:
            return {login:false,username:"",token:"",role:""};
        default:
            return state;
    }
}

export const authThunk = {
    login(loginfo){
        return (dispatch)=>{
            axios.request({method:'get',url:'http://localhost:3456/auth',data:loginfo})
                .then(data=>{
                    console.log(data.statusText)
                    if(data.statusText==="OK"){
                        dispatch({type:ActionTypes.AuthLogined,data:data.data})  
                    }
                });
        }
    }
}


