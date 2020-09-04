import {
  fromPairs,
  findIndex
} from 'lodash-es'

/**
 * @description 检查一个项目是否在指定的数组里
 * @param {Any} value 需要匹配的内容
 * @param {Array} source 被检查的数组
 */
export const oneOf = (value, source = []) => findIndex(source, item => item === value) !== -1

/**
 * @description 等待一段时间
 * @param {Number} time 等待时间
 */
export function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * @description 返回传入窗口所加载网页的 cookies
 * @param {BrowserWindow} win 窗口
 * @param {String} domain 需要过滤的域名
 */
export function getCookies (win, domain = '') {
  return win.webContents.session.cookies.get({ domain })
}

/**
 * @description 返回 iconfont 的 cookies
 * @param {BrowserWindow} win 窗口
 */
export async function getCookiesFromIconfont (win) {
  const cookies = await getCookies(win, '.iconfont.cn')
  return fromPairs(cookies.map(e => [e.name, e.value]))
}
