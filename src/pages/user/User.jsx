import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { userThunk } from './reducer'


const columns=[{"key":"id","title":"用户的id","isId":true,"editable":false},{"key":"username"},{"key":"orgid"}];

class ListDemo extends Component {
  componentDidMount(){
    this.props.dispatch(userThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(userThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(userThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(userThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="user" /> 
        <Card title="user列表">
        <List columns={columns} dataSource={this.props.user}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({user:state.user}))(ListDemo);
