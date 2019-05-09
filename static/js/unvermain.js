var Module = {
  print: (function() {
    var element = document.getElementById('output');
    if (element) element.value = ''; // clear browser cache
    return function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      console.log(text);
      if (element) {
        element.value += text + "\n";
        element.scrollTop = element.scrollHeight; // focus on bottom
      }
    };
  })(),
  canvas: (function() {
    var canvas = document.getElementById('canvas');
    return canvas;
  })()
};
window.onload = function(event){
  //获取URL字符串得到项目名称
  var urlProjName = location.search;
  var temp = urlProjName.lastIndexOf("\?");
  //g_projName  = urlProjName.substring(temp + 1, urlProjName.length);
  g_projName  = "res_xiandaidashacolor";
  g_userName = localStorage.reusername;
  g_password = localStorage.repassword;
  g_urlRes = "https://www.bjblackhole.cn:8009/default.aspx?dir=url_res03&path=";
  g_commonUrlRes = "https://www.bjblackhole.cn:8009/default.aspx?dir=url_res03&path=res_gol001/";
  // g_urlRes = "https://192.168.1.31:10157/default.aspx?dir=url_res02&path=";
  // g_commonUrlRes = "https://192.168.1.31:10157/default.aspx?dir=url_res02&path=res_gol001/";
  // g_urlRes = "http://192.168.1.3:8008/default.aspx?dir=url_res03&path=";
  // g_commonUrlRes = "http://192.168.1.3:8008/default.aspx?dir=url_res03&path=res_gol001/";
  // g_urlRes = "http://180.169.229.38//default.aspx?dir=Resources&path=";
  // g_commonUrlRes = "http://180.169.229.38//default.aspx?dir=Resources&path=res_gol001";
  g_isRealBIMSysInit = false;   //场景初始化是否完成
  g_isRealBIMMainSceLoad = false;   //模型是否加载完成

  //引擎监听事件相关
  document.addEventListener("RealEngineReady", RealBIMInitSys);
  document.addEventListener("RealBIMInitSys", RealBIMLoadMainSce);
  document.addEventListener("RealEngineRenderReady", showCanvas);
  document.addEventListener("RealBIMLoadMainSce", MainSceDown);
  document.addEventListener("RealBIMLoadProgress", function(e){LoadingProgress(e.detail.progress,e.detail.info);});
};
// 改变三维图形窗口大小时，需重新给窗口宽高赋值；刷新页面时需要卸载GPU内存
window.onresize = function(event){
  g_re_em_window_width = window.innerWidth; 
  g_re_em_window_height = window.innerHeight;
};
window.onunload = function(event){    
  GLctx.getExtension('WEBGL_lose_context').loseContext();
};

/*旋转进度条@param percent需要转动的百分比*/
function processBarRotate(percent){
    var processBarHalfMove = '.processBarHalfMove';
    var processBarHalfLeft = '.processBarHalfLeft';
    var processBarHalfRight = '.processBarHalfRight';
    //---按角度转动
    function barRotate(angle){
        $(processBarHalfMove).css('transform', 'rotate(' + angle + 'deg)');
    }
    var angle = 3.6 * percent + 90;
    //小于50度，直接转到目标角度
    if ( percent <= 50 ){
        barRotate(angle);
    }
    //大于50度，则先转到一半，等事件结束
    else{
        barRotate( angle ); //完成剩余的角度
        $(processBarHalfLeft).addClass('not-display');
        $(processBarHalfRight).removeClass('not-display');
    }
}
function LoadingProgress(percent,info){
  document.getElementById('loading').style.display="block";
  processBarRotate(percent);
  document.getElementById('processpercent').innerText=percent;
  document.getElementById('loadinginfo').innerText=info;
  if(percent==100){
    document.getElementById('loading').style.display="none";
  }
}

