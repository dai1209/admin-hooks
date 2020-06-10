import React from 'react';
import { useSelector } from 'react-redux';

const Permission = ({permission, children}) => {
  const isAdmin = useSelector(({user}) => user.userInfo.isAdmin)
  const userPermission = useSelector(({user}) => user.userInfo.permission)
  if ( isAdmin === 1 ) return <>{children}</>
  return (<>
    {permission.every(p => userPermission.some(u => u === p)) ? children : null} 
  </>)
}

export default Permission;