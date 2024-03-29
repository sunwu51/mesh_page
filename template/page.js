import React, { Component} from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import List from '../../components/list/Index'
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { $name$Thunk } from './reducer'
import { getSelection } from '../../axios/request'





class ListDemo extends Component {
  constructor(props){
    super(props);
    const columns=$columns$;
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
  }
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
        <List columns={this.state.columns} dataSource={this.props.$name$}
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