//场景初始化
function RealBIMInitSys(){
  // 页面实时反馈窗口宽高给引擎
  g_re_em_window_width = window.innerWidth; 
  g_re_em_window_height = window.innerHeight;
  var workerjspath = "../javascript/RealBIMWeb_Worker.js";
  var width = g_re_em_window_width; var height = g_re_em_window_height;
  var commonurl = g_commonUrlRes;
  var username = g_userName; var password = g_password;
  var username = "admin"; var password = "xiyangyang"; 
  REinitSys(workerjspath,width,height,commonurl,username,password);
}
//为了浏览效果，初始canvas是display:none;天空盒资源加载完成时，才显示canvas
function showCanvas(){
  document.getElementById('canvas').style.display="block";
  document.getElementById('toolbar').style.display="block";
  Module.canvas.focus(); //为了解决键盘事件的冲突
}
//场景加载
function RealBIMLoadMainSce(){
    g_isRealBIMSysInit=true;
    var urlRes = g_urlRes; var projName = g_projName;
    // var verinfo =0;
    var verinfo ="";
    REloadMainSce(urlRes,projName,verinfo);
    REsetMaxResMemMB(5000);
    REsetExpectMaxInstMemMB(3500);
    REsetExpectMaxInstDrawFaceNum(15000000);
    REsetPageLoadLev(2);
}
// 场景加载完成，其他跟模型相关的操作最好在该时间完成后再进行
function MainSceDown(){
  g_isRealBIMMainSceLoad=true;
}

//刷新canvas
function resetCanvas(){
  Module.RealBIMWeb.ReleaseEmuMgr();
}

//倾斜摄影功能相关
//设置压平区域
function setUnverProjectionElem(){
  var projectdata = [{
                      "regionID":0,
                      "projectionHeight": 69.787872,
                      "regionVertex": [{
                                        "rvX": -283.394721,
                                        "rvY": -80.369242,
                                        "rvZ": 70.012639
                                      }, {
                                        "rvX": -290.763060,
                                        "rvY": -93.704232,
                                        "rvZ": 70.009294
                                      }, {
                                        "rvX": -283.061508,
                                        "rvY": -103.188372,
                                        "rvZ": 70.019713
                                      }, {
                                        "rvX": -264.259709,
                                        "rvY": -112.603966,
                                        "rvZ": 69.787872
                                      }, {
                                        "rvX": -239.995055,
                                        "rvY": -121.506031,
                                        "rvZ": 69.895732
                                      }, {
                                        "rvX": -235.690832,
                                        "rvY": -118.471519,
                                        "rvZ": 70.081059
                                      }, {
                                        "rvX": -228.389733,
                                        "rvY": -106.913007,
                                        "rvZ": 70.905273
                                      }, {
                                        "rvX": -223.604177,
                                        "rvY": -94.700768,
                                        "rvZ": 71.352220
                                      }, {
                                        "rvX": -244.695019,
                                        "rvY": -84.102831,
                                        "rvZ": 71.141721
                                      }, {
                                        "rvX": -257.671179,
                                        "rvY": -73.682003,
                                        "rvZ": 71.179379
                                      }, {
                                        "rvX": -258.697754,
                                        "rvY": -62.383920,
                                        "rvZ": 71.372017
                                      }, {
                                        "rvX": -266.579179,
                                        "rvY": -56.832482,
                                        "rvZ": 71.405544
                                      }, {
                                        "rvX": -273.566337,
                                        "rvY": -59.107102,
                                        "rvZ": 70.054413
                                      }]
                    },{
                      "regionID":1,
                      "projectionHeight": 70.060501,
                      "regionVertex": [{
                                        "rvX": -214.912194,
                                        "rvY": -97.293994,
                                        "rvZ": 71.395037
                                      }, {
                                        "rvX": -220.105558,
                                        "rvY": -102.822348,
                                        "rvZ": 71.350573
                                      }, {
                                        "rvX": -222.602532,
                                        "rvY": -114.954242,
                                        "rvZ": 76.688162
                                      }, {
                                        "rvX": -228.917114,
                                        "rvY": -121.699250,
                                        "rvZ": 70.103773
                                      }, {
                                        "rvX": -227.272362,
                                        "rvY": -124.799937,
                                        "rvZ": 70.060504
                                      }, {
                                        "rvX": -162.543152,
                                        "rvY": -143.969414,
                                        "rvZ": 71.099432
                                      }, {
                                        "rvX": -157.221731,
                                        "rvY": -127.423756,
                                        "rvZ": 70.341690
                                      }, {
                                        "rvX": -150.812707,
                                        "rvY": -102.831902,
                                        "rvZ": 71.421734
                                      }, {
                                        "rvX": -171.917546,
                                        "rvY": -100.233773,
                                        "rvZ": 71.562389
                                      }, {
                                        "rvX": -190.510019,
                                        "rvY": -105.434905,
                                        "rvZ": 71.629440
                                      }]
                      }];
  REsetUnverProjectData(projectdata);//表示所有压平区域的数据（json字符串）
}
//取消部分拍平区域
function someProjectionElemRemove(){
  var elemarr=[0];//表示要取消拍平区域的ID数组集合,为空则表示要取消所有拍平区域
  REremoveUnverProjectData(elemarr);
}
//取消所有拍平区域
function allProjectionElemRemove(){
  var elemarr = [];//表示要取消拍平区域的ID数组集合,为空则表示要取消所有拍平区域
  REremoveUnverProjectData(elemarr);
}
//重置部分拍平区域
function resetSomeProjectElem(){
  var elemarr=[0];//表示要重置拍平区域的ID数组集合,为空则表示要重置所有拍平区域
  REresetUnverProjectData(elemarr);
}
//重置所有拍平区域
function resetAllProjectElem(){
  var elemarr=[];//表示要重置拍平区域的ID数组集合,为空则表示要重置所有拍平区域
  REresetUnverProjectData(elemarr);
}

