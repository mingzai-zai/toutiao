<template>
  <div class="search">
    <header>
      <van-icon name="arrow-left" @click="$router.back()" />
      <van-search
        class="searchkuang"
        v-model="keyword"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div slot="action" @click="onSearch">搜索</div>
    </header>
    <div class="history">
      <h3>历史记录</h3>

      <router-link to="" v-for="item in history" :key="item"
        ><div class="hang" @click="onSearch(item)">{{ item }}</div></router-link
      >
      <!-- <a href="" v-for='item in history' :key='item'>{{item}}</a> -->
    </div>
    <div class="hot history">
      <h3>热门搜索</h3>
      <router-link
        :to="`/articleDetail/${item.id}`"
        v-for="item in hotsearch"
        :key="item.id"
      >
        <div class="hang">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getKeyWordArticle } from "@/apis/article.js";
export default {
  data() {
    return {
      keyword: "",
      hotsearch: [],
      history: []
    };
  },
  mounted() {
    let arr = this.getdata();
    this.history = arr;
  },
  methods: {
    async onSearch(keyword) {
      let res = await getKeyWordArticle({ keyword: keyword });
      console.log(res);
      this.hotsearch = res.data.data;
      //此时我想有数据记录就用到了本地存储，但是不能一开始在data中定义，如果定义了，每次搜索完不是覆盖原来的数组啦，所以这里我们只能定义一个方法，在里面开始搞数组这样子就不会覆盖了
      let arr = this.getdata();
      //   if (arr.indexOf(keyword) === -1) {
      //     arr.unshift(keyword);
      //     localStorage.setItem("history", JSON.stringify(arr));
      //   } else {
      //     arr.splice(arr.indexOf(keyword), 1);
      //     arr.unshift(keyword);
      //     localStorage.setItem("history", JSON.stringify(arr));
      //   }
      if (arr.indexOf(keyword) !== -1) {
          arr.splice(arr.indexOf(keyword), 1);
      }
        arr.unshift(keyword);
        localStorage.setItem("history", JSON.stringify(arr));
    },
    getdata() {
      return JSON.parse(localStorage.getItem("history") || "[]");
    }
  }
};
</script>

<style lang="less" scoped>
header {
  // background-color: #ccc;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  .searchkuang {
    flex: 1;
  }
}
.history {
  padding: 20px 10px;
  border-bottom: 1px solid #000;

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .hang {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
  }
  a {
    display: block;
    line-height: 30px;
  }
}
</style>
