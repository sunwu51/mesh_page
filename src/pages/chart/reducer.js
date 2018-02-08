import {request} from '../../axios/request'

export  function getTopic(seq){
    request({method:"get",url:"http://localhost:8080/hw/topic/"+seq}).then(
        res=>{return res.data.topic}
    )
}
