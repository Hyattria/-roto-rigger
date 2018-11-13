import sa from 'sa-sdk-javascript'

class SaEngine {
  constructor (engine, initParams) {
    this.engine = engine
    this.init(initParams)
  }
  init (params) {
    this.engine.init(params)

    const localToken = window.localStorage.getItem('TOCTOKEN')
    const token = localToken ? JSON.parse(localToken) : undefined
    const localCity = window.localStorage.getItem('TOCCITY')
    const city = localCity ? JSON.parse(localCity) : undefined
    token && this.login(token.CustomerGuid)
    this.setUserProfile({
      customerguid: token && token.CustomerGuid,
      phoneNumber: token && token.Phone,
      customercityid: city && city.CityId + '',
      deviceid: window.localStorage.getItem('TOCOPENID')
    })
    this.autoTrack()
  }
  changeUserInfo () {
    const localToken = window.localStorage.getItem('TOCTOKEN')
    const token = localToken ? JSON.parse(localToken) : undefined
    const localCity = window.localStorage.getItem('TOCCITY')
    const city = localCity ? JSON.parse(localCity) : undefined
    token && this.login(token.CustomerGuid)
    this.setUserProfile({
      customerguid: token && token.CustomerGuid,
      phoneNumber: token && token.Phone,
      customercityid: city && city.CityId + '',
      deviceid: window.localStorage.getItem('TOCOPENID')
    })
  }
  setUserProfile (params) {
    this.engine.setProfile({
      ...params
    })
  }
  login (id) {
    id && this.engine.login(id)
  }
  autoTrack () {
    this.engine.quick('autoTrack')
  }
  track (event, trackParams, callback, delay = 300) {
    if (callback && typeof callback === 'function') {
      try {
        this.engine.track(event, trackParams, callback)
      } catch (e) {}
      setTimeout(() => {
        callback()
      }, delay)
    } else {
      this.engine.track(event, trackParams)
    }
  }
  setCommonProperty (commonProperty) {
    this.engine.registerPage(commonProperty)
  }
}

class Tracker {
  constructor (engines = [], delay = 300) {
    this.delay = delay
    this.stash = {}
    this.engines = engines
  }
  setStash (params, isMerge) {
    if (isMerge) {
      this.stash = {...this.stash, ...params}
    } else {
      this.stash = {...params}
    }
  }
  getStash () {
    return this.stash
  }
  addEngine (engine) {
    this.engines.push(engine)
  }
  track (event, trackParams, callback) {
    if (callback) {
      this.engines.forEach(engine => engine.track(event, trackParams, callback, this.delay))
    } else {
      this.engines.forEach(engine => {
        engine.track(event, trackParams)
      })
    }
  }
  login (id) {
    this.engines.forEach(engine => engine.login(id))
  }
  setCommonProperty (commonProperty) {
    this.commonProperty = commonProperty
    this.engines.forEach(engine => engine.setCommonProperty(this.commonProperty))
  }
  setUserProfile (params) {
    this.engines.forEach(engine => engine.setUserProfile(params))
  }
  changeUserInfo () {
    this.engines.forEach(engine => engine.changeUserInfo())
  }
  test () {
    console.log('test')
  }
}

const saEngine = new SaEngine(sa, {
  server_url: process.env.NODE_ENV === 'production' ? 'https://sensorsadmin.34580.cn:8106/sa?project=production' : 'https://sensorsadmin.34580.cn:8106/sa?project=default',
  is_single_page: true
})
const tracker = new Tracker()
tracker.addEngine(saEngine)
export default tracker
