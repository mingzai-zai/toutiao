<template>
  <div class="mystar">
    <myheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <van-swipe-cell :name='i' :before-close="beforeClose" v-for="(e,i) in starlist" :key="e.id">
      <articles
        :post="e"
        @click="$router.push({ path: `/articleDetail/${e.id}` })"
      ></articles>
      <template slot="right">
        <van-button square type="danger" text="取消收藏"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import articles from "@/components/article.vue";
import { userStarList } from "@/apis/user.js";
import {shoucang} from '@/apis/article.js'
export default {
  components: {
    myheader,
    articles
  },
  data() {
    return {
      starlist: []
    };
  },
  async mounted() {
    let res = await userStarList();
    console.log(res);
    this.starlist = res.data.data;
  },
    methods: {
        // instance 为对应的 SwipeCell 实例
    beforeClose({ name ,position, instance}) {
        // console.log(position)
        // position就看触发的那一边，取消就是outside	收起单元格侧边栏
        // console.log(instance)
        // console.log(name)
      switch (position) {
        // case 'left':
        // case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定取消收藏吗？'
          }).then(async()=>  {
            // instance.close();右边的东西缩回去
            let res = await shoucang(this.starlist[name].id)
            console.log(res);
            this.starlist.splice(name,1);
            this.$toast.success(res.data.message)
            // this.del();
            // console.log(this)
          }).catch(()=>{
               instance.close();
          });
          break;
      }
    },
    
    }
};
</script>

<style></style>
