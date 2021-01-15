import { axios } from '@/utils/request'

const api = {
  projectList: '/project/bizProject/findList',
  projectPage: '/project/bizProject/findPage',
  saveProject: '/project/bizProject/save',
  projectInfo: '/project/bizProject/get',
  removeProject: '/project/bizProject/remove'
}

export default api

export function getProjectList (parameter) {
  return axios({
    url: api.projectList,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getProjectPage (parameter) {
  return axios({
    url: api.projectPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveProject (parameter) {
  return axios({
    url: api.saveProject,
    method: 'post',
    data: parameter
  })
}

export function getProjectInfo (parameter) {
  return axios({
    url: api.projectInfo,
    method: 'post',
    data: parameter
  })
}

export function removeProject (parameter) {
  return axios({
    url: api.removeProject,
    method: 'post',
    data: parameter
  })
}
