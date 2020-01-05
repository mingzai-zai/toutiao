<template>
  <div class="edit">
      <headers title="编辑">
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </headers>
      <div class="file">
          <img :src="user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>
      <cell zuo='昵称' :you='user.nickname'></cell>
      <cell zuo='密码' :you='user.password' type="password"></cell>
      <cell zuo='性别' :you="user.gender===1?'男':'女'"></cell>
  </div>
</template>

<script>
import headers from '@/components/header.vue';
import cell from '@/components/cell.vue';
import { getUserId,updataUserByID } from '@/apis/user.js';
import {fileload} from '@/apis/upload.js'
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
        // console.log(this.user);
        this.user.head_img='http://127.0.0.1:3000' + this.user.head_img
        }

    },
    methods: {
      async afterRead(file) {
        // 此时可以自行将文件上传至服务器
        // 首先上传的服务器
        let fd = new FormData()
        fd.append('file',file.file)
        // console.log(file);
        let res = await fileload(fd);
        // console.log(res);
        if(res.data.message==='文件上传成功') {
            // 实现预览效果
            this.user.head_img='http://127.0.0.1:3000'+res.data.data.url;
            let {id} = this.user
            // console.log(id);
            let res1 = await updataUserByID(id,{head_img:res.data.data.url});
            // console.log(res1);
            if(res1.data.message==='修改成功') {
                this.$toast.success('修改成功')
            }else {
                this.$toast.fail('修改失败')
            }
        }else {
            this.$toast.fail('上传失败')
        }
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
        /deep/.van-uploader__upload{
            width: 150/360*100vm;
            height: 150/360*100vm;
        }
        /deep/.van-uploader{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            opacity: 0;
        }
    }
</style>