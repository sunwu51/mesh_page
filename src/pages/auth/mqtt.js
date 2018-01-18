import mqttjs from "mqtt";
import actionTypes from '@/pages/actionTypes';
const mqtturl = "ws://120.76.136.124:8083/mqtt"

export const mqtt = (state={mqttclient:{},connected:false},action)=>{
    switch (action.type){
        case actionTypes.MqttConnect:
            return action.data;
        case actionTypes.MqttDisconnect:
            return action.data;
        default:
            return state;
    }
}
export const mqttThunk={
    connect(options){
        return (dispatch)=>{
            let mqttclient=mqttjs.connect(mqtturl,options);
            mqttclient.on("connect",function(){
                dispatch({type:actionTypes.MqttConnect,data:{
                    mqttclient,
                    connected:true,
                }});
            })
        }
    },
    disconnect(mqttclient){
        return (dispatch)=>{
            mqttclient.end(function(){
                dispatch({type:actionTypes.MqttDisconnect,data:{
                    mqttclient,
                    connected:false,
                }})
            })
        }
    }
}
