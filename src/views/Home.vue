<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ac-button>wangzhe</ac-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Button } from '@roto/component-vact'
import HelloWorld from '@/components/HelloWorld.vue'
import { Button, Confirm } from '@roto/component-vact'
import methodsMixins from '../mixins/mehodsMixins.js'
export default {
  name: 'home',
  components: {
    HelloWorld,
    AcButton: Button
  },
  mixins: [methodsMixins],
  created () {
    // this.createLoading()
    Confirm.create().show()
  }
}
</script>
