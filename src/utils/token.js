export const CITY = {
  get () {
    const TOCCITY = localStorage.getItem('TOCCITY')
    return TOCCITY ? JSON.parse(TOCCITY) : ''
  },
  set (c) {
    localStorage.removeItem('TOCCITY')
    const TOCCITY = {
      CityFlag: c,
      CityId: c === 'sz' ? 1 : c === 'sh' ? 3 : c === 'wx' ? 5 : 0,
      CityName: c === 'sz' ? '苏州市' : c === 'sh' ? '上海' : c === 'wx' ? '无锡市' : '未知',
      Id: c === 'sz' ? 1 : c === 'sh' ? 2 : c === 'wx' ? 3 : 0,
      WebApiUrl: 'https://api1.34580.com/',
      ImageSiteUrl: 'http://picpro-sz.34580.com/'
    }
    localStorage.setItem('TOCCITY', JSON.stringify(TOCCITY))
  }
}

export const TOKEN = {
  get () {
    const TOCTOKEN = localStorage.getItem('TOCTOKEN')
    return TOCTOKEN ? JSON.parse(TOCTOKEN) : {}
  }
}

export const Q = {
  get (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var i = window.location.hash.indexOf('?')
    var r = window.location.hash.slice(i).substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null
  }
}
