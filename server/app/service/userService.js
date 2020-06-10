'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const publicKey = fs.readFileSync(path.join(__dirname, '../public/publicKey.pub'));
const _ = require('lodash');
const model = require('../models/baseModel');
const context = 'user';
const adminContext = 'admin';
const roleUserContext = 'roleUser';
class userService extends Service {
  async getUserByNameAndPwd(name, password) {
    const db = await model.init(context);
    const user = db.find({ name, password }).value();
    return user;
  }
  async getUserById(id) {
    const db = await model.init(context);
    const user = db.find({ id }).value();
    return user;
  }
  async getUserList() {
    const db = await model.init(context);
    const list = db.value();
    return list;
  }
  async getUserPagedList(pageIndex, pageSize, sortBy, descending, filter) {
    const db = await model.init(context);
    const roleList = db.value();
    let resultList = JSON.parse(JSON.stringify(roleList));
    if (filter.name) {
      resultList = _.filter(resultList, o => {
        return o.name.indexOf(filter.name) > -1 || o.trueName.indexOf(filter.name) > -1;
      });
    }
    if (filter.email) {
      resultList = _.filter(resultList, o => {
        return o.email.indexOf(filter.email) > -1;
      });
    }
    if (filter.roleId) {
      const roleUserDb = await model.init(roleUserContext);
      let roleUserList = roleUserDb.filter({ roleId: filter.roleId }).value();
      roleUserList = roleUserList.map(s => {
        return s.userId;
      });
      resultList = _.map(resultList, item => {
        if (roleUserList.indexOf(item.id) > -1) {
          item.isAdd = 1;
        } else {
          item.isAdd = 2;
        }
        return item;
      });
      sortBy = 'isAdd';
    }
    const totalCount = resultList.length;
    if (sortBy) {
      resultList = _.sortBy(resultList, [ sortBy ]);
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
  async delUser(id) {
    const db = await model.init(context);
    const adminDb = await model.init(adminContext);
    const admin = adminDb.value();
    if (admin.indexOf(id) > -1) {
      return {
        success: false,
        msg: '不能删除管理员账号',
      };
    }
    await db.remove({ id }).write();
    return {
      success: true,
      msg: '',
    };
  }
  async saveUser(user) {
    const db = await model.init(context);
    const exist = db.find({ name: user.name }).value();
    if (exist && exist.id !== user.id) {
      return {
        success: false,
        msg: '账号名称已经存在',
      };
    }
    const exist1 = db.find({ email: user.email }).value();
    if (exist1 && exist1.id !== user.id) {
      return {
        success: false,
        msg: '用户邮箱已经存在',
      };
    }
    if (user.id) {
      await db.find({ id: user.id })
        .assign(user)
        .write();
    } else {
      user.password = '123456';
      await db.insert(user).write();
    }
    return {
      success: true,
      msg: '',
    };
  }

  async editRoleUser(roleUser) {
    const roleUserDb = await model.init(roleUserContext);
    if (roleUser.action === 1) {
      await roleUserDb.push({ userId: roleUser.userId, roleId: roleUser.roleId }).write();
    } else {
      await roleUserDb.remove({ userId: roleUser.userId, roleId: roleUser.roleId }).write();
    }
  }
  async getUserRole(userId) {
    const { service } = this;
    const roleUserDb = await model.init(roleUserContext);
    const roleUserList = roleUserDb.filter(item => item.userId === userId).value();
    const roleIdList = roleUserList.map(s => s.roleId);
    const roleList = await service.roleService.getRoleListByIdList(roleIdList);
    const roleCodeList = roleList.map(s => s.code);
    return roleCodeList;
  }
  async getUserPermission(userId) {
    const { service } = this;
    const roleUserDb = await model.init(roleUserContext);
    const roleUserList = roleUserDb.filter({ userId }).value();
    const roleIdList = roleUserList.map(s => {
      return s.roleId;
    });
    const roleFunctions = await service.roleService.getRoleFuntionsByRoleIds(roleIdList);
    const functionIds = roleFunctions.map(s => {
      return s.functionId;
    });
    const functionList = await service.functionService.getFunctionListByIds(functionIds);
    const functionCodeList = functionList.map(s => {
      return s.code;
    });
    return functionCodeList;
  }
  async isAdmin(userId) {
    const adminDb = await model.init(adminContext);
    const admin = adminDb.value();
    if (admin.indexOf(userId) > -1) {
      return true;
    }
    return false;
  }
}


module.exports = userService;
