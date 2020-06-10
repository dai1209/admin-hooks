'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const responseTemplate = require('../lib/responseTemplate');
const path = require('path');

class systemController extends Controller {
  async resetDb() {
    const { ctx, service } = this;
    try {
      await fs.copyFileSync(path.join(__dirname, '../db/db_backup.json'), path.join(__dirname, '../db/db.json'));
      await service.systemService.resetDb();
      return responseTemplate.success(ctx, '初始化成功');
    } catch (e) {
      return responseTemplate.businessError(ctx, '初始化失败');
    }
  }
}
module.exports = systemController;
