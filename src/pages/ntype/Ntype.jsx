import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { ntypeThunk } from './reducer'



class ListDemo extends Component {
  constructor(props){
    super(props)
    const columns=[{"key":"ntypeid","title":"节点id","isId":true,"editable":false},{"key":"typename","title":"类型名"},{"key":"datamodel","title":"数据模型(json)",'textarea':true},{"key":"modelstr","title":"nodered代码","editable":false},{"key":"remark","title":"备注","required":false}];
    this.state={columns}
  }
  componentDidMount(){
    this.props.dispatch(ntypeThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(ntypeThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(ntypeThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(ntypeThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="ntype" /> 
        <Card title="ntype列表">
        <List columns={this.state.columns} dataSource={this.props.ntype}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({ntype:state.ntype}))(ListDemo);
