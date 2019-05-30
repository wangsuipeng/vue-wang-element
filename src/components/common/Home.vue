<template>
  <div class="wrapper" :class="[collapse ? 'hideSidebar' : 'openSidebar']">
    <v-SideBar></v-SideBar>
    <div class="main-container" :style="{marginLeft: boolLeft?'200px':'64px'}">
      <div class="header-fixed">
        <v-Head class="navbar"></v-Head>
        <tags-view></tags-view>
      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vSideBar from "../common/SideBar";
import vHead from "../common/Header";
import TagsView from "./TagsView";
import bus from "../../assets/js/bus";
export default {
  data() {
    return {
      boolLeft: true,
      collapse: null
    };
  },
  components: {
    vSideBar,
    vHead,
    TagsView
  },
  created() {
    bus.$on("collapse", param => {
      console.log(param);
      this.boolLeft = !param;
      this.collapse = param;
    });
  }
};
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)
}
.main-container {
  position: relative;
  min-height: 100%;
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 200px;
}
.app-main {
  min-height: calc(100vh - 100px);
  width: 100%;
  padding-top: 100px;
  position: relative;
  overflow: hidden;
  /* background-color: #f0f2f5; */
  /* height: 886px; */
  /* overflow-y: scroll; */
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
</style>
