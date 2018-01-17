import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { $name$Thunk } from './reducer'


const columns=$columns$;

class ListDemo extends Component {
  componentDidMount(){
    this.props.dispatch($name$Thunk.get());
  }
  handleAdd(record){
    this.props.dispatch($name$Thunk.add(record)); 
  }
  handleDelete(record){
    this.props.dispatch($name$Thunk.delete(record));
  }
  handleUpdate(record){
    this.props.dispatch($name$Thunk.update(record));
  }
  render() {
    return (
      <div>
        <BreadcrumbCustom first="$name$" /> 
        <Card title="$name$列表">
        <List columns={columns} dataSource={this.props.$name$}
            onAdd={this.handleAdd.bind(this)}
            onDelete={this.handleDelete.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}
        /> 
        </Card>
      </div>
    );
  }
}

export default connect((state)=>({$name$:state.$name$}))(ListDemo);
