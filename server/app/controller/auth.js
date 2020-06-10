'use strict';

const Controller = require('egg').Controller;

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const responseTemplate = require('../lib/responseTemplate');

const publicKey = fs.readFileSync(path.join(__dirname, '../public/publicKey.pub'));

class Auth extends Controller {
  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      responseTemplate.businessError(ctx, '请输入账号密码!');
    }
    const user = await service.userService.getUserByNameAndPwd(username, password);
    if (!user) {
      responseTemplate.businessError(ctx, '账号或密码错误');
    }
    const token = jwt.sign({
      userId: user.id,
    }, publicKey, { expiresIn: '7d' });
    console.log(token);
    return responseTemplate.success(ctx, {
      accessToken: token,
    });
  }
  async logout() {
    const { ctx, service } = this;
    const user = ctx.user;
    if (!user || !user.token) {
      responseTemplate.success(ctx, null);
    }
    await service.tokenService.remove(user.token);
    responseTemplate.success(ctx, null);
  }
}

module.exports = Auth;
