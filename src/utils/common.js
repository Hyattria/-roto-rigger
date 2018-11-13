export function getUserAgent () {
  const isPad = navigator.userAgent.toLowerCase().match(/iPad/i) === 'ipad'
  const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isAnd = /android/i.test(navigator.userAgent) || /shihang/i.test(navigator.userAgent)
  const isWx = /micromessenger/.test(navigator.userAgent.toLowerCase())
  const isMiniProgram = /miniProgram/i.test(navigator.userAgent)
  return isWx ? 1500 : isMiniProgram ? 1510 : isPad ? 1400 : isIos ? 1200 : isAnd ? 1300 : 1600
}
