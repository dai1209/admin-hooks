'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const model = require('../models/requestLogModel');


const context = 'requestLog';

class requestLogService extends Service {
  async addLog(log) {
    const db = await model.init(context);
    await db.insert(log).write();
  }
  async getRequestLogPagedList(pageIndex, pageSize, sortBy, descending) {
    const { service } = this;
    const db = await model.init(context);
    const list = db.value();
    let resultList = list;
    const totalCount = resultList.length;
    if (sortBy) {
      resultList = _.sortBy(resultList, [ sortBy ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    } else {
      resultList = _.sortBy(resultList, [ 'createdDate' ]);
      if (descending === 'true') {
        resultList = resultList.reverse();
      }
    }
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    resultList = _.slice(resultList, start, end);
    const userList = await service.userService.getUserList();
    for (const item of resultList) {
      const user = userList.filter(s => {
        return s.id === item.createdBy;
      });
      if (user.length > 0) {
        item.createdByName = user[0].name;
      } else {
        item.createdByName = item.createdBy;
      }
    }
    return {
      totalCount,
      rows: resultList,
    };

  }
}
module.exports = requestLogService;
