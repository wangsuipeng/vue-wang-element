<template>
  <div :class="[collapse ? 'hideSidebar' : 'openSidebar']">
    <div class="header header-fixed">
    <div @click="collapseChage" class="collspse-btn">
      <i v-if="collapse == false" class="iconfont icon-zhedie"></i>
      <i v-else class="iconfont icon-zhedie1-copy"></i>
    </div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header-right">
      <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <el-button type="primary" style="background: #fff;border: none">
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
  </div>
</template>
<script>
import bus from '../../assets/js/bus'
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
    return{
      collapse: false,
      abc:true,
      language: 'zh',
      levelList: null
    }
  },
  created () {
    this.getBreadcrumb() 
  },
  watch: {
    $route() {
      this.getBreadcrumb() 
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
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log(first)
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      console.log(this.levelList)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>
<style scoped>
  .header {
    height: 50px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
    color: #ccc000;
  }
  .header-fixed {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    width: calc(100% - 200px);
    -webkit-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
  }
  .hideSidebar .header-fixed {
    width: calc(100% - 64px);
  }
  .breadcrumb {
    position: absolute;
    left: 60px;
    line-height: 50px;
  }
</style>
