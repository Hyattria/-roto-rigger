import { CITY, TOKEN } from '../utils/token'
import { Loading, Message } from '@roto/component-vact'

const IMAGE_PREFIX = process.env.NODE_ENV === 'production' ? `http://picpro-sz.34580.com/` : 'http://10.1.62.230/'

export default {
  data () {
    return {
      test: process.env.NODE_ENV !== 'production',
      city: CITY.get().CityFlag || undefined,
      token: TOKEN.get()
    }
  },
  methods: {
    getImageSrc (imageId, { size = 500, type = 'jpeg' } = {}) {
      return `${IMAGE_PREFIX}${this.city}/ImageUrl/${imageId}/${size}.${type}`
    },
    createMessage (type, message) {
      Message.create({type, message}).show()
    },
    createLoading () {
      this.loadingMask = Loading.create({color: '#FF705B', background: '#FF3F57'}).show()
    },
    destroyLoading () {
      this.loadingMask.destroy()
    }
  }
}
