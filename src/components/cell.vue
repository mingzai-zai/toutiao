<template>
  <div class="cell" @click="show">
    <div class="left">{{zuo}}</div>
    <div class="right">{{type==='password'?'******':you}}<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props:['zuo','you','type'],
    methods: {
      show(event){
      this.$emit('click',event)
      }
    }
};
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  margin: 15px;
  padding: 10px 0;
  justify-content:space-between;
  border-bottom: 1px solid #ccc;
  >.left {
      font-size: 20px;
  }
  >.right {
      font-size: 14px;
      color: #666;
  }
}
</style>
