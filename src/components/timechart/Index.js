import ReactEcharts from 'echarts-for-react';
import React from 'react';

export default class TimeCharts extends React.Component{
    render(){
        let i=0;
        let j=0;
        const yAxis= this.props.pro.map(it=>{
            return {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                yAxisIndex:i++, 
            }
        })
        const series = this.props.pro.map(it=>{
            return {
                type: 'line',
                showSymbol: false,
                yAxisIndex:j++, 
                // hoverAnimation: false,
                data: this.props.s[it]
            }
        })
        let option = {
            title: {
                text: '节点实时数据'
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis,
            series
        };
        return <ReactEcharts
                option={option}
                style={{height: '300px', width: '100%'}}
                className={'react_for_echarts'}
        />
    }

}