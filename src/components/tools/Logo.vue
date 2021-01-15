<template>
  <div class="logo">
    <router-link :to="{name:'platformOverview'}">
      <JianKong alt="logo" />
      <h1 v-if="showTitle" style="font-size: 16px;">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import JianKong from '@/assets/jiankong.svg?inline'

export default {
  name: 'Logo',
  components: {
    JianKong
  },
  props: {
    title: {
      type: String,
      default: '网税宝管理后台',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
