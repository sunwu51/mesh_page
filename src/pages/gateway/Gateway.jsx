import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { gatewayThunk } from './reducer';
import { gconfThunk } from '../gconf/reducer'
import { getSelection } from '../../axios/request'


let columns= [
  {"key":"gid","title":"网关id","isId":true,"editable":false},
  {"key":"seq","title":"序列号"},
  {"key":"section","title":"项目"},
  {"key":"gconfid","title":"网关配置id","type":"number","selection":{url:"http://localhost:8080/hw/gconf",value:"gconfid"}},
  {"key":"remark","title":"备注","required":false}        
]
class ListDemo extends Component {
  constructor(props){
    super(props);
    let _this = this;
    columns.map(async function t(it){
      if(it.selection&&!Array.isArray(it.selection)){
        var {url,value} = it.selection;
        var selection = await getSelection(url);
        it.selection = selection.data.map(its=>{
          return {value:its[value],text:its[value]+"."+its.remark}
        });
        return it;
      }
      else{
        return it;
      }
    })
    this.state={columns};
    console.log(this.state)
  }
  componentDidMount(){
    this.props.dispatch(gatewayThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(gatewayThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(gatewayThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(gatewayThunk.update(record));
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <BreadcrumbCustom first="gateway" /> 
        <Card title="gateway列表">
        <List columns={this.state.columns} dataSource={this.props.gateway}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({gateway:state.gateway}))(ListDemo);
