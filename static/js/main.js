var Module = {
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
  g_projName = "res_kunyanglu_new";
  g_userName = localStorage.reusername;
  g_password = localStorage.repassword;
  g_urlRes = "https://www.bjblackhole.cn:8009/default.aspx?dir=url_res03&path=";
  g_commonUrlRes = "https://www.bjblackhole.cn:8009/default.aspx?dir=url_res03&path=res_gol001/";
  g_isRealBIMSysInit = false;   //场景初始化是否完成
  g_isRealBIMMainSceLoad = false;   //模型是否加载完成
  addanc=false; selanc=false; delanc=false; addanimanc=false; stopanim=false; //锚点功能测试相关
  addtag=false; seltag=false; deltag=false;  //标签功能测试相关
  getfencename=false; getfencepotname=false; delfencepot=false; delfence=false; //电子围栏功能测试相关
  //引擎监听事件相关
  document.addEventListener("RealEngineReady", RealBIMInitSys);
  document.addEventListener("RealBIMInitSys", RealBIMLoadMainSce);
  document.addEventListener("RealEngineRenderReady", showCanvas);
  document.addEventListener("RealBIMLoadMainSce", MainSceDown);
  document.addEventListener("RealBIMLocateCam", function(e){console.log("RealBIMLocateCam");});
  document.addEventListener("RealBIMSelModel", GetCurProbeRet);
  document.addEventListener("RealBIMSelShape", function(e){console.log("hahahahahahahh");});
  document.addEventListener("RealBIMUIEvent", GetCurUI);
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
  console.log("RealEngineReady!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  // 页面实时反馈窗口宽高给引擎
  g_re_em_window_width = window.innerWidth; 
  g_re_em_window_height = window.innerHeight;
  var workerjspath = "static/js/RealBIMWeb_Worker.js";
  var width = g_re_em_window_width; var height = g_re_em_window_height;
  var commonurl = g_commonUrlRes;
  var username = g_userName; var password = g_password;
  var username = "admin"; var password = "xiyangyang"; 
  REinitSys(workerjspath,width,height,commonurl,username,password);
}


//为了浏览效果，初始canvas是display:none;天空盒资源加载完成时，才显示canvas
function showCanvas(){
  document.getElementById('canvas').style.display="block";
  // document.getElementById('toolbar').style.display="block";
  Module.canvas.focus(); //为了解决键盘事件的冲突
}
//场景加载
function RealBIMLoadMainSce(){
    console.log("RealBIMInitSys!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    g_isRealBIMSysInit=true;
    var urlRes = g_urlRes; var projName = g_projName;
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
}
// 场景加载完成，其他跟模型相关的操作最好在该时间完成后再进行
function MainSceDown(){
  console.log("RealBIMLoadMainSce!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  g_isRealBIMMainSceLoad=true;
}

//刷新canvas
function resetCanvas(){
  Module.RealBIMWeb.ReleaseEmuMgr();
}

//获取当前点击的UI按钮
function GetCurUI(e){
  var btn = e.detail.btnid;
  console.log(btn);
}

//获取当前探测结果
function GetCurProbeRet(){
  proberet = REgetCurProbeRet(); console.log(proberet); //获取当前选中点相关参数 
  shpproberet_norm =REgetCurShpProbeRet();  //获取当前拾取到的矢量(锚点、标签)相关信息
  if(addanc ==true){  //在选择点添加锚点
    // ancname:锚点的名称(唯一标识)
    // pos：锚点的位置
    // picpath：锚点的纹理路径
    // textinfo：文字
    var ancinfo =[
          {
            "ancname":"anc01", 
            "pos":proberet.m_vSelPos,
            "picpath":"https://www.bjblackhole.com/css/img/test.png",
            "textinfo":"张三"
          }
        ];
    REaddAnchors(ancinfo);  //批量添加锚点
    addanc=false;
  }
  if(addanimanc ==true){  //在选择点添加闪烁锚点
    //ancname:锚点的名称(唯一标识)
    //pos：锚点的位置
    //picpath：锚点的纹理路径（图片规格要求：闪烁的锚点是通过将多张尺寸相同的图片，按照顺序排成一排拼接而成，依次显示）
    //picwidth:多张相同尺寸图片的宽度（像素）;
    //picheigh:多张相同尺寸图片的高度（像素）;
    //textinfo：文字
    //picnum:表示闪烁时循环播放的图片个数
    //playframe：表示闪烁的帧率，即1秒钟闪几下
    var ancinfo =[
          {
            "ancname":"anc01", 
            "pos":proberet.m_vSelPos,
            "picpath":"https://www.bjblackhole.com/css/img/anc_anim.png",
            "picwidth":32,
            "picheight":32,
            "textinfo":"张三",
            "picnum":6,
            "playframe":2
          }
        ];
    REaddAnimAnchors(ancinfo);  //批量添加锚点
    addanimanc=false;
  }
  if(stopanim ==true){
    var name = shpproberet_norm.m_strSelShpObjName;
    REstopAncAnim(name);
    stopanim =false;
  }
  if(delanc ==true){  //删除选中的锚点
    var arrancname=[];
    var name = shpproberet_norm.m_strSelShpObjName;
    arrancname.push(name);
    REdelAnchors(arrancname);  //删除锚点
    delanc=false;
  }
  if(addtag ==true){  //批量添加标签
    //tagname:标签的名称(唯一标识)
    //pos：标签的位置
    //data：标签的内容
    //data.picpath:标签每一行的图标路径
    //data.textinfo:标签每一行的文字信息
    var taginfo ={
        "tagname":"tag01", 
        "pos":proberet.m_vSelPos,
        "data":[{
                 "picpath":"https://www.bjblackhole.com/css/img/test.png",
                 "textinfo":"测试文字"
                },{
                 "picpath":"https://www.bjblackhole.com/css/img/test.png",
                 "textinfo":"tag002测试文字"
                },{
                 "picpath":"https://www.bjblackhole.com/css/img/test.png",
                 "textinfo":"tag003测试文字"
                },{
                 "picpath":"https://www.bjblackhole.com/css/img/test.png",
                 "textinfo":"tag004测试文字"
                }
               ]
        };
    REaddTags(taginfo);  //批量添加标签
    addtag=false;
  }
  if(deltag ==true){  //删除标签
    var arrtagname=[];
    var name = shpproberet_norm.m_strSelShpObjName;
    arrtagname.push(name);
    REdelTags(arrtagname);  //删除一个标签
    deltag=false;
  }
  if(selanc ==true){  //打印拾取的矢量名称
    console.log(shpproberet_norm.m_strSelShpObjName);
    selanc=false;
  }
  if(getfencename ==true){
    var fencename = REgetFenceName(shpproberet_norm.m_strSelShpObjName);
    console.log(fencename);
    getfencename =false;
  }
  if(getfencepotname==true){
    console.log(shpproberet_norm.m_strSelShpObjName);
    getfencepotname==false;
  }
}

//相机方位相关
//回到默认视角
function restoreCamLocation(){
  var direct ="default";
  RElocateCamToDir(direct);
}
function camDirFront(){
  var direct ="front"; //主视图
  RElocateCamToDir(direct);
}
function camDirBack(){
  var direct ="back"; //后视角
  RElocateCamToDir(direct);
}
function camDirLeft(){
  var direct ="left"; //左视角
  RElocateCamToDir(direct);
}
function camDirRight(){
  var direct ="right"; //右视角
  RElocateCamToDir(direct);
}
function camDirTop(){
  var direct ="top"; //俯视图
  RElocateCamToDir(direct);
}
function camDirBottom(){
  var direct ="bottom";  //底视图
  RElocateCamToDir(direct);
}
//相机定位到构件ID集合，并改变颜色和透明度(临时颜色)
function focusCamTo(){
  var objarr = [684,685,686,687];
  var backdepth = 2.0;
  REfocusCamTo(objarr,backdepth); //转动相机接口
  REaddToSelElemIDs(objarr); //把要查看的id集合加入到选择集中，则会自动变为选择集设置的颜色
}

//获取屏幕快照
function getCanvasImg(){
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
}

// 改变构件颜色和透明度(永久有效)
function setElemClr(){
  //var objarr = [684,685,686,687]; //表示要改变颜色的构件ID集合
  var objarr = []; //改变所有的构件颜色
  var newclr ="ffffff"; //表示新的颜色
  var newclrpercent =255; //表示新的颜色所占的权重，255表示100%,0表示0%
  var newalpha =180;  //表示新的透明度，255表示不透明，80表示半透明，0表示全透明
  var newalphapercent =255.000000;  //表示新的透明度所占的权重，255表示100%，0表示0%
  REsetElemClr(objarr,newclr,newclrpercent,newalpha,newalphapercent);
}
//恢复构件颜色和透明度(永久有效)
function resetElemClr(){
  // var objarr = [684,685,686,687]; //表示要改变颜色的构件ID集合
  var objarr = []; //改变所有的构件颜色
  REresetElemClr(objarr);
}

//锚点相关
// 添加锚点
function addAnchor(){
  addanc=true;
}
// 选择锚点
function selAnchor(){
  selanc=true;
}
// 删除锚点
function delAnchor(){
  delanc=true;
}
// 添加闪烁锚点
function addAnimAnchor(){
  addanimanc=true;
}
//停止闪烁
function stopAnim(){
  stopanim=true;
}

//标签相关
// 添加标签
function addTag(){
  addtag=true;
}
// 选择标签
function selTag(){
  seltag=true;
}
// 删除标签
function delTag(){
  deltag=true;
}

// 标注相关
//开始添加标注
function addMark(){
  REaddMarkBegin();  //进入创建标注的状态
}
//添加标注文字
function addMarkText(){
  var textdata = "标注测试hdgasjfsdkfhsdfkgvnksdfjbhvsjkdfhgvjkerghvfbzdjvb";
  REaddMarkText(textdata);
}
//保存当前创建的标注
function saveMark(){
  markdata = REgetMarkData();
  REaddMarkEnd();  //保存当前标注信息后可以退出创建标注的状态
}
function showMark(){
  REshowMark(markdata);  //查看之前保存的标注信息，参数为之前保存的字符串
}

// 电子围栏相关
// 开始编辑电子围栏
function editFenceBegin(){
  REeditFenceBegin(); //进入编辑电子围栏的状态
}
function addFenceBegin(){
  REaddFenceBegin(); //开始添加电子围栏，进入电子围栏编辑状态后可添加多个电子围栏
}
function addFenceEnd(){
  REaddFenceEnd();  //结束当前电子围栏的添加，如果没有退出电子围栏编辑状态，可继续添加下一个
}
function editFenceEnd(){
  REeditFenceEnd(); //退出编辑电子围栏的状态
}
//设置电子围栏小图标，可在任意时间设置
function setFencePic(){
  var strPicPath = "https://www.bjblackhole.com/css/img/test.png";
  REsetFenceEditPic(strPicPath);
}
//获取当前电子围栏的顶点信息
function getFencePot(){
  var fenceinfo = REgetFencePot();
  console.log(fenceinfo.size()); //顶点个数
  console.log(fenceinfo.get(0)); //第一个顶点的属性信息
}
// 设置电子围栏的顶点信息
function setFencePot(){
  //m_vPos：电子围栏的顶点位置
  //m_fHeight：当前顶点的高度
  //m_uClr:当前顶点的颜色
  //m_uAlpha:当前顶点的颜色的透明度，0表示全透明，255表示半透明
  //m_bIsFenceEndPot:是否是当前围栏的最后一个顶点
  var fenceinfo =[
      {
        "m_vPos":[110, -260, 4],
        "m_fHeight":5,
        "m_uClr":"0000ff",
        "m_uAlpha":100,
        "m_bIsFenceEndPot":false
      },{
        "m_vPos":[90, -190, 4],
        "m_fHeight":5,
        "m_uClr":"0000ff",
        "m_uAlpha":100,
        "m_bIsFenceEndPot":false
      },{
        "m_vPos":[63, -200, 4],
        "m_fHeight":5,
        "m_uClr":"0000ff",
        "m_uAlpha":100,
        "m_bIsFenceEndPot":false
      },{
        "m_vPos":[83, -270, 4],
        "m_fHeight":5,
        "m_uClr":"0000ff",
        "m_uAlpha":100,
        "m_bIsFenceEndPot":true
      }
    ];
  REaddFenceByPot(fenceinfo);
}
//获取一个围栏名称
function getFenceName(){
  getfencename =true;
}
//获取一个围栏顶点名称
function getFencePotName(){
  getfencepotname =true;
}
//删除一个围栏顶点
function delFencePot(){
  var potname = "test";
  REdelFencePot(potname);
}
//删除一个围栏
function delFence(){
  var fencename = "test";
  REdelFence(fencename);
}
//删除全部围栏
function delAllFence(){
  var bool =REdelAllFences();
}

// 选择集合相关
// 设置选择集的颜色、透明度、探测掩码（即是否可以被选中）
function setSelElemsAttr(){
  var clr = "000000"; //表示新的颜色为白色
  var clrpercent = 255; //表示新的颜色所占的权重，255表示100%,0表示0%
  var alpha = 200; //表示新的透明度，255表示不透明，80表示半透明，0表示全透明
  var alphapercent = 255; //表示新的透明度所占的权重，255表示100%，0表示0%
  var probemask = 0;//表示选择集中的构件不可被选中，为1则表示可以被选中；
  REsetSelElemsAttr(clr,clrpercent,alpha,alphapercent,probemask);
}
function getSelElemsAttr(){
  var seleleattr = REgetSelElemsAttr();  //获取当前选择集的属性信息
  console.log(seleleattr);
}
function getSelElemIDs(){
  var seleleid = REgetSelElemIDs();  // 获取当前选择集的构件ID集合,以数组形式返回，两两一组代表一个id的高32位和低32位
  var arrid =[];
  for(var i=0;i<seleleid.length;i+=2){
    arrid.push(seleleid[i]);
  }
  console.log(arrid); //输出ID数组
  console.log(arrid.join(",")); //输出ID数组组成的字符串，以逗号隔开
}
function addToSelElemIDs(){
  var objarr = [684,685,686,687];
  REaddToSelElemIDs(objarr);  //往当前选择集合添加构件，参数为要添加的构件id集合
}
function removeFromSelElemIDs(){
  // var objarr = [684,685,686,687];
  var objarr = [];
  REremoveFromSelElemIDs(objarr);  //从当前选择集合删除构件，参数为要删除的构件id集合,若为空，则删除全部id
}

//获取剖切的ID，包含交叉
function getClipIDWithCross(){
  var data = REgetClipID(0);
  console.log(data);
}
//获取剖切的ID，不包含交叉
function getClipID(){
  var data = REgetClipID(1);
  console.log(data);
}
//获取剖面信息
function getClipData(){
  tempclipdata = REgetClipData();
  console.log(tempclipdata);
}
//设置剖面信息
function setClipData(){
  REsetClipData(tempclipdata);
}
//退出剖切
function exitClip(){
  REexitClip();
}

//键盘输入法测试
function keytest(){
  document.getElementById("keytest").style.display = "block";
}

//查看当前渲染相关的参数
function paramtest(){
  var state =document.getElementById("output").style.display;
  if(state=="none"){
    document.getElementById("output").style.display="block";
    g_re_em_window_height = window.innerHeight-200;
  }else{
    document.getElementById("output").style.display="none";
    g_re_em_window_height = window.innerHeight;
  }
}

function testProjective(){
  var projectdata = [{
                      "regionID": 1,
                      "projectionHeight": 4.161781,
                      "regionVertex": [{
                        "rvX": 309.528188,
                        "rvY": -403.512072,
                        "rvZ": 4.161781
                      }, {
                        "rvX": 195.514054,
                        "rvY": -411.915087,
                        "rvZ": 4.196734
                      }, {
                        "rvX": 201.217554,
                        "rvY": -453.361633,
                        "rvZ": 4.187344
                      }, {
                        "rvX": 313.263392,
                        "rvY": -445.872984,
                        "rvZ": 4.186592
                      }]
                    }];
  var test = JSON.stringify(projectdata);
  Module.RealBIMWeb.ParseUnverprojectInfo(test);
}
