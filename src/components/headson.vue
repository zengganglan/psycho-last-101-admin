<template>
  <div class="head">
    <div class="a1">{{headson[0]}}</div>
    <span class="a2">{{headson[1]}}</span>
  </div>
</template>

<script>
export default {
  props: ["headson"],
  created() {
    // console.log(this.headson);
  }
};
</script>

<style lang="scss" scoped>
.head {
  height: 104px;
  padding: 0 20px;
 
     background-color: #ffffff;
    box-shadow: #bdc0c3 1px 1px 10px;
    overflow: hidden;
  .a1 {
    margin-top: 30px;
    font-size: 25px;
    color: #00CBA3;
  }
  .a2 {
    font-size: 12px;
    color: #9f9a9b;
  }
}
</style>