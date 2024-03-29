import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/lib/animate.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware ,compose } from 'redux';
import reducer from './reducer';
import { AppContainer } from 'react-hot-loader';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/404/NotFound';
import Login from './pages/auth/Login';
import App from './App';

// redux 注入操作
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

// console.log(store.getState());


// const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />        
                        <Route path="/app" component={App} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        </AppContainer>
        ,
        document.getElementById('root')
    );
// };

// render(Page);

// Webpack Hot Module Replacement API
if (module.hot) {
    // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
    // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
    // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
        if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
    // module.hot.accept('./Page', () => {
    //     render(Page);
    // })
}

registerServiceWorker();