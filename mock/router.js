export const sysRoute = {
  path: "/one",
  name: "one",
  component: "LAYOUT",
  redirect: "/system/account",
  meta: {
    icon: "ion:settings-outline",
    title: "routes.demo.system.moduleName",
  },
  children: [
    {
      path: "account",
      name: "AccountManagement",
      meta: {
        title: "routes.demo.system.account",
        ignoreKeepAlive: true,
      },
      component: "/demo/system/account/index",
    },
    {
      path: "account_detail/:id",
      name: "AccountDetail",
      meta: {
        hideMenu: true,
        title: "routes.demo.system.account_detail",
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/system/account",
      },
      component: "/demo/system/account/AccountDetail",
    },
    {
      path: "role",
      name: "RoleManagement",
      meta: {
        title: "routes.demo.system.role",
        ignoreKeepAlive: true,
      },
      component: "/demo/system/role/index",
    },

    {
      path: "menu",
      name: "MenuManagement",
      meta: {
        title: "routes.demo.system.menu",
        ignoreKeepAlive: true,
      },
      component: "/demo/system/menu/index",
    },
    {
      path: "dept",
      name: "DeptManagement",
      meta: {
        title: "routes.demo.system.dept",
        ignoreKeepAlive: true,
      },
      component: "/demo/system/dept/index",
    },
    {
      path: "changePassword",
      name: "ChangePassword",
      meta: {
        title: "routes.demo.system.password",
        ignoreKeepAlive: true,
      },
      component: "/demo/system/password/index",
    },
  ],
};
