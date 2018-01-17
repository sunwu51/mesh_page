# 增删改查自动生成
# Usage
## 1 修改generaton.json文件，改文件属性如下：
```json
{
    "name":"user",
    "columns": [
        {"key":"id","title":"用户ID","isId":true,"editable":false},
        {"key":"username"},
        {"key":"orgid"}
    ],
    "url":{
        "baseUrl":"http://localhost:3456/user",
        "id":"id",
        "get":{
            "method":"get",
            "path":"/"
        },
        "add":{
            "method":"post",
            "path":"/"
        },
        "delete":{
            "method":"delete",
            "path":"/"
        },
        "update":{
            "method":"patch",
            "path":"/" 
        }
    }
}
```
>name：创建的列表的名字，如user  
columns：数据的列，其中必填的项为key，其他属性[参考说明](https://github.com/sunwu51/webcomponent/blob/master/reactcomponent/README.md)  
url.baseUrl：数据操作的后台url地址  
url.id：id字段名，会影响delete/update的url最后参数  
url.get：获取全部数据的请求
url.add：增加条目的请求
url.delet：删除条目的请求
url.update：更新条目的请求 

## 2 利用json-server测试（选做）
为了测试ajax的可用性，可以利用json-server进行测试。在项目目录下的`data.json`作为数据源启动的rest server。目前该json下有user和org两类数据。项目目录下运行：
```shell
npm run mock
```
## 3 在根目录下运行
```shell
npm run generate
```
代码生成，可以直接在页面中看到变化。
![image](img/list.gif)
# 说明
生成的代码全都在`src/page`目录下，生成一个和`name`同名的文件夹，里面的`index.js`放置了这个页面组件，而`reducer.js`放置reducer，同时还修改了pages目录下的`menus.js`文件，添加了一条作为菜单和路由。   

你可以只在pages这个目录下完成页面的编写，而不用来回切换目录。如果不想自动生成路由，可以去掉menus数组中的name属性，我是依赖这个属性自动添加的路由。


