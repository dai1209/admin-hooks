'use strict';
const Service = require('egg').Service;

const _ = require('lodash');

const model = require('../models/baseModel');
const context = 'function';

class functionService extends Service {
  async getFunctionPagedList(pageIndex, pageSize, sortBy, descending, filter) {
    const db = await model.init(context);
    const functionList = db.value();
    let resultList = functionList;
    if (filter.module) {
      resultList = _.filter(resultList, o => {
        return o.module.indexOf(filter.module) > -1;
      });
    }
    if (filter.name) {
      resultList = _.filter(resultList, o => o.name.indexOf(filter.name) > -1);
    }
    if (filter.code) {
      resultList = _.filter(resultList, o => o.code.indexOf(filter.code) > -1);
    }
    const totalCount = resultList.length;
    if (sortBy) {
      resultList = _.sortBy(resultList, [ sortBy ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    } else {
      resultList = _.sortBy(resultList, [ 'module', 'name' ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    }
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    resultList = _.slice(resultList, start, end);

    return {
      totalCount,
      rows: resultList,
    };

  }
  async getFunctionList() {
    const db = await model.init(context);
    return db.value();
  }
  async getFunctionListByIds(ids) {
    const db = await model.init(context);
    const list = db.value();
    const functions = list.filter(s => {
      return ids.indexOf(s.id) > -1;
    });
    return functions;
  }
  async delFuntion(id) {
    const db = await model.init(context);
    await db.remove({ id }).write();
  }
  async saveFunction(func) {
    const db = await model.init(context);
    const exist = db.find({ code: func.code }).value();
    if (exist && exist.id !== func.id) {
      return {
        success: false,
        msg: '功能编码已经存在',
      };
    }
    const exist1 = db.find({ moduleId: func.moduleId, name: func.name }).value();
    if (exist1 && exist1.id !== func.id) {
      return {
        success: false,
        msg: '当前模块功能名称已经存在',
      };
    }
    if (func.id) {
      await db.find({ id: func.id })
        .assign(func)
        .write();
    } else {
      await db.insert(func).write();
    }
    return {
      success: true,
      msg: '',
    };
  }
}

module.exports = functionService;
