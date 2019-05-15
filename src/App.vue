<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* html{
  overflow: hidden;
} */
@font-face {
  font-family: alibaba;
  src: url('./assets/fonts/AlibabaSans-Medium.otf');
  font-weight: normal;
}
#app,body {
  font-family: alibaba;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
  /* @import "../src/assets/css/main.css"; */
</style>
