<template>
  <a-card>
    <div>
      <ul class="circle" ref="circle">
        <li style="transform: rotate(0deg);"></li>
        <li style="transform: rotate(12deg);"></li>
        <li style="transform: rotate(24deg);"></li>
        <li style="transform: rotate(36deg);"></li>
        <li style="transform: rotate(48deg);"></li>
        <li style="transform: rotate(60deg);"></li>
        <li style="transform: rotate(72deg);"></li>
        <li style="transform: rotate(84deg);"></li>
        <li style="transform: rotate(96deg);"></li>
        <li style="transform: rotate(108deg);"></li>
        <li style="transform: rotate(120deg);"></li>
        <li style="transform: rotate(132deg);"></li>
        <li style="transform: rotate(144deg);"></li>
        <li style="transform: rotate(156deg);"></li>
        <li style="transform: rotate(168deg);"></li>
        <!-- <li style="transform: rotate(180deg);"></li>
        <li style="transform: rotate(-12deg);"></li>
        <li style="transform: rotate(-24deg);"></li>
        <li style="transform: rotate(-36deg);"></li>
        <li style="transform: rotate(-48deg);"></li>
        <li style="transform: rotate(-60deg);"></li>
        <li style="transform: rotate(-72deg);"></li>
        <li style="transform: rotate(-84deg);"></li>
        <li style="transform: rotate(-96deg);"></li>
        <li style="transform: rotate(-108deg);"></li>
        <li style="transform: rotate(-120deg);"></li>
        <li style="transform: rotate(-132deg);"></li>
        <li style="transform: rotate(-144deg);"></li>
        <li style="transform: rotate(-156deg);"></li>
        <li style="transform: rotate(-168deg);"></li> -->
      </ul>
    </div>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // this.$refs.circle.li.style('transform: rotate(`+ 180 / liSize * i + `deg)')
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.circle {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #000000;
  margin: 100px auto 0;
}
.circle li {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 88px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #f00;
  list-style: none;
  transform-origin: 100px 10px;
  background-color: #f00;
  // transform: rotate('+180/liSize*i+'deg)
}
</style>
