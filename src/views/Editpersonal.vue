<template>
  <div class="edit">
    <headers title="编辑">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </headers>
    <div class="file">
      <img :src="user.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <cell zuo="昵称" :you="user.nickname" @click="flag = !flag"></cell>
    <van-dialog
      v-model="flag"
      title="标题"
      show-cancel-button
      @confirm="jieshou"
    >
      <!-- <van-field :value="user.nickname" placeholder="请输入用户名" ref='zhi' /> -->
      <!-- clearable不知道怎么用 -->
      <van-field
        :value="user.nickname"
        required
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        ref="zhi"
      />
    </van-dialog>
    <cell
      zuo="密码"
      :you="user.password"
      type="password"
      @click="checkPass = !checkPass"
    ></cell>
    <van-dialog
      v-model="checkPass"
      title="标题"
      show-cancel-button
      @confirm="updataPass"
      :before-close="beforeClose"
    >
      <van-field
        required
        label="原密码"
        right-icon="question-o"
        placeholder="请输入原密码"
        ref="old"
      />
      <van-field
        required
        label="新密码"
        right-icon="question-o"
        placeholder="请输入新密码"
        ref="newp"
      />
    </van-dialog>
    <cell zuo="性别" :you="user.gender === 1 ? '男' : '女'" @click="checkGender=!checkGender"></cell>
    <van-dialog
      v-model="checkGender"
      title="标题"
      show-cancel-button
      @confirm="changeGender">
      <!-- 先女后男，自己认为数据库里面就是0为女，1为男，所以啊change事件获取的index时候就刚好可以对上，但是呢，如果反了就比较麻烦 -->
      <van-picker :columns="['女','男']" @change="onChange" :default-index="user.gender"/>
    </van-dialog>
  </div>
</template>

<script>
import headers from "@/components/header.vue";
import cell from "@/components/cell.vue";
import { getUserId, updataUserByID } from "@/apis/user.js";
import { fileload } from "@/apis/upload.js";
export default {
  data() {
    return {
      user: {},
      flag: false,
      checkPass: false,
      checkGender:false,
      gender:'',
    };
  },
  components: {
    headers,
    cell
  },
  async mounted() {
    // console.log(getUserId)
    let { id } = this.$route.params;
    let res = await getUserId(id);
    // console.log(res);
    if (res.data.message === "获取成功") {
      this.user = res.data.data;
      // console.log(this.user);
      this.user.head_img = "http://127.0.0.1:3000" + this.user.head_img;
    }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // 首先上传的服务器
      let fd = new FormData();
      fd.append("file", file.file);
      // console.log(file);
      let res = await fileload(fd);
      // console.log(res);
      if (res.data.message === "文件上传成功") {
        // 实现预览效果
        this.user.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        let { id } = this.user;
        // console.log(id);
        let res1 = await updataUserByID(id, { head_img: res.data.data.url });
        // console.log(res1);
        if (res1.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("上传失败");
      }
    },
    async jieshou() {
      // 此时获取的是组件，所以需要继续获取refs的东西
      // console.log(this.$refs.zhi)
      let value = this.$refs.zhi.$refs.input.value;
      // console.log(value);
      // this.user.nickname=value;
      let res = await updataUserByID(this.user.id, { nickname: value });
      // console.log(res);
      if (res.data.message === "修改成功") {
        this.user.nickname = value;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    // 修改密码
    async updataPass() {
      // console.log(1)如果在这里处理业务的话，做了判断直接就是点击了就出去了之后再才有了提示，所以我们现在只想点击确定，不退出，当前时候判断，所以找文档before-close这个属性
      // before-close只是为了停在那里，提示一下，所以还是要在此函数做出相应处理
      let old = this.$refs.old.$refs.input.value;
      console.log(old);
      // 不写新的判断就会卡在那里也会显成功
      let newp = this.$refs.newp.$refs.input.value;
      if (!/^\w{3,16}$/.test(newp)) {
        this.$toast.fail("请输入3~16位密码");
        return;
      }

      if (old === this.user.password) {
        let res = await updataUserByID(this.user.id, { password: newp });
        // console.log(res);
        if (res.data.message === "修改成功") {
          this.$toast.success("修改成功");
          this.user.password = newp;
        } else {
          this.$toast.fail("修改失败");
        }
      }
    },
    beforeClose(action, done) {
      // console.log(action)
      // console.log(done)
      // done(false);
      // 这里只做监听错与否如果没有done存在，会一直转圈圈
      if (action === "confirm") {
        let old = this.$refs.old.$refs.input.value;
        if (old === this.user.password) {
          let newp = this.$refs.newp.$refs.input.value;
          console.log(newp)
          if (!/^\w{3,16}$/.test(newp)) {
            this.$toast.fail("请输入3~16位密码");
            done(false);
          } else {
            done();
          }
        } else {
          this.$toast.fail("原密码输入错误");
          done(false);
        }
      } else {
        done();
      }
    },
    // 修改性别
    async changeGender(){
       let res = await updataUserByID(this.user.id, { gender: this.gender });
        // console.log(res);
        if (res.data.message === "修改成功") {
          this.$toast.success("修改成功");
          this.user.gender =  this.gender;
        }else {
          this.$toast.success("修改失败");
        }
    },
    onChange(picker, value, index) {
      this.gender=index;
    }
  }
};
</script>

<style lang="less" scoped>
.file {
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
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 150/360 * 100vm;
    height: 150/360 * 100vm;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
