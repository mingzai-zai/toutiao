<template>
  <div class="comment_son">
      <commentson v-if='post.parent' :post='post.parent' @huifu='comment'></commentson>
      <div class="top">
          <div class="left">
              <span>{{post.user.nickname}}</span>   10分钟前
          </div>
          <div class="right" @click="comment(post)">回复</div>
      </div>
      <div class="btm">{{post.content}}</div>
  </div>
</template>

<script>
export default {
    name:'commentson',
    props:['post'],
    methods: {
        comment(data){
            //此时可以获取递归里面的post数据，但是最外一层才能给到父组件，假设现在很多评论，回复内部的就不会触发，因为emit只会触发到上一层，所以需要监听一层一层要监听
            console.log(data);
            this.$emit('huifu',data);
        }
    }
}
</script>

<style lang='less' scoped>
.comment_son{
    border: 1px solid #ccc;
    margin: 2px;
    .top {
        display: flex;
        font-size: 12px;
        color: #ccc;
        justify-content: space-between;
        padding: 5px;
    }
    .btm {
        font-size: 12px;
        padding: 5px;
        margin-top: 5px;
    }
}
</style>