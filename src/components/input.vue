<template>
  <input
    type="text"
    class="put"
    @input="gai"
    :class="{ green: flag, red: !flag }"
    @blur="tips"
  />
</template>

<script>
export default {
  props: ["rules", "msg"],
  methods: {
    gai(event) {
      let value = event.target.value;
      if (this.rules && this.rules.test(value)) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      this.$emit("input", value);
    },
    tips() {
      if (!this.flag) {
        // console.log(this.msg || '不正确·')
        this.$toast.fail({message:this.msg || '不正确·',duration:4000});
      }
    }
  },
  data() {
    return {
      flag: true
    };
  }
};
</script>

<style lang="less" scoped>
.put {
  width: 318 * 100vm/360;
  height: 40px;
  line-height: 60px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #000;
  font-size: 25px;
}
.green {
  border-bottom: 2px solid rgb(13, 202, 54);
}
.red {
  border-bottom: 2px solid red;
}
</style>
