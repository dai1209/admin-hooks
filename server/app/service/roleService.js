'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const model = require('../models/baseModel');
const context = 'role';
const permissionContext = 'permission';
const roleUserContext = 'roleUser';
class roleService extends Service {
  async getRolePagedList(pageIndex, pageSize, sortBy, descending, filter) {
    const db = await model.init(context);
    const roleList = db.value();
    let resultList = roleList;
    if (filter.code) {
      resultList = _.filter(resultList, o => {
        return o.code.indexOf(filter.code) > -1;
      });
    }
    if (filter.name) {
      resultList = _.filter(resultList, o => {
        return o.name.indexOf(filter.name) > -1;
      });
    }
    if (filter.userId) {
      const roleUserDb = await model.init(roleUserContext);
      let roleUserList = roleUserDb.filter({ userId: filter.userId }).value();
      roleUserList = roleUserList.map(s => {
        return s.roleId;
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
  async delRole(id) {
    const db = await model.init(context);
    await db.remove({ id }).write();
  }
  async saveRole(role) {
    const db = await model.init(context);
    const exist = db.find({ code: role.code }).value();
    if (exist && exist.id !== role.id) {
      return {
        success: false,
        msg: '角色编码已经存在',
      };
    }
    const exist1 = db.find({ name: role.name }).value();
    if (exist1 && exist1.id !== role.id) {
      return {
        success: false,
        msg: '角色名称已经存在',
      };
    }
    if (role.id) {

      await db.find({ id: role.id })
        .assign(role)
        .write();
    } else {
      await db.insert(role).write();
    }
    return {
      success: true,
      msg: '',
    };
  }
  async getRoleFunctions(roleId) {
    const db = await model.init(permissionContext);
    const list = db.value();
    const roleFunctions = list.filter(s => {
      return s.roleId === roleId;
    });
    return roleFunctions;
  }
  async getRoleFuntionsByRoleIds(roleIds) {
    const db = await model.init(permissionContext);
    const list = db.value();
    const roleFunctions = list.filter(s => {
      return roleIds.indexOf(s.roleId) > -1;
    });
    return roleFunctions;
  }
  async savePermission(menuIds, roleId, permissions) {
    const db = await model.init(permissionContext);
    for (const menuId of menuIds) {
      await db.remove({ moduleId: menuId, roleId }).write();
    }
    for (const permission of permissions) {
      await db.insert({
        roleId,
        functionId: permission.id,
        moduleId: permission.moduleId,
      }).write();
    }
  }
  async getRoleListByIdList(idList) {
    const db = await model.init(context);
    const roleList = db.value();
    const result = roleList.filter(s => {
      return idList.indexOf(s.id) > -1;
    });
    return result;
  }
}
module.exports = roleService;
