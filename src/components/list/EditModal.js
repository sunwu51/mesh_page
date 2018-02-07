import React from 'react';
import { Modal,Input,Form,Select } from 'antd';
import _ from 'lodash'
import Upload from '../upload/Index';
const { TextArea } = Input

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
       {
         if(s[k]===null)
           s[k]=null;
        //  else
        //    s[k]=s[k].toString()
        }
      else
       delete s[k]
    }
    this.props.form.resetFields();
    this.props.form.setFieldsValue(s);
    // this.props.form.setFieldsValue({"gconfid":"1"});
  }
  handleOk = (e) => { 
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { titles } = this.props;
        const { record } = this.props;  
        const numfilds ={};
        titles.filter(o=>o.type&&o.type=="number").forEach(q=>{
          numfilds[q.key]=parseFloat(values[q.key])});
        onOk(Object.assign(record,values, numfilds));
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
  changeValue = (s)=>{
    this.props.form.setFieldsValue(s);
  }
  render() {
    let _this = this;
    const { getFieldDecorator } = this.props.form;
    const titles = this.props.titles;
    const record = this.props.record;
    
    const InputItem = (
        titles.map(it=>{
          if(it.key==='_action')return;
          
          let inputit=(<Input />)
          let Filebtn=(<span/>);
          if(Array.isArray(it.selection)){
            let options=it.selection.map(item=>(
            <Option key={item.value} value={item.value} title={item.text}>{item.text}</Option>
            ))
            inputit= <Select placeholder={"选择一个"+it.title}>{options}</Select> 
          }
          if(it.file){
            Filebtn=( 
              <Upload action={it.file.upload} onDone={_this.changeValue}/>
            )
          }
          else if(it.textarea){
            inputit=<TextArea rows={4} />
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
                    rules: [{required:it.required===false?false:true,type,message: '请输入合法的'+title,transform:(el)=>{if(type==='number'&&!isNaN(el))return parseFloat(el);else{return el}} }]
                    })(
                      inputit
                    )}     
                     {(
                      Filebtn
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