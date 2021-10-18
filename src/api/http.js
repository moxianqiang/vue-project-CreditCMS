import request from '@/utils/request'  

export function login(data){   //登录
  return request ({
    method:'post',
    url:`user/login`,
    data
  })
}

export function userInfo(){   //用户详情
  return request ({
    method:'get',
    url:`user/info`,
  })
}

export function logout(){   //退出
  return request ({
    method:'post',
    url:`user/logout`
  })
}

export function loanCreate(data){   //贷款申请  提交
  return request ({
    method:'post',
    url:`loan/create`,
    data
  })
}

export function loanList(data){   //申请管理-查询
  return request ({
    method:'get',
    url:`loan/list`,
    params:data
  })
}

//申请管理 -提交
export function submitToApprove(data){
  return request({
    method:'post',
    url:'loan/submitToApprove',
    data
  })
}

//申请管理 -删除
export function loanDelete(data){
  return request({
    method:'delete',
    url:'loan/delete/'+data.id,
  })
}

//申请管理 -编辑
export function loanUpdate(data){
  return request({
    method:'put',
    url:'loan/update',
    data
  })
}

//初审
export function approveFirstList(data) {  //贷款审批-初审-列表数据
  return request({
    url: 'approve/first/list',
    method: 'get',
    params: data
  })
}
///loan/query/:id   通过ID查询列表详情
export function loanQuery(data) {  //贷款审批-初审-列表详情
  return request({
    url: 'loan/query',
    method: 'get',
    params: data
  })
}
export function approveFirstPass(data) {  //贷款审批-初审-通过
  return request({
    url: 'approve/first/pass',
    method: 'post',
    data
  })
}
export function approveFirstReject(data) {  //贷款审批-初审-拒绝
  return request({
    url: 'approve/first/reject',
    method: 'post',
    data
  })
}

//终审
export function approveEndList(data) {  //贷款审批-初审-列表数据
  return request({
    url: 'approve/end/list',
    method: 'get',
    params: data
  })
}
export function approveEndPass(data) {  //贷款审批-初审-通过
  return request({
    url: 'approve/end/pass',
    method: 'post',
    data
  })
}
export function approveEndReject(data) {  //贷款审批-初审-拒绝
  return request({
    url: 'approve/end/reject',
    method: 'post',
    data
  })
}

//标的管理-获取数据
export function contractList(data){
  return request({
    method:'get',
    url:'contract/list',
    params:data
  })
}
//标的管理-生成合同
export function contractCreateFile(data){
  return request({
    method:'post',
    url:'contract/createFile',
    data
  })
}
//标的管理-下载合同
export function contractDownload(data){
  return request({
    method:'get',
    url:'contract/download',
    params:data
  })
}

//创建管理员
export function permissionCreateUser(data) {  //权限管理-创建管理员
  return request({
    url: 'permission/createUser',
    method: 'post',
    data
  })
}

export function permissionUserlist(data) {  //权限管理-列表展示
  return request({
    url: 'user/list',
    method: 'get',
    params: data
  })
}