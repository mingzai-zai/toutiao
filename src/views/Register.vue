<template>
  <div class="login">
    <div id="app">
      <div class="container">
        <div class="close"><span class="iconfont iconicon-test"></span></div>
        <div class="logo"><span class="iconfont iconnew"></span></div>
        <div class="inputs">
          <inputs
            placeholder="请输入用户名/手机号码"
            v-model="users.username"
            :rules="/^(\d{5,6})$|^(1\d{10})$/"
            msg="用户名不正确"
          ></inputs>
          <inputs
            placeholder="请输入密码"
            :rules="/^\d{3,16}$/"
            msg="请输入3~16位密码"
            v-model="users.password"
          ></inputs>
          <inputs
            placeholder="请输入昵称"
            :rules="/^\S+$/"
            msg="请输入1个子以上的"
            v-model="users.nickname"
          ></inputs>
        </div>
        <p class="tips">
          有账号？
          <a href="#/login" class="">登录</a>
        </p>
        <btn @click="register">注册啦小老弟</btn>
      </div>
    </div>
  </div>
</template>

<script>
import btn from "@/components/button.vue";
import {registerUser} from '@/apis/user.js'
import inputs from "@/components/input.vue";
export default {
  data() {
    return {
      users: {
        username: "",
        password: "",
        nickname:'',
      }
    };
  },
  components: {
    btn,
    inputs
  },
  methods: {
    async register() {
        let res= await registerUser(this.users)
        // console.log(res);
        if(res.data.message==='注册成功') {
          this.$router.push({name:'Index'})
        }
        
    },
    
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
    width: 318/360*100vw;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
