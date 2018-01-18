import { combineReducers } from 'redux';
import {menus} from '../pages/menus'

import {auth} from '../pages/auth/reducer';
import {mqtt} from '../pages/auth/mqtt';
import actionTypes from '../pages/actionTypes';

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




console.log("reducers",reducers)
export default combineReducers({
    auth,
    mqtt,
	...reducers
	/*anchor*/
});
