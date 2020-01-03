<template>
  <div class="login">
      <div id="app"><div class="container"><div class="close"><span class="iconfont iconicon-test"></span></div><div class="logo"><span class="iconfont iconnew"></span></div><div class="inputs">
          <inputs placeholder='请输入用户名/手机号码' :value='obj.username' :rules='/^(\d{5,6})$|^(1\d{10})$/' @input='gai' msg='用户名不正确'></inputs>
          <inputs placeholder='请输入密码'  :rules='/^\d{3,16}$/'  msg='请输入3~16位密码' v-model="obj.passwrod"></inputs>
          </div>
          <p class="tips">
    没有账号？
    <a href="#/register" class="">去注册</a></p>
    <btn @click="login">登录啦小老弟</btn>
    </div>
    </div>

  </div>
</template>

<script>
import btn from '@/components/button.vue';
import inputs from '@/components/input.vue';
export default {
    data () {
        return {
        obj:{
            username:'111',
            passwrod:'',
        }      
        }
    },
  components:{
      btn,inputs
  },
  methods:{
      login() {
          console.log(this.obj);
      },
      gai(data){
          this.obj.username=data;
        //   console.log(this.obj)
      }
  }
}
</script>

<style lang='less'>
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