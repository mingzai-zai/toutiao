<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <div class="commentList">
      <div class="item" v-for="e in commentlist" :key="e.id">
        <div class="head">
          <img :src="e.user.head_img" alt />
          <div>
            <p>{{ e.user.nickname }}</p>
            <span>{{ e.user.create_date }}</span>
          </div>
          <span @click="onereply(e)">回复</span>
        </div>
        <commentson v-if="e.parent" :post="e.parent"></commentson>
        <div class="text" >{{ e.content }}</div>
      </div>
    </div>
    <commentFooter
      :post="article"
      @update="update"
      :obj="onehuifu"
       @reset='onehuifu=null'
    ></commentFooter>
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import { commentlist, getArticleById } from "@/apis/article.js";
import commentson from "@/components/commentson.vue";
import commentFooter from "@/components/commentFooter.vue";
export default {
  data() {
    return {
      commentlist: [],
      article: {},
      onehuifu: null
    };
  },
  components: {
    myheader,
    commentson,
    commentFooter
  },
  async mounted() {
    // 实现刷新
    this.init();
    let res1 = await getArticleById(this.$route.params.id);
    console.log(res1);
    this.article = res1.data.data;
  },
  methods: {
    update() {
      //此时要在父组件中写
      this.init();
      window.scrollTo(0, 0);
    },
    async init() {
      // 获取全部的评论同时渲染
      let res = await commentlist(this.$route.params.id, {
        pageSize: 50,
        pageIndex: 1
      });
    //   console.log(res);
      this.commentlist = res.data.data.length
        ? res.data.data.map(e => {
            e.user.head_img = "http://127.0.0.1:3000" + e.user.head_img;
            return e;
          })
        : this.commentlist;
    },
    onereply(value) {
      // 只能直接在父组件渲染的子组件中传数据给子组件，不能在子组件以外把数据传给子组件
      // 还有就是子组件中的props的成员不能修改
      this.onehuifu = value;
    },  
  }
};
</script>

<style lang="less" scoped>
.comments {
  padding-bottom: 60px;
}
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
