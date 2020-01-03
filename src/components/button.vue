<template>
  <div id="btn" @click="login">
      <span :class='icon'></span>
      <slot></slot>
  </div>
</template>

<script>
export default {
props:['icon'],
methods:{
    login(event){
        this.$emit('click',event)
    }
}
}
</script>

<style lang='less' scoped>
#btn {
    width: 318*100vw/360;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: rgb(238, 10, 208);
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 40px;

}
</style>