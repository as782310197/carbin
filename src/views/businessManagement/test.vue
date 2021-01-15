<template>
  <a-card>
    <a-steps :current="stepsCurrent" @change="onStepsChange" size="small">
      <a-step title="基本信息" />
      <a-step title="地址信息" />
      <a-step title="业务信息" />
    </a-steps>
    <div>
      <div v-if="stepsCurrent === 0">
        基本信息
        <a-button type="primary" @click="toSteps2">下一步</a-button>
      </div>
      <div v-if="stepsCurrent === 1">
        地址信息
        <a-button type="primary" @click="toSteps1">上一步</a-button>
        <a-button type="primary" @click="toSteps3">下一步</a-button>
      </div>
      <div v-if="stepsCurrent === 2">
        业务信息
        <a-button type="primary" @click="toSteps2">上一步</a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      stepsCurrent: 0
    }
  },
  methods: {
    onStepsChange (current) {
      this.stepsCurrent = current
    },
    toSteps1 () {
      this.stepsCurrent = 0
    },
    toSteps2 () {
      this.stepsCurrent = 1
    },
    toSteps3 () {
      this.stepsCurrent = 2
    }
  }
}
</script>

<style>

</style>
