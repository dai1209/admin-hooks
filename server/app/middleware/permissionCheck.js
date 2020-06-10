'use strict';

const responseTemplate = require('../lib/responseTemplate');

module.exports = ({ permission = [], role = [] }) => {
  return async (ctx, next) => {
    const { service } = ctx;
    if (!ctx.user || !ctx.user.userId) {
      return responseTemplate.businessError(ctx, '没有访问权限');
    }
    if (permission.length === 0 && role.length === 0) {
      return next();
    }
    const isAdmin = await service.userService.isAdmin(ctx.user.userId);
    if (isAdmin) {
      return next();
    }
    const roles = await service.userService.getUserRole(ctx.user.userId);
    const r = roles.filter(s => {
      return role.indexOf(s) > -1;
    });
    if (r && r.length > 0) {
      return next();
    }
    const userPermisssions = await service.userService.getUserPermission(ctx.user.userId);
    const p = userPermisssions.filter(s => {
      return permission.indexOf(s) > -1;
    });
    if (p && p.length > 0) {
      return next();
    }
    return responseTemplate.businessError(ctx, '没有访问权限');
  };
};
