import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import React from 'react';
import {Card} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { getTopic } from './reducer'
import TimeChart from '../../components/timechart/Index'

class ChartDemo extends React.Component{
    state={data:[]};
    componentDidMount(){
        let _this = this;
        const seq = this.props.match.params.seq;
        const {mqtt} = this.props;
        getTopic(seq).then(topic =>{
            mqtt.subscribe(topic);
            _this.setState({topic});
            mqtt.on("message",(topic,msg)=>{
                msg=JSON.parse(msg.toString());
                _this.state.data.push(msg);
                if(_this.state.data.length>100)_this.state.data.shift()
                _this.setState({data:_this.state.data});
            })
        })
    }
    componentWillUnmount(){
        const mqtt = this.state.mqttclient;
        mqtt.unsubscribe(this.state.topic);
    }
    render(){
        const {data} = this.state;
        let pro = [];
        let s={};
        if(data.length>0){
            pro = Object.keys(data[0]).filter(i=>typeof(data[0][i])=='number');
            pro.forEach(i=>s[i]=data.map(it=>(it[i])))
        }
        return (
            <div>
                <BreadcrumbCustom first="charts" /> 
                <Card title="charts">
                    <TimeChart pro={pro} s={s}/>
                </Card>
            </div>        
        );
    }   
}

export default function test(){
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

