# frame

> A Vue.js project

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7  + sass + echarts + element-ui + vue-cookie + axios + qs + lodash

## 项目布局

```
.
├── build                                        // webpack配置文件
├── config                                       // 项目打包路径
├── src                                          // 源码目录
│   ├── assets                                   // 静态文件
│   │   ├── css                                  // 全局css
│   │   │   └── iconfont.css                     // 字体css
│   │   ├── font                                 // 字体文件
│   │   ├── img                                  // 图片文件
│   │   └── scss                                 
│   │       ├── index.scss                       // scss入口
│   │       ├── reset.scss                       // css初始化文件
│   │       ├── varibles.scss                    // 全局样式变量文件
│   │       ├── public.scss                      // 公共样式文件
│   │       └── base.scss                        // 基础样式文件
│   ├── components                               // 组件
│   │       ├── main                             // 主页面组件
│   │       │   ├── main-header.vue              // 头部
│   │       │   ├── main-menu.vue                // 菜单
│   │       │   └── main-content.vue             // 主内容
│   │       └── menu                             // 菜单组件
│   │           └── menu.vue                     // 菜单
│   ├── js                                       
│   │   ├── api                                  // 接口
│   │   │   └── index.js                         // 所有接口
│   │   ├── config                               // 配置  
│   │   │   └── _global.js                       // 全局变量
│   │   ├── mixin                                // vue mixin文件 
│   │   └── util                                 // 公共方法
│   │       ├── httpRequest.js                   // 数据请求方法
│   │       ├── index.js                         // 其他方法
│   │       └── validate.js                      // 验证方法
│   ├── mock                                     // 模拟数据文件
│   ├── page                                     // 页面
│   │   ├── chart                                // echarts图形
│   │   ├── common                               // 公共页面
│   │   │   ├── login.vue                        // 登录页
│   │   │   ├── mainIndex.vue                    // 总目录页
│   │   │   └── main.vue                         // 主页
│   │   └──system                                // 系统配置页面
│   │   │   ├── log.vue                          // 操作日志
│   │   │   ├── menu.vue                         // 菜单管理
│   │   │   └── role.vue                         // 角色管理
│   ├── router                                   // 路由
│   │   │   ├── import.js                        // 路由懶加載方法
│   │   │   ├── mainMenu.js                      // 菜单首页路由
│   │   │   ├── childrenMenu.js                  // 子菜单路由
│   │   └── index.js                             // 路由配置
│   └── store                                    // vuex的状态管理
│       ├── module                               // store模块
│       │   └── common.js                        // 公共store模块
│       └── index.js                             // 引用vuex，创建store
│   └── App.vue                                  // 页面入口文件
│   └── main.js                                  // 程序入口文件，加载各种公共组件
├── static                                       // 静态文件存放
├── index.html                                   // 入口html文件
.

```

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本 

``` bash

npm install 或者 cnpm install (需要安装淘宝镜像)

npm run dev

npm run build

```
