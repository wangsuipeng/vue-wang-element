<template>
  <div class="header">
    <div @click="collapseChage" class="collspse-btn">
      <i v-if="collapse == false" class="iconfont icon-zhedie"></i>
      <i v-else class="iconfont icon-zhedie1-copy"></i>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <el-button type="primary" style="background: cadetblue;border: none">
          <i class="icon iconfont icon-language"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
          <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
          <el-dropdown-item :disabled="language==='es'" command="es">Español</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
  // computed: {
  //   language() {
  //     return this.$store.getters.language
  //   }
  // },
  methods:{
    collapseChage() {
      this.abc = !this.abc;
      this.collapse = !this.collapse;
      bus.$emit('collapse',this.collapse);
      // bus.$emit('abc',this.abc);
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
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
  .header-right {
    float: right;
    margin-right: 150px;
    line-height: 45px;
  }
  .icon {
    display: inline-block;
    font-size: 30px;
  }
</style>
