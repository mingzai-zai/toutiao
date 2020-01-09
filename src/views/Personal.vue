<template>
  <div class="personal">
    <router-link :to="{path:`/editpersonal/${user.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="user.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{ user.nickname }}
          </div>
          <div class="time">{{ user.create_date }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <cell zuo="我的关注" you="关注的用户" @click="$router.push({name:'Myfollows'})"></cell>
    <cell zuo="我的跟帖" you="跟帖/恢复"></cell>
    <cell zuo="我的收藏" you="文章/视频" @click="$router.push({name:'Mystar'})"></cell>
    <cell zuo="设置" you=""></cell>
    <buttons id="btn" @click="exit"> 退出</buttons>
  </div>
</template>

<script>
import cell from "@/components/cell.vue";
import buttons from "@/components/button.vue";
import { getUserId } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    cell,
    buttons
  },
  async mounted() {
    let { id } = this.$route.params;
    // console.log(id);
    let res = await getUserId(id);
    // console.log(res);
    if (res.data.message === "获取成功") {
      this.user = res.data.data;
      this.user.head_img = "http://127.0.0.1:3000" + res.data.data.head_img;
    }
    // else {
    //     this.$router.push({name:'Login'})
    // }
  },
  methods: {
    exit(){
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_msg');
      // location.href='#/login'
      this.$router.push({name:'Login'})
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
#btn {
  margin: 0 auto;
}
</style>
