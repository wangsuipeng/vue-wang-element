<template>
    <div class="emscripten_border">
        <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex="1"></canvas>
        <div class="loading" id="loading">
            <div class="processBarOuter">
                <!--中间白色圆圈-->
                <div class="processBarInner">
                   <i><span id="processpercent">0</span>%</i>
                </div>
                <!--转动的是浅色的-->
                <div class="processBar processBarHalfMove"></div>
                <!--固定在左边不动，浅色，用于遮挡左边-->
                <div class="processBar processBarHalfLeft"></div>
                <!--固定在右边不动，深色，用于显露右边-->
                <div class="processBar processBarHalfRight not-display"></div>
                <div class="processBar-text">
                  <p id="loadinginfo"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{

        }
    },
    created() {
        // this.open();
    },
    methods: {
        //创建模型需要的文件
        createScript(src, id) {
          let script = document.createElement("script");
          script.setAttribute("async", "async");
          script.src = src;
          script.setAttribute("id", id);
          let body = document.querySelector("body");
          body.append(script);
        },
        removeScript(id) {
          let body = document.querySelector("body");
          body.removeChild(document.getElementById(id));
        },
        open() {
          this.createScript("static/js/RealBIMWeb.js", "RealBIMWeb");
          this.createScript("static/js/ReUtility.js", "ReUtility");
          this.createScript("static/js/main.js", "main");
        },
        close() {
          this.removeScript("RealBIMWeb");
          this.removeScript("ReUtility");
          this.removeScript("main");
        },
    }
}
</script>
<style scoped>
    @import "../../../static/css/style";
    .emscripten {
        width: 100%;
        height: calc(100vh - 50px);
    }
</style>

