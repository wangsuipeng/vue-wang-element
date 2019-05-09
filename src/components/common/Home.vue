<template>
  <div class="wrapper">
    <v-SideBar></v-SideBar>
    <div class="main-container" :style="{marginLeft: boolLeft?'200px':'64px'}">
      <v-Head></v-Head>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vSideBar from '../common/SideBar';
import vHead from '../common/Header';
import bus from "../../assets/js/bus";
export default {
  data() {
    return{
      boolLeft: true
    }
  },
  components:{
    vSideBar,
    vHead
  },
  created() {
    bus.$on("collapse", param => {
      console.log(param)
      this.boolLeft = !param;
    });
  }
}
</script>
<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .main-container {
    position: relative;
    min-height: 100%;
    -webkit-transition: margin-left .3s ease-in-out;
    transition: margin-left .3s ease-in-out;
    /* margin-left: 200px; */
  }
  .app-main {
    /* min-height: calc(100vh - 50px); */
    height: 886px;
    width: 100%;
    position: relative;
    overflow-y: scroll;
    /* background-color: bisque; */
    /* background-color: #ddd; */
  }
</style>
