<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="guanzhu" :class="{ red1: article.has_follow }">{{article.has_follow?"已关注":'關注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{ article.title }}</div>
      <div class="desc">
        <span>{{ article.user.nickname }}</span> &nbsp;&nbsp;
        <span>{{ article.create_date }}</span>
      </div>
      <div class="content" v-html="article.content" v-if='article.type===1'></div>
      <video src="https://vdept.bdstatic.com/514175724e794e5462366477615a7a57/3377483274524335/3e00c938e3b5840310a6294912e311ca280451c2e61ebed7553e8376e0e4ffffb1bc58a894f55e96308d3e6b9adad657.mp4?auth_key=1578497471-0-0-027d2ea7dfa0c66f3784e242c1e773f8" v-if='article.type===2' controls poster='http://img2.imgtn.bdimg.com/it/u=2973287723,4142503327&fm=26&gp=0.jpg'></video>
      <div class="opt">
        <span class="like" @click="dianzan">
          <van-icon name="good-job-o" :class="{ red: article.has_like }" />{{
            article.like_length
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部评论 -->
    <commentFooter :post='article'></commentFooter>
  </div>
</template>

<script>
import { getArticleById, getLikeById } from "@/apis/article.js";
import { follow, unfollow } from "@/apis/user.js";
import commentFooter from '@/components/commentFooter.vue'
export default {
  data() {
    return {
      article: {
        user: {}
      }
    };
  },
  components:{
    commentFooter
  },
  methods: {
    async dianzan() {
      let res_like = await getLikeById(this.article.id);
      // console.log(res_like);
      if (res_like.data.message === "点赞成功") {
        ++this.article.like_length;
      } else {
        --this.article.like_length;
      }
      this.article.has_like = !this.article.has_like;
      this.$toast.success(res_like.data.message);
    },
    //关注和取消关注
    async guanzhu() {
      let res;
      if (this.article.has_follow) {
        res = await unfollow(this.article.user.id);
        // console.log(res);
      } else {
        res = await follow(this.article.user.id);
        // console.log(res);
      }
      this.article.has_follow=!this.article.has_follow;
      this.$toast.success(res.data.message);
    }
  },
  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleById(this.$route.params.id);
    console.log(res);
    this.article = res.data.data;
  }
};
</script>

<style lang="less" scoped>
.articaldetail {
  margin-bottom: 80px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    // background-color: #f00;
    border: 1px solid #ccc;
    // color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.red1 {
      background-color: #f00;
      color: #fff;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    // text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  video{
      width: 100%;
      margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like {
    /deep/i {
      &.red {
        color: #f00;
      }
    }
  }
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
