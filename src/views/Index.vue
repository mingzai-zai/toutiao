<template>
  <div class="index">
    <head>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" class="search-son" />搜索新闻
      </div>
      <div class="personal" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" class="icon" />
      </div>
    </head>
    <!-- <van-tabs v-model="active" sticky swipeable @change='change'> -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in catelist" :key="cate.id">
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <articles
              v-for="value in cate.postlist"
              :key="value.id"
              :post="value"
            ></articles>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllCate } from "@/apis/cate.js";
import { getAllArticle } from "@/apis/article.js";
import articles from "@/components/article.vue";
export default {
  components: {
    articles
  },
  data() {
    return {
      id: "",
      active: localStorage.getItem("user_token") ? 1 : 0,
      catelist: []
    };
  },
  async mounted() {
    this.id = JSON.parse(localStorage.getItem("user_msg") || "{}").id;
    // console.log(id)
    let res = await getAllCate();
    // console.log(res);
    this.catelist = res.data.data;
    this.catelist = this.catelist.map(value => {
      return {
        ...value,
        postlist: [],
        category: value.id,
        pageIndex: 1,
        pageSize: 5,
        loading: false,
        finished: false,
        isLoading: false
      };
    });
    this.getall();
    //此时只会获取到当前-----头条的数据，所以我们可以使用监听
    // let res1 = await getAllArticle({
    //   category: this.catelist[this.active].id,
    //   pageIndex: this.catelist[this.active].pageIndex,
    //   pageSize: this.catelist[this.active].pageSize
    // });
    // console.log(res1);
    // this.catelist[this.active].postlist = res1.data.data;
  },
  watch: {
    active() {
      // console.log(this.active);
      // 此时为了让它不每一次都需要加载，所以要限制它不断的请求，判断是否数据为空
      if (this.catelist[this.active].postlist.length === 0) this.getall();
    }
  },
  // methods: {
  //   change(change){
  //     // 可以使用但是有跟好的方法；可以实现点击和滑动都有效果
  //     console.log(change);
  //   }
  // }
  methods: {
    onRefresh() {
      // if(this.catelist[this.active].loading===false) {

      this.catelist[this.active].pageIndex = 1;
      this.catelist[this.active].postlist.length = 0;
      setTimeout(() => {
        this.getall();
      }, 1000);
      // 向上刷新完,因为调用了getall所以finished是true的下来就加载不了数据
      this.catelist[this.active].finished = false;
      // }
    },
    async getall() {
      let res = await getAllArticle({
        category: this.catelist[this.active].id,
        pageIndex: this.catelist[this.active].pageIndex,
        pageSize: this.catelist[this.active].pageSize
      });
      // console.log(res);
      // this.catelist[this.active].postlist = res.data.data;
      // this.catelist[this.active].postlist.push(...res.data.data);
      if (this.catelist[this.active].loading) {
        this.catelist[this.active].loading = false;
      }

      // 下面就是为了可以判断处于不是加载的状态，不然会一直转，不能写在onRefresh，因为那是异步，可能还没调用完就false了
      if (this.catelist[this.active].isLoading) {
        this.catelist[this.active].isLoading = false;
      }
      if (res.data.data.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
        // this.catelist[this.active].loading = false;
      }
      // 写上面的话因为异步，因为有些页面只有两个，可能触发没有够满屏，会继续获取重复的以至于满屏
      this.catelist[this.active].postlist.push(...res.data.data);
      // console.log(this.catelist[this.active].postlist);
      // console.log(this.catelist[this.active]);
    },
    onLoad() {
      // 有定时器（异步）不写下面条件会报错，而且效果有误，需要给条件,而且只能加在这里，因为上拉时候需要时间来加载，可能当时页面没有东西，就会执行list组件里的遇到没满屏自动填满，会报错
      if(this.catelist[this.active].isLoading===false) {
        this.catelist[this.active].pageIndex++;
        // 加定时器只是为了效果
      setTimeout(() => {
        this.getall();
      }, 1000);
      }
      
    },
    
  }
};
</script>

<style lang="less" scoped>
head {
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .logo {
    padding-left: 5px;
    .iconnew {
      font-size: 70px;
      color: #fff;
    }
  }
  .search {
    flex: 1;
    font-size: 20px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    .search-son {
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .personal {
    padding: 0 10px;
    font-size: 35px;
    margin-top: 3px;
    color: #fff;
  }
}
</style>
