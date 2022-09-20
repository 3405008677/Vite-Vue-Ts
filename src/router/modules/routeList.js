import login from "@/api/login";
import { userStore } from "@/store";
import { lazyRoute } from "@/utils";
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成热更新太慢, 所以只有生产环境使用懒加载
let _import = lazyRoute(import.meta.env.PROD)
class PermissionStore {
  #routerList;
  constructor() {
    this.#routerList = [];
  }
  // 获取路由数据
  async geRouter() {
    let { data } = await login.getMenus();
    this.#routerList = data;
    userStore.setPermissionStore(data);
    // 获取用户信息
    data = await login.getUserInfo();
    userStore.setUserInfo(data);
  }
  // 添加路由
  createRouter() {
    this.geRouter();
    this.#routerList = this.setRouter();
  }

  // 格式化路由
  setRouter() {
    const p = [],
      v = {},
      meta = {};
    // 理由循环去遍历里面的每一个对象
    this.#routerList.forEach((item) => {
      meta.title = item?.name;
      meta.isHide = item?.isHide;
      v.push = item.url;
      v.name = item?.name;
      v.meta = meta;
      v.children = item.chiMenu;
      v.component = _import(item.component);
      if (item.chiMenu) this.setRouter(item.chiMenu);
      p.push(v);
    });
    return p;
  }
}

export default new PermissionStore();
