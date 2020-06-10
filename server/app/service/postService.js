'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const model = require('../models/baseModel');
const context = 'post';

class postService extends Service {
  async getPostPagedList(pageIndex, pageSize, sortBy, descending) {
    const db = await model.init(context);
    const list = db.value();
    let resultList = JSON.parse(JSON.stringify(list));
    const totalCount = resultList.length;
    if (sortBy) {
      resultList = _.sortBy(resultList, [ sortBy ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    } else {
      resultList = _.sortBy(resultList, [ 'updatedDate' ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    }
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    resultList = _.slice(resultList, start, end);

    resultList = resultList.map(s => {
      s.tags = s.tags.split(',');
      s.mdContent = '';
      s.htmlContent = '';

      return s;
    });

    return {
      totalCount,
      rows: resultList,
    };

  }
  async getPost(id) {
    const db = await model.init(context);
    const post = db.find({ id }).value();
    return post;
  }
  async savePost(entity) {
    const db = await model.init(context);
    const exist = db.find({ title: entity.title }).value();
    if (exist && exist.id !== entity.id) {
      return {
        success: false,
        msg: '标题已经存在',
      };
    }
    if (entity.id) {
      delete entity.createdDate;
      await db.find({ id: entity.id })
        .assign(entity)
        .write();
    } else {
      entity.createdDate = (new Date()).getTime();
      await db.insert(entity).write();
    }
    return {
      success: true,
      msg: '',
    };
  }
  async getTopPost(query) {
    const db = await model.init(context);
    const post = db.filter(query)
      .sortBy('sort')
      .take(1)
      .value();
    if (post.length > 0) {
      return post[0];
    }
    return null;
  }
}
module.exports = postService;
