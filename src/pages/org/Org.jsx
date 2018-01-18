import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { orgThunk } from './reducer'


const columns=[{"key":"id","title":"orgID","isId":true,"editable":false},{"key":"orgname"}];

class ListDemo extends Component {
  componentDidMount(){
    this.props.dispatch(orgThunk.get());
  }
  handleAdd(record){
    this.props.dispatch(orgThunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch(orgThunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch(orgThunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="org" /> 
        <Card title="org列表">
        <List columns={columns} dataSource={this.props.org}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({org:state.org}))(ListDemo);
