<template>
  <a-card>
    <div>
      <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
    </div>
  </a-card>
</template>

<script>
import EditorBar from '../../components/wangEnduit'

export default {
  components: {
    EditorBar
  },
  data () {
    return {
      isClear: false,
      detail: ''
    }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
