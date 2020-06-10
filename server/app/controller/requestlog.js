'use strict';

const Controller = require('egg').Controller;
const responseTemplate = require('../lib/responseTemplate');

class requestLogController extends Controller {
  async getRequestLogPagedList() {
    const { ctx, service } = this;
    const { pageIndex, pageSize, sortBy, descending } = ctx.query;
    const pageList = await service.requestLogService.getRequestLogPagedList(pageIndex, pageSize, sortBy, descending);
    responseTemplate.success(ctx, pageList);
  }
}
module.exports = requestLogController;
