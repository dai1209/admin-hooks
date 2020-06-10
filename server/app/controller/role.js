'use strict';

const Controller = require('egg').Controller;
const responseTemplate = require('../lib/responseTemplate');

class roleController extends Controller {
  async getRolePagedList() {
    const { ctx, service } = this;
    const { pageIndex, pageSize, sortBy, descending } = ctx.query;
    const filter = JSON.parse(ctx.query.filter);
    const pageList = await service.roleService.getRolePagedList(pageIndex, pageSize, sortBy, descending, filter);
    responseTemplate.success(ctx, pageList);
  }
  async delRole() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    await service.roleService.delRole(id);
    responseTemplate.success(ctx, null);
  }
  async delRoles() {
    const { ctx, service } = this;
    const ids = JSON.parse(ctx.query.ids);
    await Promise.all(ids.map(id => service.roleService.delRole(id)));
    responseTemplate.success(ctx, null);
  }
  async saveRole() {
    const { ctx, service } = this;
    const func = ctx.request.body;
    if (func.name === '') {
      return responseTemplate.businessError(ctx, '名称不能为空!');
    }
    if (func.code === '') {
      return responseTemplate.businessError(ctx, '编码不能为空!');
    }
    const result = await service.roleService.saveRole(func);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
  async savePermission() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    let functionList = [];
    if (data.moduleId === 0) {
      functionList = await service.functionService.getFunctionList();
    }
    data.permissions = data.permissions.map(s => {
      if (data.moduleId === 0) {
        const f = functionList.filter(p => p.id === s);
        const permission = {};
        permission.id = s;
        permission.moduleId = f.length > 0 ? f[0].moduleId : 0;
        return permission;
      }
      s = JSON.parse(s);
      return s;
    });
    const menuWithChildren = await service.menuService.getMenuFunctions(data.moduleId);
    const menuIds = menuWithChildren.map(s => {
      return s.id;
    });
    await service.roleService.savePermission(menuIds, data.roleId, data.permissions);
    return responseTemplate.success(ctx, null);
  }
}

module.exports = roleController;

