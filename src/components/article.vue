<template>
  <div class="single" v-if="post.type === 1 && post.cover.length <= 2">
    <div class="left">
      <p class="content">{{ post.title }}</p>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <div class="singlev" v-else-if="post.type === 2">
    <div class="middle">
      <p class="content">{{ post.title }}</p>
      <div class="imgs">
        <div class="circle"></div>
        <img :src="post.cover[0].url" alt />
        <van-icon name="play" class="play"/>
      </div>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </p>
    </div>
  </div>
  <div class="singlet" v-else-if="post.type === 1 && post.cover.length >= 3">
    <div class="middle">
      <p class="content">{{ post.title }}</p>
      <div class="imgs"> <img :src="e.url" alt v-for="e in post.cover" :key="e.id" /></div>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang="less" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
.singlet {
  .content {
    padding: 10px 0;
    font-size: 14px;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    > img {
      width: 33%;
    }
  }
}
.singlev {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .content {
    padding: 10px 0;
  }

  .middle {
    position: relative;
    .imgs {
      img {
        width: 100%;
        // height: 100%;
      }
      > .circle {
        position: absolute;
        width: 80/360 * 100vw;
        height: 80/360 * 100vw;
        border-radius: 50%;
        background-color: rgba(255,255,255,.2);
        box-shadow: 0 0 10px #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-30%)
      }
      >.play {
        position: absolute;
        font-size: 50px;
        color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-20%)
      }
    }
  }
}
</style>
