'use strict';
const Controller = require('egg').Controller;

const responseTemplate = require('../lib/responseTemplate');

class menuController extends Controller {
  async getMenuList() {
    const { ctx, service } = this;
    const menuList = await service.menuService.getMenuList();
    responseTemplate.success(ctx, menuList);
  }
  async getAccessMenuList() {
    const { ctx, service } = this;
    const menuList = await service.menuService.getAccessMenuList(ctx.user.userId);
    return responseTemplate.success(ctx, menuList);
  }
  async saveMenu() {
    const { ctx, service } = this;
    const menu = ctx.request.body;
    if (menu.name === '') {
      return responseTemplate.businessError(ctx, '名称不能为空!');
    }
    if (menu.title === '') {
      return responseTemplate.businessError(ctx, '标题不能为空!');
    }
    if (menu.icon === '') {
      return responseTemplate.businessError(ctx, '请选择图标!');
    }
    const result = await service.menuService.saveMenu(menu);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
  async getMenuFunctions() {
    const { ctx, service } = this;
    const { menuId, roleId } = ctx.query;
    const [ menuFunctions, roleFunctions ] = await Promise.all([
      service.menuService.getMenuFunctions(menuId),
      service.roleService.getRoleFunctions(roleId),
    ]);
    responseTemplate.success(ctx, {
      menuFunctions,
      roleFunctions,
    });

  }
}
module.exports = menuController;
