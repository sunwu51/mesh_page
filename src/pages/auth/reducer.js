import axios from 'axios'
import { mqttThunk } from './mqtt';
import actionTypes from '../actionTypes';


export const auth =(state={login:false,username:"",token:"",role:""},action)=>{
    switch (action.type){
        case actionTypes.AuthLogined:
            return {...state,login:true,...action.data};
        case actionTypes.AuthLogouted:
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
                    if(data.statusText==="OK"){
                        dispatch({type:actionTypes.AuthLogined,data:data.data}); 
                        dispatch(mqttThunk.connect({username:loginfo.username,password:loginfo.password})); 
                    }
                });
        }
    },
}


