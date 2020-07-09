import { remote } from 'electron'

const Iconfont = remote.getGlobal('Iconfont')

// const wait = time => new Promise(resolve => {
//   setTimeout(() => {
//     resolve()
//   }, time)
// })

export default {
  namespaced: true,
  state: {
    sdk: new Iconfont(),
    ready: false,
    loading: false,
    dict: Iconfont.dict
  },
  actions: {
    /**
     * @description 初始化
     * @param {Object} context
     */
    async init ({ state }, cookies) {
      state.loading = true
      await state.sdk.init(cookies)
      state.ready = true
      state.loading = false
    },
    search ({ state }, payload) {
      return state.sdk.search(payload)
    },
    pubinfo ({ state }) {
      return state.sdk.pubinfo()
    }
  }
}
