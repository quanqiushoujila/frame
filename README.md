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
│   │   ├── _btn                                 // 按钮组件
│   │   │   ├── addBtn.vue                       // 新增按钮
│   │   │   ├── deleteQueryBtn.vue               // 批量删除按钮
│   │   │   ├── exportBtn.vue                    // 导入按钮
│   │   │   ├── importBtn.vue                    // 导出按钮
│   │   │   └── searchBtn.vue                    // 搜索按钮
│   │   ├── _dialog                              // 弹窗组件
│   │   │   └── dialog.vue                       // 弹窗
│   │   ├── _form                                // form表单
│   │   │   └── detail.vue                       // 详情页
│   │   ├── _layout                              // 布局组件
│   │   │   ├── bodyLayout.vue                   // 主体布局
│   │   │   └── headerLayout.vue                 // 头部布局
│   │   ├── _menu                                // 菜单
│   │   │   └── subMenu.vue                      // 菜单组件
│   │   ├── _table                               // 表格
│   │   │   ├── kTable.vue                       // 表格
│   │   │   └── tableTree.vue                    // 表格树
│   │   └── main                                 // 主页面组件
│   │       ├── main-header.vue                  // 头部
│   │       ├── main-menu.vue                    // 菜单
│   │       └── main-content.vue                 // 主内容
│   ├── js                                       
│   │   ├── api                                  // 接口
│   │   │   ├── common                           // 主页面接口
│   │   │   └── system                           // 系统配置接口
│   │   ├── config                               // 配置  
│   │   │   └── _global.js                       // 全局变量
│   │   ├── mixin                                // vue mixin文件 
│   │   │   ├── mainMenu.js                      // 获取当条菜单
│   │   │   └── common.js                        // 公共方法
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
│   │       ├── log                              // 操作日志
│   │       │   └── index.vue
│   │       ├── compartment                      // 行政区划  
│   │       │   ├── compartmentDialog.vue        // 弹窗
│   │       │   └── index.vue
│   │       ├── department                       // 机构管理  
│   │       │   ├── departmentDialog.vue         // 弹窗
│   │       │   └── index.vue
│   │       ├── dictionary                       // 字典管理  
│   │       │   ├── dictionaryDialog.vue         // 弹窗
│   │       │   └── index.vue
│   │       ├── time                             // 定时任务管理  
│   │       │   ├── timeDialog.vue               // 弹窗
│   │       │   └── index.vue
│   │       ├── parame                           // 参数配置
│   │       │   └── index.vue
│   │       ├── menu                             // 菜单管理  
│   │       │   ├── menuDialog.vue               // 弹窗
│   │       │   └── index.vue
│   │       ├── role                             // 角色管理
│   │       │   ├── roleDialog.vue               // 弹窗
│   │       │   └── index.vue
│   │       ├── use                              // 用户管理
│   │       │   ├── useDialog.vue                // 弹窗
│   │       │   └── index.vue
│   │       └── 
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

#### 其他
[treetable](https://github.com/MisterTaki/vue-table-with-tree-grid)