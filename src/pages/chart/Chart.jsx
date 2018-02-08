import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import React from 'react';
import {Card} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { getTopic } from './reducer'
import TimeChart from '../../components/timechart/Index';
import Mqtt from 'mqtt';


export default class ChartDemo extends React.Component{
    state={data:[],pro:[],s:[]};
    componentWillMount(){
        let _this = this;
        const seq = this.props.match.params.seq;
        // const {mqtt} = this.props;
        let mqtt = Mqtt.connect("ws://120.76.136.124:8083/mqtt");
        _this.setState({mqtt});
        getTopic(seq).then(topic =>{
            console.log(topic)
            mqtt.subscribe(topic);
            _this.setState({topic});
            mqtt.on("message",(topic,msg)=>{
                msg=JSON.parse(msg.toString());
                msg.arrival=new Date();
                _this.state.data.push(msg);
                if(_this.state.data.length>100)_this.state.data.shift()
                _this.setState({data:_this.state.data});
                let pro = [];
                let s={};
                let data=this.state.data;
                console.log('data',data)
                if(data.length>0){
                    pro = Object.keys(data[0]).filter(i=>typeof(data[0][i])=='number');
                    pro.forEach(i=>s[i]=data.map(it=>({value:[it.arrival,it[i]]})))
                }
                _this.setState({s});
                _this.setState({pro});
            })
        })
    }
    componentWillUnmount(){
        const mqtt = this.state.mqtt;
        mqtt.unsubscribe(this.state.topic);
    }
    getDate(){
        return new Date()
    }
    render(){console.log(this.state)
        return (
            <div>
                <BreadcrumbCustom first="charts" /> 
                <Card title="charts">
                    <TimeChart pro={this.state.pro} s={this.state.s}/>
                </Card>
            </div>        
        );
    }   
}

 function test(){
    let t1 = new Date('2017/1/1'),
        t2 = new Date('2017/1/2'),
        t3 = new Date('2017/1/3');
    let  s = {a:[
                {value:[t1,Math.random()*100]},
                {value:[t2,Math.random()*100]},
              ],
            b:[
                {value:[t1,Math.random()*100]},
                {value:[t2,Math.random()*100]},
              ]
            }
    return (
        <TimeChart pro={['a','b']} s={s}/>
    );
}

