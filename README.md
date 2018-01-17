# mesh_page
页面展示
## 开发文档
接口文档使用服务端的Swagger文档
## 功能
用户登录、设备查看、数据查看、数据分析、反向配置等
## 最终效果
- 能完成上面的功能
- 能动态的展示数据，通过图表(echarts)展示
- 能进行人员设备的增删改操作，分页显示等
## 项目说明
直接fork的[https://github.com/yezihaohao/react-admin](https://github.com/yezihaohao/react-admin)的代码，基本保留了原来的文件，只是将menus.js文件的位置从`/src/constants/`移动到了`/src/pages`目录下，并先去掉了各种路由和侧栏菜单。  

>React + ReactRouter@3 + Reudx + ReduxThunk
## 项目启动
[安装nodejs](https://nodejs.org/en/)  
[安装yarn](https://yarnpkg.com/en/docs/install)    
[安装create-react-app](https://www.npmjs.com/package/create-react-app)  
```
yarn install
yarn start
```

## 脚手架
提供了方便易用的脚手架功能，如下
- [增删改查页面的自动生成](list.md)(finish)
- [echarts折线图的自动生成](chart.md)(ongoing)
- [jwt身份认证组件](jwt.md)(ongoing)
- [mqtt连接和认证组件](mqtt.md)(ongoing)


