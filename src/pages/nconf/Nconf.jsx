import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { nconfThunk } from './reducer'



class ListDemo extends Component {
  constructor(props){
    super(props)
    const columns=[{"key":"nconfid","title":"节点配置id","isId":true,"editable":false},{"key":"file","title":"文件路径","file":{"upload":"//localhost:8080/hw/upload"}},{"key":"remark","title":"备注","required":false}];
    this.state={columns}
  }
  componentDidMount(){
    this.props.dispatch(nconfThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(nconfThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(nconfThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(nconfThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="nconf" /> 
        <Card title="nconf列表">
        <List columns={this.state.columns} dataSource={this.props.nconf}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({nconf:state.nconf}))(ListDemo);
