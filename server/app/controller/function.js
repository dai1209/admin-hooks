'use strict';
const Controller = require('egg').Controller;
const responseTemplate = require('../lib/responseTemplate');


class functionController extends Controller {
  async getFunctionPagedList() {
    const { ctx, service } = this;
    const { pageIndex, pageSize, sortBy, descending } = ctx.query;
    const filter = JSON.parse(ctx.query.filter);
    const pagedList = await service.functionService.getFunctionPagedList(pageIndex, pageSize, sortBy, descending, filter);
    responseTemplate.success(ctx, pagedList);
  }
  async delFunction() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    await service.functionService.delFuntion(id);
    responseTemplate.success(ctx, null);
  }
  async delFunctions() {
    const { ctx, service } = this;
    const ids = JSON.parse(ctx.query.ids);
    await Promise.all(ids.map(id => service.functionService.delFuntion(id)));
    responseTemplate.success(ctx, null);
  }
  async saveFunction() {
    const { ctx, service } = this;
    const func = ctx.request.body;
    if (func.name === '') {
      return responseTemplate.businessError(ctx, '名称不能为空!');
    }
    if (func.code === '') {
      return responseTemplate.businessError(ctx, '编码不能为空!');
    }
    if (!func.moduleId) {
      return responseTemplate.businessError(ctx, '请选择模块!');
    }
    const result = await service.functionService.saveFunction(func);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
}
module.exports = functionController;

