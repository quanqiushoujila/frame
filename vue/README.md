# frame

> A Vue.js project

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7  + sass + echarts + element-ui + vue-cookie + axios + qs + lodash

## 项目布局

```
.
├── component 									// 组件目录
│   ├── common
│   │   └── index.js 							// 公用组件
│   ├── dialog
│   │   └── dialog.js 							// 弹窗组件
│   ├── form
│   │   ├── form.js 							// 表单组件
│   │   ├── detail.js 							// 详情组件
│   │   └── logDetail.js 						// 日志详情
│   ├── menu
│   │   └── subMenu.js 							// 菜单组件
│   ├── tab
│   │   └── tab.js 								// tab组件
│   └── table
│       └── tab.js 								// 表格组件
├── css 										// 样式目录
│   ├── common
│   │   ├── login.css 							// 登录页样式
│   │   ├── mainIndex.css 						// 主页样式
│   │   └── system.css 							// 系统设置样式文件
│   ├── common.css 								// 公用样式
│   └── administrativeLicensing.css 			// 事项清单样式文件
├── font										// 字体目录
│   ├── iconfont.eot
│   ├── iconfont.svg
│   ├── iconfont.ttf
│   └── iconfont.woff
├── img 										// 图片文件目录
│   ├── logo.jpg
│   ├── logo1.jpg
│   ├── bg-index.jpg
│   ├── bg-login.jpg
│   └── logo-login.jpg
├── js 
│   ├── lib
│   │   ├── element-ui							// element-ui
│   │   │   ├── fonts
│   │   │   │   ├── element-icons.ttf
│   │   │   │   └── element-icons.woff
│   │   │   ├── inedx.css
│   │   │   └── inedx.js
│   │   ├── jquery.min.js						// jquery
│   │   ├── mock.js								// mock
│   │   └── vue.min.js							// vue
│   ├── mixin									// vue混入文件目录
│   │   ├── common.js 							// 公用混入方法
│   │   └── mainMenu.js 						// 主菜单生成
│   ├── util 									// 工具类目录
│   │   └── index.js
│   ├── page 									// 页面js目录
│   │   ├── catalog
│   │   │   └── resourcesCatalog
│   │   │       ├── dataElementDialog.js 		// 数据弹窗
│   │   │       └── resourcesDialog.js 			// 信息资源弹窗
│   │   ├── guidelinesForMatters
│   │   │   └── resourcesCatalog
│   │   │       └── administrativeLicensing		// 事项清单
│   │   │           ├── stepCommon.js			// 步骤条公用js
│   │   │           └── stepDetils.js 			// 步骤条合并js
│   │   └── system
│   │       ├── compartment 					// 行政区划js目录
│   │       │   └── compartmentDialog.js
│   │       ├── department 						// 机构管理js目录
│   │       │   └── departmentDialog.js
│   │       ├── dictionary 						// 字典管理js目录
│   │       │   └── dictionaryDialog.js
│   │       ├── log 							// 系统日志js目录
│   │       │   └── logDialog.js
│   │       ├── menu 							// 菜单管理js目录
│   │       │   └── menuDialog.js
│   │       ├── role 							// 角色管理js目录
│   │       │   └── roleDialog.js
│   │       ├── time 							// 时间管理js目录
│   │       │   └── timeDialog.js
│   │       └── user 							// 用户管理js目录
│   │           └── userDialog.js
│   └── icon.js
├── page										// 页面静态文件目录
│   ├── catalog
│   │   └── resourcesCatalog					// 信息资源弹窗
│   │       └── index.html
│   ├── guidelinesForMatters
│   │   └── resourcesCatalog
│   │       └── administrativeLicensing			// 事项清单
│   │           └── index.html
│   ├── common									// 入口页面
│   │   ├── login.html
│   │   ├── main.html
│   │   └── mainIndex.html
│   └── system
│       ├── compartment 						// 行政区划
│       │   └── index.html
│       ├── department 							// 机构管理
│       │   └── index.html
│       ├── dictionary 							// 字典管理
│       │   └── index.html
│       ├── log 								// 系统日志
│       │   └── index.html
│       ├── menu 								// 菜单管理
│       │   └── index.html
│       ├── role 								// 角色管理
│       │   └── index.html
│       ├── time 								// 时间管理
│       │   └── index.html
│       └── user 								// 用户管理
│           └── index.html
├── base.html
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