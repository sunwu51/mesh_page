import React from 'react';
import { Modal,Input,Form,Select } from 'antd';
import _ from 'lodash'

const FormItem = Form.Item;
const Option = Select.Option;
class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
    let s =Object.assign({},this.props.record);
    for(let k in s){
      if(! (_.find(this.props.titles,{key:k,editable:false})))
       s[k]=s[k].toString()
      else
       delete s[k]
    }
    this.props.form.resetFields();
    this.props.form.setFieldsValue(s)
  }
  handleOk = (e) => { 
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { record } = this.props;  
        onOk(Object.assign(Object.assign({},record), values));
        this.setState({
            visible: false,
        });
      }
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    // this.props.onCancel();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const titles = this.props.titles;
    const record = this.props.record;
    
    const InputItem = (
        titles.map(it=>{
          if(it.key==='_action')return;
          
          let inputit=(<Input />)
          if(Array.isArray(it.selection)){
            let options=it.selection.map(item=>(
            <Option key={item} value={item}>{item}</Option>
            ))
            inputit= <Select placeholder={"选择一个"+it.title}>{options}</Select> 
          }
            
          const {key,title,type}=it;
          let init=null;
          if(record[key]||record[key]===false)
            init=record[key].toString()
          if(it.editable===false);
          else
            return(
            <FormItem
                key={key}
                label={title}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator(key, {
                rules: [{required:true,type,message: '请输入合法的'+title, initialValue: String(init),transform:(el)=>{if(type==='number'&&!isNaN(el))return parseFloat(el);else{return el}} }]
                })(
                  inputit
                )}
            </FormItem>
        )})
        
    )
    return (
      <span>
        <span onClick={this.showModal}>
              {this.props.children}
        </span>
        <Modal
          title="编辑属性"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
            <Form onSubmit={this.handleOk}>
                { InputItem }
            </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(App);   