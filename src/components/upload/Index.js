import React from 'react';
import { Upload, message, Button, Icon } from 'antd';

export default class MyUpload extends React.Component {
    state = {
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
    }
    handleChange = (info) => {
        let _this=this;
        let fileList = info.fileList;
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            fileList = fileList.slice(-1);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }  
      
  
      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      
  
      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
            file.response=file.response.slice(-1)
          // Component will show file.url as link
          file.url = file.response[0].fileName;
          _this.props.onDone({'file':file.url})
        }
        return file;
      });
  
      // 3. filter successfully uploaded files according to response from server
    //   fileList = fileList.filter((file) => {
    //     if (file.response) {
    //       return file.response.status === 'success';
    //     }
    //     return true;
    //   });
      console.log(fileList)
      this.setState({ fileList });
    }
    render() {
      const {action} =this.props;
      console.log(action)
      const props = {
        action,
        onChange: this.handleChange,
        multiple: true,
      };
      return (
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" />
          </Button>
        </Upload>
      );
    }
  }