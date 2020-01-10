<template>
  <div class="change">
    <myheader title="伱喜欢的栏目">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <div class="remove_cate">
      <p>点击移除一下频道</p>
      <div class="pai">
        <span v-for="(e, i) in catelist" :key="e.id" @click="remove(i)">{{
          e.name
        }}</span>
      </div>
    </div>
    <div class="remove_cate">
      <p>点击增加一下频道</p>
      <div class="pai">
        <span v-for="(e, i) in addcatelist" :key="e.id" @click="add(i)">{{
          e.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import { getAllCate } from "@/apis/cate.js";
export default {
  data() {
    return {
      catelist: [],
      addcatelist: []
    };
  },
  components: {
    myheader
  },
  async mounted() {
    if (localStorage.getItem("addcatelist")) {
      this.addcatelist = JSON.parse(localStorage.getItem("addcatelist"));
    }
    if (localStorage.getItem("catelist")) {
      this.catelist = JSON.parse(localStorage.getItem("catelist"));
    } else {
      let res = await getAllCate();
      // console.log(res);
      let token = localStorage.getItem("user_token");
      if (token) {
        this.catelist = res.data.data.splice(2);
      } else {
        this.catelist = res.data.data.splice(1);
      }
    }
  },
  methods: {
    remove(index) {
      this.addcatelist.unshift(...this.catelist.splice(index, 1));
      //   console.log(this.catelist.splice(index,1))
      localStorage.setItem("catelist", JSON.stringify(this.catelist));
      localStorage.setItem("addcatelist", JSON.stringify(this.addcatelist));
    },
    add(index) {
      this.catelist.push(...this.addcatelist.splice(index, 1));
      localStorage.setItem("catelist", JSON.stringify(this.catelist));
      localStorage.setItem("addcatelist", JSON.stringify(this.addcatelist));
    }
  }
};
</script>

<style lang="less" scoped>
.remove_cate {
  padding: 10px 10px 20px;
  p {
    font-size: 14px;
    color: #666;
  }
  .pai {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    span {
      //   display: block;
      margin-top: 5px;
      border: 1px solid #ccc;
      padding: 10px 20px;
      color: #666;
    }
  }
}
</style>
