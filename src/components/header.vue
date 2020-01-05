<template>
  <div class="header1">
      <div>
          <slot name="left"></slot>
      </div>
      <div>
          {{title}}
      </div>
      <div>
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style lang='less' scoped>
.header1 {
    height: 40px;
    border-bottom: 2px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div:nth-of-type(2n-1) {
        padding: 0 10px;
    }
    >div:nth-of-type(2) {
        font-size: 16px;
        // font-weight: 700;
        text-align: center;
    }

}
</style>