import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { nodeThunk } from './reducer'
import { getSelection } from '../../axios/request'
import {Link} from 'react-router-dom'





class ListDemo extends Component {
  constructor(props){
    super(props);
    const columns=[{"key":"nid","title":"节点id","isId":true,"editable":false},
    {"key":"gid","title":"网关id","type":"number",
    "selection":{"url":"http://localhost:8080/hw/gateway","value":"gid"}
    },{"key":"seq","title":"序列号","editable":false},
    {"key":"online","title":"在线状态","type":"number","editable":false,"render":(text,record)=>{
      let content=<b style={{color:"green"}}>在线<Link to={"/app/chart/"+record.seq}>[查看图表]</Link></b>
      if(text=='0')
        content=<b style={{color:"red"}}>离线</b>
      return content;
    }},
    {"key":"ntypeid","title":"节点类型","type":"number",
    "selection":{"url":"http://localhost:8080/hw/ntype","value":"ntypeid"}},
    {"key":"nconfid","title":"节点配置","type":"number",
    "selection":{"url":"http://localhost:8080/hw/nconf","value":"nconfid"}},
    {"key":"remark","title":"备注","required":false}];
    columns.map(async function(it){
      if(it.selection&&!Array.isArray(it.selection)){
        var {url,value} = it.selection;
        var selection = await getSelection(url);
        it.selection = selection.data.map(its=>{
          console.log({value:its[value],text:its[value]+"."+its.remark})
          return {value:its[value],text:its[value]+"."+its.remark}
        });
        return it;
      }
      else{
        return it;
      }
    })
    this.state={columns};
    console.log('构造函数')
  }
  componentWillMount(){
    
    console.log('构造函数')
  }
  componentDidMount(){
    console.log('挂载成功')
    
    this.props.dispatch(nodeThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(nodeThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(nodeThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(nodeThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="node" /> 
        <Card title="node列表">
        <List columns={this.state.columns} dataSource={this.props.node}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({node:state.node}))(ListDemo);
