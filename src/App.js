import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import ActionTypes from "./pages/ActionTypes";
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Routes from './routes';
import { Redirect } from 'react-router-dom';
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
    }
    render() {
        console.log(this.props); 
        const { auth } = this.props;
        const responsive = false;
        if(!auth.login)
        return <Redirect to="/login" />
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
    const { auth } = state;
    return { auth };
};


export default connect(mapStateToProps)(App);
