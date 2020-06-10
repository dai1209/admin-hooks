import Mock from 'mockjs'


Mock.mock('api/users',{
  "userInfo|1":[{
    "id|+1":1,
    "name":"@cname",
    "age|20-28":20,
    "sex|1":['男','女'],
    "job|1":['java','web','php']
  }]
})
Mock.mock('user/login','post',(options)=>{
  return {
    status:200,
    userInfo:{
      uid: 12345,
      username:"admin",
      token: '234567',
      auth:5
    }
  }
  
})