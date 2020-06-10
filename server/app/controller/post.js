'use strict';
const Controller = require('egg').Controller;
const responseTemplate = require('../lib/responseTemplate');

class postController extends Controller {
  async getPostPagedList() {
    const { ctx, service } = this;
    const { pageIndex, pageSize, sortBy, descending } = ctx.query;
    const pageList = await service.postService.getPostPageList(pageIndex, pageSize, sortBy, descending);
    responseTemplate.success(ctx, pageList);
  }
  async getPost() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const post = await service.postService.getPost(id);
    if (!post) {
      return responseTemplate.businessError(ctx, post);
    }
    return responseTemplate.success(ctx, post);
  }
  async savePost() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    if (entity.title === '') {
      return responseTemplate.businessError(ctx, '标题不能为空!');
    }
    if (entity.shortContent === '') {
      return responseTemplate.businessError(ctx, '简述不能为空!');
    }
    if (entity.mdContent === '') {
      return responseTemplate.businessError(ctx, '内容不能为空!');
    }
    if (entity.catelog === '') {
      return responseTemplate.businessError(ctx, '分类不能为空!');
    }
    entity.updatedDate = (new Date()).getTime();
    if (entity.publishedDate) {
      entity.isTimePublish = 1;
    } else {
      entity.isTimePublish = 0;
    }
    entity.tags = entity.tags.join(',');
    entity.keyWord = entity.keyWord.join(',');
    const result = await service.postService.savePost(entity);
    if (!result.success) {
      return responseTemplate.businessError(ctx, result.msg);
    }
    return responseTemplate.success(ctx, null);
  }
  async getTopPost() {
    const { ctx, service } = this;
    const { catelog, status } = ctx.query;
    const query = {
      catelog: catelog || undefined,
      status: status && parseInt(status),
    };
    const post = await service.postService.getTopPost(query);
    return responseTemplate.success(ctx, post);
  }
}
module.exports = postController;
