<template>
  <a-card>
    <detail-list title="基本信息" :bordered="true">
      <detail-list-item term="工控机IP">177.122.199</detail-list-item>
      <detail-list-item term="工控机编号">BY123456</detail-list-item>
      <detail-list-item term="负责人">王一</detail-list-item>
      <detail-list-item term="状态">启用</detail-list-item>
      <detail-list-item term="备注">
        这是备注信息。
      </detail-list-item>
    </detail-list>
  </a-card>
</template>

<script>
  import DetailList from '@/components/tools/DetailList'
  const DetailListItem = DetailList.Item

  export default {
    components: {
      DetailList,
      DetailListItem
    }
  }
</script>

<style>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
