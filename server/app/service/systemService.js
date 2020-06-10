'use strict';

const Service = require('egg').Service;
const model = require('../models/baseModel');
class systemService extends Service {
  async resetDb() {
    await model.read();
  }
}

module.exports = systemService;
