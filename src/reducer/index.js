import { combineReducers } from 'redux';
import * as type from '../action/type';
import {menus} from '../pages/menus'

const reducers ={};
/* 自动扫描pages/{name}/reducer文件，添加相应的reduer */
menus.forEach(it=>{
    if(it.name){
        try{
            reducers[it.name] = require("../pages/"+it.name+"/reducer")[it.name];
        }
        catch(err){
            // console.log(err)
        }
    }   
}
);


const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};


console.log("reducers",[httpData,...reducers])
export default combineReducers({
    httpData,
	...reducers
	/*anchor*/
});
