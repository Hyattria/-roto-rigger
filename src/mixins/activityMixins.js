import { Activity } from '@roto/bridge'
export default {
  data () {
    return {
      activityData: undefined
    }
  },
  created () {
    Activity.init({ SummaryId: 94 }).execute().success(response => {
      this.activityData = response.data.target
      console.log(this.activityData)
    })
  },
  computed: {
    rule () {
      return this.activityData && this.activityData.roledetail.replace(/;|；/g, '；<br/>').replace(/\s/g, '')
    }
  }
}
