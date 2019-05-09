<template>
  <div class="header">
    <div @click="collapseChage" class="collspse-btn">
      <i v-if="collapse == false" class="iconfont icon-zhedie"></i>
      <i v-else class="iconfont icon-zhedie1-copy"></i>
    </div>
    <div class="box">2222</div>
  </div>
</template>
<script>
import bus from '../../assets/js/bus';
export default {
  data() {
    return{
      collapse: false,
      abc:true
    }
  },
  mounted() {
    if(document.body.clientWidth < 1500){
      this.collapseChage();
    }
  },
  methods:{
    collapseChage() {
      this.abc = !this.abc;
      this.collapse = !this.collapse;
      bus.$emit('collapse',this.collapse);
      // bus.$emit('abc',this.abc);
    }
  }
}
</script>
<style scoped>
  .header {
    height: 50px;
    overflow: hidden;
    background-color: cadetblue;
  }
  .collspse-btn {
    float      : left;
    margin-left: 15px;
    cursor     : pointer;
    line-height: 50px;
  }
  .box {
    color: #fff;
  }
</style>
