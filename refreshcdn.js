/**
 * 将本文件放置于项目跟目录下
 * 安装 cross-env ---- yarn add cross-env --dev
 * 在scripts中添加脚本 "refreshcdn": "cross-env DIST_NAME=\"center\" node refreshcdn.js"
 * 其中DIST_NAME 为build的目标文件夹名称
 */
const qiniu = require('qiniu')
const process = require('process')
const fs = require('fs')
const path = require('path')
const distName = process.env.DIST_NAME
const lodash = require('lodash')

const accessKey = 'hwjXRT1Hldy6AnFc4tX_8mVvyu_3FO3wE8omWrnG'
const secretKey = 'wMPk4glo4KYrWF3N9hsp4bBWfvMsPCeNd97lCB8x'
const prefix = `https://wechatx.34580.com/activitys/${distName}/`

const filePath = path.resolve(__dirname, `${distName}/static`)

let urlsToRefresh = []
function readdir (filePath) {
  const files = fs.readdirSync(filePath)
  files.forEach(filename => {
    const file = path.join(filePath, filename)
    const stats = fs.statSync(file)
    if (stats.isFile()) {
      urlsToRefresh.push(file.replace(new RegExp(`.+\\/${distName}\\/`), prefix))
    } else if (stats.isDirectory()) {
      readdir(file)
    }
  })
}
readdir(filePath)
console.log(urlsToRefresh)

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const cdnManager = new qiniu.cdn.CdnManager(mac)

lodash.chunk(urlsToRefresh, 90).forEach(chunkUrls => {
  cdnManager.refreshUrls(chunkUrls, function (err, respBody, respInfo) {
    if (err) {
      throw err
    }

    if (+respInfo.statusCode === 200) {
      const jsonBody = JSON.parse(respBody)
      console.log(jsonBody.code)
      jsonBody.invalidUrls && console.log(jsonBody.invalidUrls)
    }
  })
})
