import { Share } from '@roto/bridge'
import { TOKEN, CITY } from '../../utils/token'
export default {
  data () {
    return {
      shareData: {
        type: '分享活动首页',
        title: '食行生鲜新人礼 | 国产精选蓝莓1盒只要1元！',
        link: `${window.location.href}`,
        desc: '我在用食行生鲜买菜，很赞哦，推荐你也来使用~',
        imgUrl: 'http://static.34580.cn/cn/min/activity/newcustomer/share.png',
        appImage: 'http://static.34580.cn/cn/min/activity/newcustomer/share.png', // 大图
        shareCode: 2
      },
      userData: {
        token: TOKEN.get(),
        city: CITY.get()
      }
    }
  },
  created () {
    Share.init(this.shareData, this.shareCallBack).execute(this.userData.token.from || 'app')
  }
}
