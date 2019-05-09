var Module = {
    canvas: (function () {
        var canvas = document.getElementById('canvas');
        return canvas;
    })()
};
export default {
    data() {
        return{

        }
    },
    mounted () {
        //引擎监听事件相关
        document.addEventListener("RealEngineReady", RealBIMInitSys);
        document.addEventListener("RealBIMInitSys", RealBIMLoadMainSce);
        document.addEventListener("RealEngineRenderReady", showCanvas);
        document.addEventListener("RealBIMLoadMainSce", MainSceDown);
    },
    methods: {
        //场景初始化
        RealBIMInitSys(){
            console.log("RealEngineReady!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            // 页面实时反馈窗口宽高给引擎
            g_re_em_window_width = window.innerWidth - 92; 
            g_re_em_window_height = window.innerHeight + 50;
            var workerjspath = "static/comjs/RealBIMWeb_Worker.js";
            var width = g_re_em_window_width; var height = g_re_em_window_height;
            var commonurl = g_commonUrlRes;
            // var username = g_userName; var password = g_password;
            var username = "admin"; var password = "xiyangyang"; 
            REinitSys(workerjspath,width,height,commonurl,username,password);
        },
        //场景加载
        RealBIMLoadMainSce(){
            console.log("RealBIMInitSys!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            g_isRealBIMSysInit=true;
            var urlRes = g_urlRes; 
            var projName = g_projName;
            // var verinfo =0;
            var verinfo ="";
            REloadMainSce(urlRes,projName,verinfo);
            if(projName == "res_bailuyuan")
            {
              REsetMaxResMemMB(5000); //（上限）可根据显存的大小设置，比显存（或系统内存）低500M左右为参考
              REsetExpectMaxInstMemMB(3500); //85%（期望值）
              REsetExpectMaxInstDrawFaceNum(15000000); //1000000~40000000（效果与性能_帧率的平衡点）
              REsetPageLoadLev(2); //手机端1，pc端2
            }else{
              REsetMaxResMemMB(5000);
              REsetExpectMaxInstMemMB(3500);
              REsetExpectMaxInstDrawFaceNum(15000000);
              REsetPageLoadLev(2);
            }
        },
        //为了浏览效果，初始canvas是display:none;天空盒资源加载完成时，才显示canvas
        howCanvas(){
            document.getElementById('canvas').style.display="block";
            // document.getElementById('toolbar').style.display="block";
            Module.canvas.focus(); //为了解决键盘事件的冲突
        },
        // 场景加载完成，其他跟模型相关的操作最好在该时间完成后再进行
        MainSceDown(){

        }
    }
}