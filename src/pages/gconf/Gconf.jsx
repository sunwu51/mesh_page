import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { gconfThunk } from './reducer'



class ListDemo extends Component {
  constructor(props){
    super(props)
    const columns=[
      {"key":"gconfid","title":"网关配置id","isId":true,"editable":false},
      {"key":"file","title":"文件路径","file":{"upload":"//localhost:8080/hw/upload"}},
      {"key":"remark","title":"备注","required":false}  
    ]
    this.state={columns}
  }
  componentDidMount(){
    this.props.dispatch(gconfThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(gconfThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(gconfThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(gconfThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="gconf" /> 
        <Card title="gconf列表">
        <List columns={this.state.columns} dataSource={this.props.gconf}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({gconf:state.gconf}))(ListDemo);
