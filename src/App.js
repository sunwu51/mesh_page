import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
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
    render() {
        console.log(this.props); 
        const { auth } = this.props;
        const responsive = false;
        return (
            <Layout>
                {!responsive && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={ auth||{}} 
                        logout={this.props.logout} />
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
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(()=>({type:"auth/logout"}),dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
