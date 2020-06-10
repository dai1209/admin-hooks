'use strict';

const Service = require('egg').Service;

const model = require('../models/baseModel');

const context = 'token';

class tokenService extends Service {
  async add(token) {
    const db = await model.init(context);
    await db.push({ value: token }).write();
  }
  async exist(token) {
    const db = await model.init(context);
    const exist = db.find({ value: token }).value();
    if (exist) {
      return true;
    }
    return false;
  }
  async remove(token) {
    const db = await model.init(context);
    await db.remove({ value: token }).write();
  }
}

module.exports = tokenService;
