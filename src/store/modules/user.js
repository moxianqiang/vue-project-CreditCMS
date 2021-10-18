// 这个页面时用来存放角色，还有请求获取角色的action
import Vue from 'vue'
import Vuex from 'vuex'
import {userInfo, logout} from '@/api/http'
Vue.use(Vuex)

const state = {
    roles:[]  //角色存放位置
}
const getters = {
    roles: state => state.roles
}
const mutations = {
    SETROLES:(state, d)=>{
        state.roles = d;
    }
}
const actions = {
    // （12）
    userinfo({commit}){
        return new Promise((resolve, reject)=>{
            // userInfo()来自api/http.js   第一次登录肯定需要通过账号密码给到后端，才能拿到返回的角色信息
            userInfo().then(res => {
                console.log('请求用户角色信息返回的值：', res);
                let {data} = res.data;
                commit('SETROLES', data.roles)  // 第一次登录拿到返回的角色信息，存储在vuex里
                resolve(data);  // 把data传回src/permission.js    （13）
            }).catch(error => {
                reject(error)
            })
        })
    },
    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SETROLES', [])  // 退出清空角色信息
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
