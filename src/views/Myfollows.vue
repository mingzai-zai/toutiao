<template>
  <div class="focus">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list" v-for='(e,i) in followlist' :key='e.id'>
          <div class="box">
              <img :src="e.head_img" alt="">
              <div class="center">
                  <p>{{e.nickname}}</p>
                  <span>{{e.create_date}}</span>
              </div>
              <span @click="del(i,e.id)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/header.vue'
import {userfollowList,unfollow} from '@/apis/user.js'
export default {
    data () {
        return {
            followlist:[],
        }
    },
  components: {
    myheader
  },
  async mounted () {
      let res =await userfollowList();
      console.log(res);
      // 如果写了this.followlist=res.data.data，然后在一个一个拼接要循环那些很麻烦
      this.followlist=res.data.data.map(e=>{
          e.head_img='http://127.0.0.1:3000' + e.head_img
          return e;
      })
  },
  methods: {
     async del(index,id) {
         let res =await unfollow(id)
        //  console.log(res);
         this.$toast.success(res.data.message)
         this.followlist.splice(index,1)
      }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
