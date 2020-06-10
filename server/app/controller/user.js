'use strict';

const Controller = require('egg').Controller;
const responseTemplate = require('../lib/responseTemplate');

class userController extends Controller {
  async getUserInfo() {
    const { ctx, service } = this;
    const { user } = ctx
    if (!(user && user.userId)) {
      return responseTemplate.businessError(ctx, '获取用户信息失败！');
    }
    const { userId } = user;
    const [ userInfo, userRole, permissions, isadmin ] = await Promise.all([
      service.userService.getUserById(userId),
      service.userService.getUserRole(userId),
      service.userService.getUserPermission(userId),
      service.userService.isAdmin(userId),
    ]);
    if (!userInfo) {
      return responseTemplate.businessError(ctx, '获取用户信息失败！');
    }
    return responseTemplate.success(ctx, {
      username: userInfo.name,
      userRole,
      userPermission: permissions,
      isAdmin: isadmin ? 1 : 0,
      avatarUrl: 'https://api.adorable.io/avatars/85/abott@adorable.png',
    });
  }
  async getUserPagedList() {
    const { ctx, service } = this;
    const { pageIndex, pageSize, sortBy, descending } = ctx.query;
    const filter = JSON.parse(ctx.query.filter);
    const pageList = await service.userService.getUserPagedList(pageIndex, pageSize, sortBy, descending, filter);
    return responseTemplate.success(ctx, pageList);
  }
  async delUser() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const result = await service.userService.delUser(id);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
  async delUsers() {
    const { ctx, service } = this;
    const ids = JSON.parse(ctx.query.ids);
    await Promise.all(ids.map(id => service.userService.delUser(id)));
    return responseTemplate.success(ctx, null);
  }
  async saveUser() {
    const { ctx, service } = this;
    const func = ctx.request.body;
    if (func.name === '') {
      return responseTemplate.businessError(ctx, '账号不能为空！');
    }
    const result = await service.userService.saveUser(func);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
  async editRoleUser() {
    const { ctx, service } = this;
    const roleUser = ctx.request.body;
    await service.userService.editRoleUser(roleUser);
    return responseTemplate.success(ctx, null);
  }
}

module.exports = userController;
