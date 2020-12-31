import Login from '../view/Login.jsx';
import System from '../view/System.js';
import Menu from '../view/auth/menus.js';
import Role from '../view/auth/role.js';
import UBus from '../view/user/Bus.js';
import UBus22 from '../view/user/Bus22.js';
//工作态路由结构
const routes = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/",
    component: System,
    auth:false,
    routes: [
      {
        path: "/auth/menu",
        component: Menu,
        exact: true,
        auth:false,
      },
      {
        path: "/auth/role",
        component: Role,
        exact: true,
        auth:false,
      },
      {
        path: "/user/bus",
        component: UBus,
        exact: true,
        auth:false,
      },
      {
        path: "/user/bus22",
        component: UBus22,
        exact: true,
        auth:false,
      },
    ]
  }
];


//配置实际结构
const mockroute = [
  {
    path:'/auth',
    name:'权限管理',
    component:'',
    children:[
      {
        path: "/auth/menu",
        component: Menu,
        name:'菜单管理',
      },
      {
        path: "/auth/role",
        component: Role,
        name:'用户管理',
      },
    ]
  },
  {
    path:'/user',
    name:'客户管理',
    component:'',
    children:[
      {
        path: "/user/bus22",
        component: UBus,
        name:'菜单管理',
      },
      {
        path: "/user/bus",
        component: UBus22,
        name:'用户管理',
      },
    ]
  },
]


// export default routes;
export {routes,mockroute}
