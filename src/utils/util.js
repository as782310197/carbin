export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

// 基础路径 上传图片基础路径
// 内网 http://192.168.50.251:8088
// 公网 http://111.229.170.129:8088
// 新 http://47.115.183.171:8088
// 阿里云 开发环境 http://39.108.154.9:8088
export function baseUrl () {
  // return 'http://111.229.170.129:8088'
    return 'http://47.115.183.171:8088'
//  return 'http://localhost:8088'
}

// 内网 http://192.168.50.251:15674
// 公网 http://39.108.154.9:15674
// mqtt服务地址

export function mqtt () {
  return 'ws://39.108.154.9:15674/ws'
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

// 格式化时间
export function formatTime (dateStr) {
  var date = new Date(dateStr)
  var Month = date.getMonth() + 1
  var Day = date.getDate()
  var Y = date.getFullYear() + '-'
  var M = Month < 10 ? '0' + Month + '-' : Month + '-'
  var D = Day + 1 < 10 ? '0' + Day : Day
  return Y + M + D
}
