<template>
  <div class="mystar">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <articles></articles>
  </div>
</template>

<script>
import myheader from '@/components/header.vue'
import articles from '@/components/article.vue'
export default {
    components:{
        myheader,articles
    }
}
</script>

<style>

</style>