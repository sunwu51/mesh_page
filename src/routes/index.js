import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import { menus } from '../pages/menus';

// const routes = [];
// menus.forEach(it=>{
//     if(it.name){
//         let Com = require('../pages/'+it.name+"/index");
//         routes.push (
//             <Route exact path={it.key} component={Com} />
//         )
//     }
        
// });
// console.log(routes)
export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />
	            {
                    /* 自动扫描pages/{name}/index文件，并添加作为组件 */
                    menus.map(it=>{
                        if(it.name){
                            let Com = require('../pages/'+it.name+"/index").default;
                            return (
                                <Route exact path={it.key} key={it.key} component={Com} />
                            )
                        }
                            
                    })
                }
                <Route render={() => <Redirect to="/404" />} />
			</Switch>
        )
    }
}