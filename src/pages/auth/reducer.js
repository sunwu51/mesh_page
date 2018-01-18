import axios from 'axios'


export const auth =(state={login:false,username:"",token:"",role:""},action)=>{
    switch (action.type){
        case "auth/login":
            return {...state,login:true,...action.data};
        case "auth/logout":
            return {login:false,username:"",token:"",role:""};
        case "auth/refresh":
            return {...state,login:true,...action.data};
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
                        dispatch({type:'auth/login',data:data.data})  
                    }
                });
        }
    }
}


