import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import { menus } from '../pages/menus';

/**
 * 注意这个文件是 /app下的子路由，并不是全部的路由信息，全部路由在index.js
 */
export default class CRouter extends Component {
    // requireAuth = (permission, component) => {
    //     const { auth } = this.props;
    //     const { permissions } = auth.data;
    //     // const { auth } = store.getState().httpData;
    //     if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
    //     return component;
    // };
    render() {
        // console.log(this.props)
        // this.requireAuth();
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />
                <Route  path="/app/chart" key="/app/chart" component={require('../pages/chart/Chart').default} />
                {
                    /* 自动扫描pages/{name}/index文件，并添加作为组件 */
                    menus.map(it=>{
                        if(it.name){
                            let jsxname = it.name.substring(0,1).toUpperCase()+it.name.substring(1);
                            let Com = require('../pages/'+it.name+"/"+jsxname).default;
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