<template>
  <div>Hello Word</div>
</template>

<script setup>
const routerList = [
  {
    menuId: 1,
    parentId: 0,
    parentName: null,
    name: "系统管理",
    url: null,
    perms: null,
    type: 0,
    icon: "system",
    orderNum: 9,
    open: null,
    list: [
      {
        menuId: 252,
        parentId: 1,
        parentName: null,
        name: "设备类型维护",
        url: "equipmentMaintenance/list",
        perms: "sys:equip:type:list",
        type: 1,
        icon: null,
        orderNum: 0,
        open: null,
        list: null,
      },
      {
        menuId: 254,
        parentId: 1,
        parentName: null,
        name: "设备参数维护",
        url: "parameterMaintenance/list",
        perms: "sys:equip:params:list",
        type: 1,
        icon: null,
        orderNum: 0,
        open: null,
        list: null,
      },
      {
        menuId: 255,
        parentId: 1,
        parentName: null,
        name: "设备保养项维护",
        url: "careMaintenance/list",
        perms: "sys:equip:maintain:list",
        type: 1,
        icon: null,
        orderNum: 0,
        open: null,
        list: null,
      },
      {
        menuId: 3,
        parentId: 1,
        parentName: null,
        name: "角色管理",
        url: "sys/role",
        perms: "sys:role",
        type: 1,
        icon: null,
        orderNum: 2,
        open: null,
        list: null,
      },
      {
        menuId: 4,
        parentId: 1,
        parentName: null,
        name: "菜单管理",
        url: "sys/menu",
        perms: "sys:menu",
        type: 1,
        icon: null,
        orderNum: 3,
        open: null,
        list: null,
      },
      {
        menuId: 245,
        parentId: 1,
        parentName: null,
        name: "站点管理",
        url: null,
        perms: null,
        type: 0,
        icon: null,
        orderNum: 10,
        open: null,
        list: [
          {
            menuId: 246,
            parentId: 245,
            parentName: null,
            name: "站点列表",
            url: "site_manager/list",
            perms: "equip:affiliation:list",
            type: 1,
            icon: null,
            orderNum: 0,
            open: null,
            list: null,
          },
        ],
      },
      {
        menuId: 247,
        parentId: 1,
        parentName: null,
        name: "用户管理",
        url: null,
        perms: null,
        type: 0,
        icon: null,
        orderNum: 11,
        open: null,
        list: [
          {
            menuId: 249,
            parentId: 247,
            parentName: null,
            name: "用户列表",
            url: "user_manager/list",
            perms: "user:manager:list",
            type: 1,
            icon: null,
            orderNum: 0,
            open: null,
            list: null,
          },
        ],
      },
    ],
  },
];
const setRouter = () => {
  const p = [],
    v = {},
    meta = {};
  // 理由循环去遍历里面的每一个对象
  routerList.forEach((item) => {
    meta.title = item?.name;
    meta.isHide = item?.isHide;
    v.push = item.url;
    v.name = item?.name;
    v.meta = meta;
    v.children = item.chiMenu;
    if (item.chiMenu) this.setRouter(item.chiMenu);
    p.push(v);
  });
  return p;
};
</script>

<style scoped lang="scss"></style>
