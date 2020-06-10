'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { permissionCheck } = middleware;
  router.get('/public/get', ctx => {
    ctx.body = '禁止访问！';
  }) // 以/public开头则不用经过权限认证
    .post('/auth/login', controller.auth.login)
    .post('/auth/logout', controller.auth.logout)
    .get('/menu', permissionCheck({ permission: [ 'menu_view' ] }), controller.menu.getMenuList)
    .get('/menu/getaccessmenu', controller.menu.getAccessMenuList)
    .get('/menu/menufunctions', controller.menu.getMenuFunctions)
    .post('/menu/savemenu', permissionCheck({ permission: [ 'menu_edit' ] }), controller.menu.saveMenu)
    .get('/function/pagedlist', permissionCheck({ permission: [ 'function_view' ], role: [ 'test' ] }), controller.function.getFunctionPagedList)
    .del('/function/del', permissionCheck({ permission: [ 'function_del' ] }), controller.function.delFunction)
    .del('/function/batchdel', permissionCheck({ permission: [ 'function_del' ] }), controller.function.delFunctions)
    .post('/function/save', permissionCheck({ permission: [ 'function_edit' ] }), controller.function.saveFunction)

    .get('/role/pagedlist', permissionCheck({ permission: [ 'role_view', 'role_permission_view', 'role_user_view' ] }), controller.role.getRolePagedList)
    .del('/role/del', permissionCheck({ permission: [ 'role_del' ] }), controller.role.delRole)
    .del('/role/batchdel', permissionCheck({ permission: [ 'role_del' ] }), controller.role.delRoles)
    .post('/role/save', permissionCheck({ permission: [ 'role_edit' ] }), controller.role.saveRole)
    .post('/role/savepermission', permissionCheck({ permission: [ 'role_permission_edit' ] }), controller.role.savePermission)

    .get('/user/pagedlist', permissionCheck({ permission: [ 'user_view', 'user_role_view' ] }), controller.user.getUserPagedList)
    .get('/user/info', controller.user.getUserInfo)
    .del('/user/del', permissionCheck({ permission: [ 'user_del' ] }), controller.user.delUser)
    .del('/user/batchdel', permissionCheck({ permission: [ 'user_del' ] }), controller.user.delUsers)
    .post('/user/save', permissionCheck({ permission: [ 'user_edit' ] }), controller.user.saveUser)
    .post('/user/editroleuser', permissionCheck({ permission: [ 'role_user_edit', 'user_role_edit' ] }), controller.user.editRoleUser)

    .get('/requestlog/pagedlist', controller.requestlog.getRequestLogPagedList)

    .get('/post/pagedlist', permissionCheck({ permission: [ 'post_view' ] }), controller.post.getPostPagedList)
    .get('/post/top', controller.post.getTopPost)
    .get('/post/:id', controller.post.getPost)
    .post('/post/save', permissionCheck({ permission: [ 'post_edit' ] }), controller.post.savePost)

    .post('/resetdb', controller.system.resetDb)


    .all('/upload', controller.upload.uploads)
    .get('/api/:name', controller.api.Get)
    .post('/api/:name', controller.api.Post)
    .put('/api/:name', controller.api.Put)
    .del('/api/:name', controller.api.Delect);
};
