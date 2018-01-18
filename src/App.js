import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import ActionTypes from "./pages/actionTypes";
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Routes from './routes';
import { Redirect } from 'react-router-dom';
import {mqttThunk} from "./pages/auth/mqtt"


const { Content, Footer } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    logout(){
        this.props.dispatch({type:ActionTypes.AuthLogouted});
        this.props.dispatch(mqttThunk.disconnect(this.props.mqtt.mqttclient));
    }
    render() {
        console.log(this.props); 
        const { auth } = this.props;
        const responsive = false;
        //开发阶段去掉这段 避免每次都输密码才能登陆
        // if(!auth.login)
        // return <Redirect to="/login" />
        return (
            <Layout>
                {!responsive && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={ auth||{}} 
                        logout={this.logout.bind(this)} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={auth} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©2017 Created by 865470087@qq.com
                    </Footer>
                </Layout>
                
                {
                    responsive && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                }
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { auth,mqtt } = state;
    return { auth,mqtt };
};


export default connect(mapStateToProps)(App);
