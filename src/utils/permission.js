export default {
  check(config) {
    if (config.permission && config.permission.length > 0) {
      const needPermissions = config.permission;
      const permissions = JSON.parse(localStorage.getItem('permission'));
      const isAdmin = localStorage.getItem('isAdmin');
      const hasPermission = permissions.some(s => {
        return needPermissions.indexOf(s) > -1;
      })
      if (!hasPermission && isAdmin === 0) {
        return false
      }
    }
    return true
  }
}