'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
const model = require('../models/baseModel');

const context = 'menu';
const buildMenu = (parentMenu, menuList) => {
  parentMenu.children = [];
  const children = menuList.filter(item => {
    return item.parentId == parentMenu.id;
  });
  for (const menu of children) {
    buildMenu(menu, menuList);
  }
  parentMenu.children.push(...children);
};
const buildAccessMenu = (parentMenu, menuList, userPermission) => {
  parentMenu.children = [];
  const children = menuList.filter(item => {
    return item.parentId == parentMenu.id && (!item.functionCode || userPermission.indexOf(item.functionCode) > -1);
  });
  // 父级没有权限访问，子级也不能访问
  for (const menu of children) {
    buildAccessMenu(menu, menuList, userPermission);
  }
  parentMenu.children.push(...children);
};
const checkAccssMenu = (accessMenuList, menuList) => {
  for (const item of accessMenuList) {
    if (item.children) {
      checkAccssMenu(item.children, menuList);
    }
  }
  _.remove(accessMenuList, item => {
    return item.children.length == 0 && menuList.some(s => {
      return s.parentId == item.id;
    });
  });
};
class menuService extends Service {
  async getMenuList() {
    const db = await model.init(context);
    let menuList = JSON.parse(JSON.stringify(db.value()));
    menuList = _.sortBy(menuList, [ 'sort' ]);
    const parentMenuList = menuList.filter(item => {
      return item.parentId == 0;
    });
    for (const menu of parentMenuList) {
      buildMenu(menu, menuList);
    }
    return parentMenuList;
  }
  async getAccessMenuList(userId) {
    const { service } = this;
    const db = await model.init(context);
    let menuList = JSON.parse(JSON.stringify(db.value()));
    menuList = _.sortBy(menuList, [ 'sort' ]);
    const parentMenuList = menuList.filter(item => {
      return item.parentId == 0 && !item.isLock;
    });
    const isAdmin = await service.userService.isAdmin(userId);
    const userPermission = await service.userService.getUserPermission(userId);
    if (isAdmin) {
      for (const menu of parentMenuList) {
        buildMenu(menu, menuList);
      }
    } else {
      for (const menu of parentMenuList) {
        buildAccessMenu(menu, menuList, userPermission);
      }
    }
    checkAccssMenu(parentMenuList, menuList);
    return parentMenuList;
  }
  async saveMenu(menu) {
    const db = await model.init(context);
    const exist = db.find({ name: menu.name }).value();
    if (exist && exist.id !== menu.id) {
      return {
        success: false,
        msg: '名称已经存在',
      };
    }
    if (menu.id) {
      await db.find({ id: menu.id })
        .assign(menu)
        .write();
    } else {
      await db.insert(menu).write();
    }
    return {
      success: true,
      msg: '',
    };
  }
  async getMenuWithChildren(menuId) {
    const db = await model.init(context);
    const menuList = JSON.parse(JSON.stringify(db.value()));
    const menuWithChildren = [];
    const menu = menuList.filter(s => {
      return (s.parentId == 0 && menuId == 0) || s.id == menuId;
    });
    const forFn = parentId => {
      const children = menuList.filter(s => {
        return s.parentId == parentId;
      });
      if (children.length > 0) {
        menuWithChildren.push(...children);
        for (const child of children) {
          forFn(child.id);
        }
      }
    };
    if (menu.length > 0) {
      menuWithChildren.push(...menu);
      for (const m of menu) {
        forFn(m.id);
      }
    }

    return menuWithChildren;
  }
  async getMenuFunctions(menuId) {
    const { service } = this;
    const menuList = await service.menuService.getMenuWithChildren(menuId);
    let functionList = await service.functionService.getFunctionList();
    functionList = _.sortBy(functionList, [ 'name' ]);
    for (const menu of menuList) {
      menu.functions = functionList.filter(s => {
        return s.moduleId == menu.id;
      });
    }
    return menuList;
  }
}
module.exports = menuService;
