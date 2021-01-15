import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
const api = {
  // fingUserPage: '/system/user/findPage', // 获取用户列表
  // getUser: 'system/user/get', // 获取用户
  getCAPTCHAP: 'system/user/getCAPTCHAP', // 获取验证码
  login: 'system/user/login', // 登陆
  register: 'system/user/register' // 注册
  // removeUser: 'system/user/removeUser', // 删除用户
  // saveUser: 'system/user/saveUser' // 保存用户
}
export function login (parameter) {
  return axios({
    url: api.login,
    method: 'post',
    data: parameter
  })
}

export function getCAPTCHAP (parameter) {
  return axios({
    url: api.getCAPTCHAP,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.getCAPTCHAP,
    method: 'post',
    data: parameter
  })
}

export function register (parameter) {
  return axios({
    url: api.register,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/system/user/info',
    method: 'post'
  })
}
