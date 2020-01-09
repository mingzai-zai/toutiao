<template>
  <div class="comment_son">
      <commentson v-if='post.parent' :post='post.parent'></commentson>
      <div class="top">
          <div class="left">
              <span>{{post.user.nickname}}</span>   10分钟前
          </div>
          <div class="right">回复</div>
      </div>
      <div class="btm">{{post.content}}</div>
  </div>
</template>

<script>
export default {
    name:'commentson',
    props:['post']
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