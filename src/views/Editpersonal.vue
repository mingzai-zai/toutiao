<template>
  <div class="edit">
      <headers title="编辑">
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </headers>
      <div class="file">
          <img :src="user.head_img" alt="">
      </div>
      <cell zuo='昵称' :you='user.nickname'></cell>
      <cell zuo='密码' :you='user.password' type="password"></cell>
      <cell zuo='性别' :you="user.gender===1?'男':'女'"></cell>
  </div>
</template>

<script>
import headers from '@/components/header.vue';
import cell from '@/components/cell.vue';
import { getUserId } from '@/apis/user.js'
export default {
    data () {
        return {
            user:{}
        }
    },
    components:{
        headers,cell
    },
    async mounted () {
        // console.log(getUserId)
        let {id} = this.$route.params;
        let res = await getUserId(id);
        // console.log(res);
        if(res.data.message ==='获取成功') {
        this.user=res.data.data;
        console.log(this.user);
        this.user.head_img='http://127.0.0.1:3000' + this.user.head_img
        }

    }
}
</script>

<style lang='less' scoped>
    .file{
        height: 150px;
        // background-color: pink;
        position: relative;
        > img {
            position: absolute;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: #fff;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%)
        }
    }
</style>