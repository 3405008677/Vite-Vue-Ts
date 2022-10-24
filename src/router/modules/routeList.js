import { getMenusApi } from "@/api/user";
import { userStore } from "@/store";
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成热更新太慢, 所以只有生产环境使用懒加载
class PermissionStore {
  #routerList;
  constructor() {
    this.#routerList = [];
  }
  // 获取路由数据
  async getRouter() {
    let { data } = await getMenusApi();
    this.#routerList = data;
    userStore.setPermissionStore(data);
  }
  // 添加路由
  createRouter() {
    this.getRouter();
    this.#routerList = this.setRouter();
    return this.#routerList;
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
      v.component = () => import(/* @vite-ignore */"@/views/" + item.component + ".vue");
      if (item.chiMenu) this.setRouter(item.chiMenu);
      p.push(v);
    });
    return p;
  }
}

export default new PermissionStore();