//设置单体化
function setUnverElem(){
  var projectdata = [{
                      "boxID":0,
                      "heightMax": 162.089587,
                      "heightMin": 69.622801,
                      "boxColor": "55ff00",
                      "boxAlpha": 127,
                      "pos": [{
                                "upX": -74.493920,
                                "upY": -314.030236,
                                "upZ": 70.023323
                              }, {
                                "upX": -80.349927,
                                "upY": -351.677428,
                                "upZ": 69.706076
                              }, {
                                "upX": -81.393920,
                                "upY": -375.998931,
                                "upZ": 71.187432
                              }, {
                                "upX": -75.667782,
                                "upY": -384.390648,
                                "upZ": 70.467917
                              }, {
                                "upX": -64.186665,
                                "upY": -388.167534,
                                "upZ": 74.829392
                              }, {
                                "upX": -44.544659,
                                "upY": -386.963759,
                                "upZ": 71.896163
                              }, {
                                "upX": -48.789590,
                                "upY": -360.509791,
                                "upZ": 71.803014
                              }, {
                                "upX": -41.382597,
                                "upY": -351.295907,
                                "upZ": 71.801544
                              }, {
                                "upX": -38.852230,
                                "upY": -314.042046,
                                "upZ": 71.732350
                              }, {
                                "upX": -55.678265,
                                "upY": -312.302521,
                                "upZ": 71.437438
                              }]
                    },{
                      "boxID":1,
                      "heightMax": 153.074477,
                      "heightMin": 69.661707,
                      "boxColor": "ff0000",
                      "boxAlpha": 127,
                      "pos": [{
                                "upX": -94.184070,
                                "upY": -395.339136,
                                "upZ": 70.326418
                              }, {
                                "upX": -51.117711,
                                "upY": -398.482750,
                                "upZ": 72.670719
                              }, {
                                "upX": -61.538926,
                                "upY": -433.355446,
                                "upZ": 73.103661
                              }, {
                                "upX": -68.424038,
                                "upY": -471.195057,
                                "upZ": 72.870659
                              }, {
                                "upX": -22.116828,
                                "upY": -473.163703,
                                "upZ": 73.357424
                              }, {
                                "upX": -19.832051,
                                "upY": -488.118579,
                                "upZ": 77.116038
                              }, {
                                "upX": -19.790925,
                                "upY": -501.183910,
                                "upZ": 72.434821
                              }, {
                                "upX": -97.083267,
                                "upY": -495.494605,
                                "upZ": 71.884467
                              }]
                    }];
  REsetUnverElemData(projectdata);//projectdata表示所有倾斜摄影单体化的数据（json字符串）
}
//高亮显示部分单体化区域(永久有效)
function showSomeUnverElem(){
  var elemarr = [0]; //表示要高亮的单体化区域的ID数组集合,为空则表示要高亮显示所有的单体化区域
REshowUnverElemData(elemarr);
}
//高亮显示所有单体化区域(永久有效)
function showAllUnverElem(){
  var elemarr = []; //表示要高亮的单体化区域的ID数组集合,为空则表示要高亮显示所有的单体化区域
REshowUnverElemData(elemarr);
}
// 取消高亮显示部分单体化区域 (永久有效)
function someHideUnverElem(){
  var elemarr = [0]; //表示要取消高亮的单体化区域的ID数组集合,为空则表示要取消所有高亮的单体化区域
REhideUnverElemData(elemarr);
}
//取消所有高亮的单体化区域(永久有效)
function allHideUnverElem(){
  var elemarr = [];//表示要取消高亮的单体化区域的ID数组集合,为空则表示要取消所有高亮的单体化区域
REhideUnverElemData(elemarr);
}
//添加部分单体化区域到选择集中
function addSomeToSelUElemIDs(){
  var elemarr = [0]; //表示要添加到单体化选择集的单体化区域的ID数组集合，为空则添加全部
  REaddToSelUElemIDs (elemarr);
}
//添加所有单体化区域到选择集中
function addAllToSelUElemIDs(){
  var elemarr = []; //表示要添加到单体化选择集的单体化区域的ID数组集合，为空则添加全部
  REaddToSelUElemIDs (elemarr);
}
//从选择集中移除部分单体化区域
function removeSomeFromSelUElemIDs(){
  var elemarr = [0]; //表示要移除的单体化区域的ID数组集合，为空则清空单体化选择集
  REremoveFromSelUElemIDs(elemarr);
}
//清空单体化选择集
function removeAllFromSelUElemIDs(){
  var elemarr = []; //表示要移除的单体化区域的ID数组集合，为空则清空单体化选择集
  REremoveFromSelUElemIDs(elemarr);
}
//获取当前单体化选择集的ID集合,以数组形式返回,Uint32Array类型
function getUnverElemIDs(){
  var selid = REgetUnverElemIDs();  
  console.log(selid);
}
// 设置选择集的颜色为白色半透
function setSelElemsAttr(){
  var clr = "000000"; //表示单体化的颜色
  var alpha = 250; //表示单体化的透明度，255表示不透明,0表示全透明
  REsetUnverElemClr(clr,alpha);
}

//天空盒控制
//启用天空盒
function useSkyBox(){
  REsetSkyEnable(true);
}
//禁用天空盒
function unUseSkyBox(){
  REsetSkyEnable(false);
}
//获取天空盒使用状态
function getSkyBoxState(){
  var bool = REgetSkyEnable();
  console.log(bool);
}
//设置天空盒背景颜色
function setSkyBoxClr(){
  var clr = "000000";
  REsetBackColor(clr);
}
//获取天空盒背景颜色
function getSkyBoxClr(){
  var clr = REgetBackColor();
  console.log(clr);
}

//设置地形透明度,范围[0,1]
function setUnverAlpha(){
  REsetUnVerInstsAlpha(0.5);
}
//隐藏UI
function hideUI(){
  REsetUIPanelVisible(0);
}
//显示UI
function showUI(){
  REsetUIPanelVisible(1);
}
//隐藏ViewCube
function hideViewCube(){
  REsetViewCubeVisible(0);
}
//隐藏ViewCube
function showViewCube(){
  REsetViewCubeVisible(1);
}

