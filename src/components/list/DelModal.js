import { Modal } from 'antd';
import React from 'react';


const confirm = Modal.confirm;


function showDeleteConfirm(onOk2) {
  confirm({
    title: '提示',
    content: '是否确定删除',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk(){
        onOk2();
    },
    onCancel() {
    },
  });
}


 function DelModal({children,onOk}){
    return(
      <span onClick={()=>showDeleteConfirm(onOk)}>
        {children}
      </span>
    );
 }
 export default DelModal;   
