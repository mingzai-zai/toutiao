<template>
  <div class="mystar">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <articles :post='e' v-for="e in starlist" :key='e.id' @click="$router.push({path:`/articleDetail/${e.id}`})"></articles>
  </div>
</template>

<script>
import myheader from '@/components/header.vue'
import articles from '@/components/article.vue'
import {userStarList} from '@/apis/user.js'
export default {
    components:{
        myheader,articles
    },
    data () {
        return {
            starlist:[],
        }
    },
   async mounted () {
        let res = await userStarList();
        console.log(res);  
        this.starlist=res.data.data
    }
}
</script>

<style>

</style>