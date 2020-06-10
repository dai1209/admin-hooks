import { lazy } from 'react';
import suspenseComponent from 'utils/suspenseComponent';

const Menu = suspenseComponent(lazy(() => import('pages/Menu')));
const Function = suspenseComponent(lazy(() => import('pages/Function')))
const Role = suspenseComponent(lazy(() => import('pages/role')))
const Home = suspenseComponent(lazy(() => import('pages/Home')))
const RolePermission = suspenseComponent(lazy(() => import('pages/rolePermission')))
const RoleUser = suspenseComponent(lazy(() => import('pages/roleUser')))
const UserRole = suspenseComponent(lazy(() => import('pages/userRole')))
const User = suspenseComponent(lazy(() => import('pages/user')))
const Page404 = suspenseComponent(lazy(() => import('pages/Page404')))
const Page403 = suspenseComponent(lazy(() => import('pages/Page403')))
const RequestLog = suspenseComponent(lazy(() => import('pages/RequestLog')))
// example
const PermissionTest = suspenseComponent(lazy(() => import('pages/example/PermissionTest')))
const SearchForm = suspenseComponent(lazy(() => import('pages/example/JsonForm/SearchForm')))
const CommonForm = suspenseComponent(lazy(() => import('pages/example/JsonForm/CommonForm')))
const DynamicForm = suspenseComponent(lazy(() => import('pages/example/JsonForm/DynamicForm')))
//key为与后端返回菜单的name相对应
export default {
  "menu": Menu,
  "home": Home,
  "function": Function,
  "role": Role,
  "rolepermission": RolePermission,
  "roleuser": RoleUser,
  "userrole": UserRole,
  "user_index": User,
  "page404": Page404,
  "page403": Page403,
  "requestlog":RequestLog,
  // example
  "error_404": Page404,
  "error_403": Page403,
  'permission_test': PermissionTest,
  "search_form": SearchForm,
  "common_form": CommonForm,
  "dynamic_form": DynamicForm
}