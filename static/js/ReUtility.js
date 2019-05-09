//场景初始化
function REinitSys(workerjspath,width,height,commonurl,username,password){
  var bool =Module.RealBIMWeb.CreateEmuMgr(workerjspath,"BlackHole",width, height, 
                                  false, 500, "/ModuleDir/", commonurl, "/ModuleDir/TempFile/", "/WebCache0001/", 
                                  username, password);
  return bool;
}

//获取当前js版本
function REgetJsVersion(){
  var ver =Module.RealBIMWeb.GetRealEngineVersion();
  return ver;
}

//设置渲染时引擎最大允许的内存占用空间(以MB为单位)
function REsetMaxResMemMB(val){
  Module.RealBIMWeb.SetMaxResMemMB(Module.RE_ResourceMgr_MEM.TOTAL, val);
}
//获取渲染时引擎最大允许的内存占用空间(以MB为单位)
function REgetMaxResMemMB(){
  var val =Module.RealBIMWeb.GetMaxResMemMB(Module.RE_ResourceMgr_MEM.TOTAL);
  return val;
}
//设置渲染时引擎建议分配的内存空间(以MB为单位)
function REsetExpectMaxInstMemMB(val){
  Module.RealBIMWeb.SetExpectMaxInstMemMB(Module.RE_SceneMgr_INST_QUOTA.HUGEMODEL, val);
}
//获取渲染时引擎建议分配的内存空间(以MB为单位)
function REgetExpectMaxInstMemMB(){
  var val =Module.RealBIMWeb.GetExpectMaxInstMemMB(Module.RE_SceneMgr_INST_QUOTA.HUGEMODEL);
  return val;
}
//设置模型每帧最大渲染面数
function REsetExpectMaxInstDrawFaceNum(val){
  Module.RealBIMWeb.SetExpectMaxInstDrawFaceNum(Module.RE_SceneMgr_INST_QUOTA.HUGEMODEL, val);
}
//获取模型每帧最大渲染面数
function REgetExpectMaxInstDrawFaceNum(){
  var val =Module.RealBIMWeb.GetExpectMaxInstDrawFaceNum(Module.RE_SceneMgr_INST_QUOTA.HUGEMODEL);
  return val;
}
//设置页面调度等级
function REsetPageLoadLev(val){
  Module.RealBIMWeb.SetPageLoadLev(val);
}
//获取页面调度等级
function REgetPageLoadLev(){
  var val =Module.RealBIMWeb.GetPageLoadLev();
  return val;
}
//设置每帧允许的最大资源加载总数
function REsetTotalResMaxLoadNum(val){
  if(val==0){
    Module.RealBIMWeb.SetTotalResMaxLoadNumPerFrame(0);
  }else if(val==1){
    Module.RealBIMWeb.SetTotalResMaxLoadNumPerFrame(0xffffffff);
  }
}
//获取每帧允许的最大资源加载总数
function REgetTotalResMaxLoadNum(){
  var val =Module.RealBIMWeb.GetTotalResMaxLoadNumPerFrame();
  return val;
}

//场景加载
function REloadMainSce(urlRes,projName,verinfo){
  var bool =Module.RealBIMWeb.LoadMainSce(urlRes, 
                                  "!(DefaultResRootDir)"+projName+"/total.xml", 
                                  "!(RealBIMTempFileCache)/cam001.camera", true);
  if(verinfo==""){
    ver ={m_sVer0:0x7fffffff, m_sVer1:-1, m_uVer0GolIDBias_L32:0, m_uVer0GolIDBias_H32:0, m_uVer1GolIDBias_L32:0, m_uVer1GolIDBias_H32:0};
  }else{
    ver ={m_sVer0:verinfo, m_sVer1:-1, m_uVer0GolIDBias_L32:0, m_uVer0GolIDBias_H32:0, m_uVer1GolIDBias_L32:0, m_uVer1GolIDBias_H32:0};
  }
  var verbool =Module.RealBIMWeb.SetSceVersionInfo(ver);
  return bool&&verbool;
}

//相机定位到构件ID集合
function REfocusCamTo(objarr,backdepth){
  var _s = objarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = objarr[i];
    elemIds.set([eleid,0], i*2);
  }
  Module.RealBIMWeb.FocusCamToSubElems("",elemIds.byteLength,elemIds.byteOffset,backdepth); //2.0表示相机后退的强度，可设置
}

//相机方位相关
function RElocateCamToDir(dirinfo){
  if(dirinfo=="default"){
    Module.RealBIMWeb.RestoreCamLocation();
  }else if(dirinfo=="top"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.TOP);
  }else if(dirinfo=="bottom"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.BOTTOM);
  }else if(dirinfo=="left"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.LEFT);
  }else if(dirinfo=="right"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.RIGHT);
  }else if(dirinfo=="front"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.FRONT);
  }else if(dirinfo=="back"){
    Module.RealBIMWeb.ResetCamToTotalSce(Module.RE_CAM_DIR.BACK);
  }
}

//获取当前相机方位
function REgetCamLocation(){
  var camloc = Module.RealBIMWeb.GetCamLocation();
  return camloc;
}

//调整相机到方位
function RElocateCamTo(pos,dir,deltime){
  Module.RealBIMWeb.LocateCamTo(pos,dir,deltime);
}

//颜色转换工具函数
function REclrFix(clr,clrpercent){
  var newclr01 = clr.substring(0,2); 
  var newclr02 = clr.substring(2,4); 
  var newclr03 = clr.substring(4,6); 
  var newclr = newclr03+newclr02+newclr01; 
  var intclrper = Math.round(clrpercent);
  var newclrper =(intclrper>15 ? (intclrper.toString(16)) : ("0"+intclrper.toString(16))); 
  var clrinfo ="0x"+newclrper+newclr; 
  var clr = parseInt(clrinfo);
  return clr;
}

//透明度转换工具函数
function REalphaFix(alpha,alphapercent){
  var intalphainfo =Math.round(alpha);
  var intalphaper =Math.round(alphapercent);
  var newalphainfo =(intalphainfo>15 ? (intalphainfo.toString(16)) : ("0"+intalphainfo.toString(16)));
  var newalphaper =(intalphaper>15 ? (intalphaper.toString(16)) : ("0"+intalphaper.toString(16)));
  var alphainfo ="0x"+newalphaper+newalphainfo+"ffff"; 
  var alpha = parseInt(alphainfo); 
  return alpha;
}

//改变构件集合颜色(永久)
function REsetElemClr(objarr,newclr,newclrpercent,newalpha,newalphapercent){
  var clr = REclrFix(newclr,newclrpercent); 
  var alpha = REalphaFix(newalpha,newalphapercent);
  var _s = objarr.length;
  if(_s ==0){  //如果构件ID集合为空，则默认为改变所有构件的信息
    var _l = (16).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_l); clrs =Module.RealBIMWeb.GetHeapView_U32(0);
    clrs.set([0,0,alpha,clr], 0);
    Module.RealBIMWeb.SetHugeObjSubElemClrInfos("", 0xffffffff, clrs.byteOffset);
  }else{
    var _s01 = (_s*16).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_s01); clrs =Module.RealBIMWeb.GetHeapView_U32(0);
    for(i =0; i<_s; ++i)
    {
      var eleid = objarr[i];
      clrs.set([eleid,0,alpha,clr], i*4);
    }
    Module.RealBIMWeb.SetHugeObjSubElemClrInfos("", clrs.byteLength, clrs.byteOffset);
  }
}
//恢复构件集合颜色(永久)
function REresetElemClr(objarr){
  var clr = 0x000000ff;
  var alpha = 0x0080ffff;
  var _s = objarr.length;
  if(_s ==0){  //如果构件ID集合为空，则默认为改变所有构件的信息
    var _l = (16).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_l); clrs =Module.RealBIMWeb.GetHeapView_U32(0);
    clrs.set([0,0,alpha,clr], 0);
    Module.RealBIMWeb.SetHugeObjSubElemClrInfos("", 0xffffffff, clrs.byteOffset);
  }else{
    var _s01 = (_s*16).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_s01); clrs =Module.RealBIMWeb.GetHeapView_U32(0);
    for(i =0; i<_s; ++i)
    {
      var eleid = objarr[i];
      clrs.set([eleid,0,alpha,clr], i*4);
    }
    Module.RealBIMWeb.SetHugeObjSubElemClrInfos("", clrs.byteLength, clrs.byteOffset);
  }
}

//锚点设置相关
// 批量添加锚点
function REaddAnchors(ancinfo){
  tempanchors =new Module.RE_Vector_ANCHOR();
  for(i=0;i<ancinfo.length;++i){
    var tempobj ={
     m_strName: ancinfo[i].ancname, 
     m_vPos: ancinfo[i].pos, 
     m_cTexRegion: {
       m_strTexPath: ancinfo[i].picpath,
       m_qTexRect: [-32, 0, 0, 32],
       m_uTexClrMult: 0xffffffff,
       m_vMinTexUV: [0.0, 0.0],
       m_vMaxTexUV: [1.0, 1.0],
       m_uFrameNumU: 1,
       m_uFrameNumV: 1,
       m_uFrameStrideU: 32,
       m_uFrameStrideV: 32,
       m_fFrameFreq: 0.0,
     },
     m_cTextRegion: {
       m_strGolFontID: "RealBIMFont001",
       m_bTextWeight: false,
       m_strText: ancinfo[i].textinfo,
       m_uTextClr: 0xffffffff,
       m_uTextBorderClr: 0x80000000,
       m_qTextRect: [0, 0, 1, 1],
       m_uTextFmtFlag: (0x1/*TEXT_FMT_BOTTOM*/ | 0x8/*TEXT_FMT_LEFT*/ | 0x40/*TEXT_FMT_NOCLIP*/),
     }
    };
    tempanchors.push_back(tempobj);
  }
  var bool =Module.RealBIMWeb.AddAnchors(tempanchors);
  return bool;
}
//批量删除锚点
function REdelAnchors(arrancname){
  tempanchors = new Module.RE_Vector_Str();
  for(i=0;i<arrancname.length;++i){
    tempanchors.push_back(arrancname[i]);
  }
  var bool =Module.RealBIMWeb.DelAnchors(tempanchors);
  return bool;
}
//删除全部锚点
function REdelAllAnchors(){
  Module.RealBIMWeb.DelAllAnchors();
}
//获取系统中所有锚点总数
function REgetAnchorNum(){
  var ancnum =Module.RealBIMWeb.GetAnchorNum();
  return ancnum;
}
//获取某个锚点的信息
function REgetAnchorData(ancname){
  var ancdata =Module.RealBIMWeb.GetAnchor(ancname);
  return ancdata;
}
//获取系统中所有锚点信息
function REgetAllAnchorsData(){
  var allancdata =Module.RealBIMWeb.GetAllAnchors();
  return allancdata;
}

// 批量添加闪烁锚点
function REaddAnimAnchors(ancinfo){
  tempanchors =new Module.RE_Vector_ANCHOR();
  for(i=0;i<ancinfo.length;++i){
    var tempobj ={
     m_strName: ancinfo[i].ancname, 
     m_vPos: ancinfo[i].pos, 
     m_cTexRegion: {
       m_strTexPath: ancinfo[i].picpath,
       m_qTexRect: [-ancinfo[i].picwidth, 0, 0, ancinfo[i].picheight],
       m_uTexClrMult: 0xffffffff,
       m_vMinTexUV: [0.0, 0.0],
       m_vMaxTexUV: [1.0/ancinfo[i].picnum, 1.0],
       m_uFrameNumU: ancinfo[i].picnum,
       m_uFrameNumV: 1,
       m_uFrameStrideU: ancinfo[i].picwidth,
       m_uFrameStrideV: ancinfo[i].picheight,
       m_fFrameFreq: ancinfo[i].playframe,
     },
     m_cTextRegion: {
       m_strGolFontID: "RealBIMFont001",
       m_bTextWeight: false,
       m_strText: ancinfo[i].textinfo,
       m_uTextClr: 0xffffffff,
       m_uTextBorderClr: 0x80000000,
       m_qTextRect: [0, 0, 1, 1],
       m_uTextFmtFlag: (0x1/*TEXT_FMT_BOTTOM*/ | 0x8/*TEXT_FMT_LEFT*/ | 0x40/*TEXT_FMT_NOCLIP*/),
     }
    };
    tempanchors.push_back(tempobj);
  }
  Module.RealBIMWeb.AddAnchors(tempanchors);
}
//停止闪烁
function REstopAncAnim(ancname){
  var bool =Module.RealBIMWeb.SetShpObjInfo(ancname, {m_uRGBBlendInfo:0x00ffffff, m_uAlpha:0, m_uAlphaAmp:0, m_uForceAnimFrame:0, m_uProbeMask:1});
  return bool;
}

//标签相关
// TEXT_FMT_BOTTOM     =(1<<0),  //表示文字底部对齐
// TEXT_FMT_VCENTER    =(1<<1),  //表示文字竖向居中(优先级高于TEXT_FMT_BOTTOM)
// TEXT_FMT_TOP      =(1<<2),  //表示文字顶部对齐(优先级高于TEXT_FMT_VCENTER)
// TEXT_FMT_LEFT     =(1<<3),  //表示文字左对齐
// TEXT_FMT_HCENTER    =(1<<4),  //表示文字横向居中(优先级高于TEXT_FMT_LEFT)
// TEXT_FMT_RIGHT      =(1<<5),  //表示文字右对齐(优先级高于TEXT_FMT_HCENTER)
// TEXT_FMT_NOCLIP     =(1<<6),  //表示不裁剪掉文字超出给定矩形区域外的部分
// TEXT_FMT_SINGLELINE   =(1<<7),  //表示所有文字全部显示在一横行上，忽略所有的换行符以及TEXT_FMT_WORDBREAK属性
// TEXT_FMT_WORDBREAK    =(1<<8),  //若当前字符有一部分在给定矩形区域外的话，则强制换行显示该字符，避免字符横向超出矩形区域外
// 批量添加标签
function REaddTags(taginfo){
  var temptags =new Module.RE_Vector_TAG();
  var temptexregions =new Module.RE_Vector_SHP_TEX();
  var temptextregions =new Module.RE_Vector_SHP_TEXT();
  var _l = taginfo.data.length;
  var _h = 26; var _s = 3;
  for(i=0;i<_l;++i){
    temptexregions.push_back({
       m_strTexPath: taginfo.data[i].picpath,
       m_qTexRect: [-50, _h*(_l-i-1)+_s, -30, _h*(_l-i)-_s], 
       m_uTexClrMult: 0xffffffff,
       m_vMinTexUV: [0.0, 0.0],
       m_vMaxTexUV: [1.0, 1.0],
       m_uFrameNumU: 1,
       m_uFrameNumV: 1,
       m_uFrameStrideU: 0,
       m_uFrameStrideV: 0,
       m_fFrameFreq: 0.0,
     })  //纹理矩形区域在2维像素裁剪空间(Y轴向上递增)下相对于定位点的覆盖区域<左，下，右，上>
  }
  for(i=0;i<_l;++i){
    temptextregions.push_back({
       m_strGolFontID: "RealBIMFont001",
       m_bTextWeight: false,
       m_strText: taginfo.data[i].textinfo,
       m_uTextClr: 0xffffffff,
       m_uTextBorderClr: 0x80000000,
       m_qTextRect: [0, _h*(_l-i-1)+_s, 30, _h*(_l-i)-_s],
       m_uTextFmtFlag: ((1<<1)/*TEXT_FMT_VCENTER*/ | (1<<3)/*TEXT_FMT_LEFT*/ | (1<<6)/*TEXT_FMT_NOCLIP*/),
     });
  }
  var tempobj ={
   m_strName: taginfo.tagname, 
   m_vPos: taginfo.pos, 
   m_vBgMinSize: [150, 10],
   m_vBgPadding: [5, 5],
   m_uBgAlignX: 1,
   m_uBgAlignY: 1,
   m_vArrowOrigin: [0, 10],
   m_uBgColor: 0x80000000,
   m_arrTexContents: temptexregions,
   m_arrTextContents: temptextregions,
  };
  temptags.push_back(tempobj);
  var bool =Module.RealBIMWeb.AddTags(temptags);
  return bool;
}
//批量删除标签
function REdelTags(arrtagname){
  temptags = new Module.RE_Vector_Str();
  for(i=0;i<arrtagname.length;++i){
    temptags.push_back(arrtagname[i]);
  }
  var bool =Module.RealBIMWeb.DelTags(temptags);
  return bool;
}
//删除全部标签
function REdelAllTags(){
  Module.RealBIMWeb.DelAllTags();
}
//获取系统中所有标签总数
function REgetTagNum(){
  var tagnum =Module.RealBIMWeb.GetTagNum();
  return tagnum;
}
//获取某个标签的信息
function REgetAnchorData(tagname){
  var tagdata =Module.RealBIMWeb.GetTag(tagname);
  return tagdata;
}
//获取系统中所有标签信息
function REgetAllTagsData(){
  var alltagdata =Module.RealBIMWeb.GetAllTags();
  return alltagdata;
}

// 标注相关
//开始添加标注
function REaddMarkBegin(){
  var bool =Module.RealBIMWeb.BeginAddMark();  //进入创建标注的状态
  return bool;
}
//添加标注文字
function REaddMarkText(textdata){
  Module.RealBIMWeb.SetMarkText(textdata);
}
//获取当前标注信息
function REgetMarkData(){
  var markdata = new Uint8Array(Module.RealBIMWeb.GetMarkInfo());
  return markdata;
}
//结束添加标注
function REaddMarkEnd(){
  var bool =Module.RealBIMWeb.EndAddMark();
  return bool;  
}
//查看之前保存的标注信息，参数为之前保存的字符串
function REshowMark(markdata){
  var strmarkdata = markdata.byteLength.toString();
  Module.RealBIMWeb.ReAllocHeapViews(strmarkdata); data =Module.RealBIMWeb.GetHeapView_U8(0);
  data.set(markdata,0);
  Module.RealBIMWeb.ShowMarkInfo(data.byteLength,data.byteOffset);
}

// 电子围栏相关
//进入电子围栏编辑状态
function REeditFenceBegin(){
  Module.RealBIMWeb.EnterFenceEditMode(); //进入编辑电子围栏的状态
}
function REaddFenceBegin(){
  var bool =Module.RealBIMWeb.BeginAddFence(); //开始添加电子围栏，进入电子围栏编辑状态后可添加多个电子围栏
  return bool;
}
function REaddFenceEnd(){
  var bool =Module.RealBIMWeb.EndAddFence();  //结束当前电子围栏的添加，如果没有退出电子围栏编辑状态，可继续添加下一个
  return bool;
}
function REeditFenceEnd(){
  Module.RealBIMWeb.ExitFenceEditMode(); //退出编辑电子围栏的状态
}
// 设置添加电子围栏时的小提示图标
function REsetFenceEditPic(strpicpath){
  var temptexregions={
    m_strTexPath: strpicpath,
    m_qTexRect: [-32, 0, 0, 32],
    m_uTexClrMult: 0xffffffff,
    m_vMinTexUV: [0.0, 0.0],
    m_vMaxTexUV: [1.0, 1.0],
    m_uFrameNumU: 1,
    m_uFrameNumV: 1,
    m_uFrameStrideU: 32,
    m_uFrameStrideV: 32,
    m_fFrameFreq: 0.0
  };
  Module.RealBIMWeb.SetFencePotUniformIcon(temptexregions);
}
//获取当前所有电子围栏的顶点信息
function REgetFencePot(){
  var fenceinfo = Module.RealBIMWeb.GetSceFenceInfos();
  return fenceinfo;
}
//根据电子围栏的顶点和线的名称返回围栏的名称
function REgetFenceName(childname){
  var fencedata = Module.RealBIMWeb.GetShpObjExtInfo(shpproberet_norm.m_strSelShpObjName);
  if((fencedata.m_eType.value==3)||(fencedata.m_eType.value==4)){
    var fencename = fencedata.m_strParent;
    return fencename;
  }
}
//设置电子围栏的顶点信息
function REaddFenceByPot(fenceinfo){
  Module.RealBIMWeb.ExitFenceEditMode(); //必须退出编辑电子围栏的状态，才可设置所有围栏的信息
  for(i=0;i<fenceinfo.length;++i){
    fenceinfo[i].m_uClr = REclrFix(fenceinfo[i].m_uClr,fenceinfo[i].m_uAlpha);
    delete fenceinfo[i].m_uAlpha;
  }
  var tempfencepots = new Module.RE_Vector_FENCE_POT();
  for(i=0;i<fenceinfo.length;++i){
    tempfencepots.push_back(fenceinfo[i]);
  }
  var bool =Module.RealBIMWeb.SetSceFenceInfos(tempfencepots);
  return bool;
}
//删除一个围栏顶点
function REdelFencePot(fencepotname){
  Module.RealBIMWeb.EnterFenceEditMode(); //进入编辑电子围栏的状态
  var bool =Module.RealBIMWeb.DelFencePot(fencepotname);
  Module.RealBIMWeb.ExitFenceEditMode(); //退出编辑电子围栏的状态
  return bool;
}
//删除一个围栏
function REdelFence(fencename){
  Module.RealBIMWeb.EnterFenceEditMode(); //进入编辑电子围栏的状态
  var bool =Module.RealBIMWeb.DelFence(fencename);
  Module.RealBIMWeb.ExitFenceEditMode(); //退出编辑电子围栏的状态
  return bool;
}
//删除全部围栏
function REdelAllFences(){
  Module.RealBIMWeb.EnterFenceEditMode(); //进入编辑电子围栏的状态
  var bool =Module.RealBIMWeb.DelAllFences();
  Module.RealBIMWeb.ExitFenceEditMode(); //退出编辑电子围栏的状态
  return bool;
}

// 选择集合相关（选择集包含鼠标选中的构件ID集合，鼠标点击空白处，选择集自动清空）
// 设置选择集的颜色、透明度、探测掩码（即是否可以被选中）
// clr: 表示新的颜色
// clrpercent: 表示新的颜色所占的权重，255表示100%,0表示0%
// alpha: 表示新的透明度，255表示不透明，80表示半透明，0表示全透明
// alphapercent: 表示新的透明度所占的权重，255表示100%，0表示0%
// probemask : 0：表示选择集中的构件不可被选中，为1则表示可以被选中；
function REsetSelElemsAttr(clr,clrpercent,alpha,alphapercent,probemask){
  var tempclr01 = clr.substring(0,2); var clr01 = (parseInt(tempclr01,16)/255);
  var tempclr02 = clr.substring(2,4); var clr02 = (parseInt(tempclr02,16)/255);
  var tempclr03 = clr.substring(4,6); var clr03 = (parseInt(tempclr03,16)/255);
  var clrper = (clrpercent/255);
  var alphadata = (alpha/255);
  var alphaper = (alphapercent/255);
  var bool =Module.RealBIMWeb.SetSelElemsAttr({m_qClrBlend : [clr01,clr02,clr03,clrper], m_vAlphaBlend : [alphadata,alphaper], m_uProbeMask : probemask});
  return bool;
}
// 获取当前选择集的属性信息
function REgetSelElemsAttr(){
  var curattr =Module.RealBIMWeb.GetSelElemsAttr();
  return curattr;
}
// 获取当前选择集的构件ID集合,以数组形式返回，两两一组代表一个id的高32位和低32位
function REgetSelElemIDs(){
  selids =new Uint32Array(Module.RealBIMWeb.GetSelElemIDs());
  return selids;
}
// 往当前选择集合添加构件，参数为要添加的构件id集合
function REaddToSelElemIDs(objarr){
  var _s = objarr.length;
  if(_s ==0){
    Module.RealBIMWeb.AddToSelElemIDs(0xffffffff,elemIds.byteOffset); //添加全部构件,目前暂不支持
  }else{
    var _s01 = (_s*8).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
    for(i =0; i<_s; ++i)
    {
      var eleid = objarr[i];
      elemIds.set([eleid,0], i*2);
    }
    Module.RealBIMWeb.AddToSelElemIDs(elemIds.byteLength,elemIds.byteOffset);
  }
}
//从当前选择集合删除构件，参数为要删除的构件id集合
function REremoveFromSelElemIDs(objarr){
  var _s = objarr.length;
  if(_s ==0){
    Module.RealBIMWeb.RemoveFromSelElemIDs(0xffffffff,0); //删除全部构件
  }else{
    var _s01 = (_s*8).toString();
    Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
    for(i =0; i<_s; ++i)
    {
      var eleid = objarr[i];
      elemIds.set([eleid,0], i*2);
    }
    Module.RealBIMWeb.RemoveFromSelElemIDs(elemIds.byteLength,elemIds.byteOffset);
  }
}

//鼠标探测相关
//获取当前选中点相关参数
function REgetCurProbeRet(){
  proberet = Module.RealBIMWeb.GetCurProbeRet(Module.RE_PROBE_TYPE.POT);
  return proberet;
}
//获取当前拾取到的矢量(锚点、标签)相关信息
function REgetCurShpProbeRet(){
  shpproberet_norm =Module.RealBIMWeb.GetCurShpProbeRet(Module.RE_SHP_PROBE_TYPE.NORM);
  return shpproberet_norm;
}
//获取当前拾取到的UI相关信息(不常用)
function REgetCurUIShpProbeRet(){
  shpproberet_ortho =Module.RealBIMWeb.GetCurShpProbeRet(Module.RE_SHP_PROBE_TYPE.ORTHO);
  return shpproberet_ortho;
}

//获取剖切后的构件ID
function REgetClipID(deletecrosspart){
  var data = Module.RealBIMWeb.GetClippedElementIds(deletecrosspart);
  return data;
}
//获取剖面信息
function REgetClipData(){
  var data = Module.RealBIMWeb.GetSceneClippingInfo();
  return data;
}
//设置剖面信息
function REsetClipData(clipdata){
  var bool = Module.RealBIMWeb.SetSceneClippingInfo(clipdata);
  return bool;
}
//退出剖切
function REexitClip(){
  Module.RealBIMWeb.EndSceneClipping();
}

//倾斜摄影单体化相关接口
//设置倾斜摄影压平数据，参数为固定格式json字符串
function REsetUnverProjectData(unverprojectiondata){
  var jsonStr = JSON.stringify(unverprojectiondata);
  Module.RealBIMWeb.ParseUnverprojectInfo(jsonStr);
}
//取消拍平区域，参数为要取消的拍平区域id集合
function REremoveUnverProjectData(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.RemoveUnverprojectToSelection(elemIds.byteLength,elemIds.byteOffset);
}
//设置拍平区域，参数为要取消的拍平区域id集合
function REresetUnverProjectData(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.AddUnverprojectToSelection(elemIds.byteLength,elemIds.byteOffset);
}
//设置倾斜摄影单体化数据，参数为固定格式json字符串
function REsetUnverElemData(unverelemdata){
  var jsonStr = JSON.stringify(unverelemdata);
  Module.RealBIMWeb.ParseUnverelemInfo(jsonStr);
}
//高亮倾斜摄影单体化区域，参数为要查看的单体化id集合
function REshowUnverElemData(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.HighlightUnverelem(elemIds.byteLength,elemIds.byteOffset);
}
//取消高亮倾斜摄影单体化区域，参数为要隐藏的单体化id集合
function REhideUnverElemData(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.CancelHighlightUnverelem(elemIds.byteLength,elemIds.byteOffset);
}
//向选择集添加单体化区域，参数为要添加的单体化id集合
function REaddToSelUElemIDs(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.AddUnverelemsToSelection(elemIds.byteLength,elemIds.byteOffset);
}
//从选择集移除单体化区域，参数为要移除的单体化id集合
function REremoveFromSelUElemIDs(elemarr){
  var _s = elemarr.length;
  var _s01 = (_s*8).toString();
  Module.RealBIMWeb.ReAllocHeapViews(_s01); elemIds =Module.RealBIMWeb.GetHeapView_U32(0);
  for(i =0; i<_s; ++i)
  {
    var eleid = elemarr[i];
    elemIds.set([eleid,0], i);
  }
  Module.RealBIMWeb.RemoveUnverelemsToSelection(elemIds.byteLength,elemIds.byteOffset);
}
//获取单体化选择集ID
function REgetUnverElemIDs(){
  selids =new Uint32Array(Module.RealBIMWeb.GetSelectedUnverelemId());
  return selids;
}
//设置单体化区域选中颜色
//cn::u32 m_UnverelmSelectionColor = 0xff00ffff;
// clr ="FF0000"; //颜色
// alpha =25;  //透明度，255表示不透明，80表示半透明，0表示全透明
function REsetUnverElemClr(clr,alpha){
  var newclr01 = clr.substring(0,2); 
  var newclr02 = clr.substring(2,4); 
  var newclr03 = clr.substring(4,6); 
  var newclr = newclr03+newclr02+newclr01; 
  var intalphainfo =Math.round(alpha);
  var newalphainfo =(intalphainfo>15 ? (intalphainfo.toString(16)) : ("0"+intalphainfo.toString(16)));
  var clrinfo ="0x"+newalphainfo+newclr; 
  var clr = parseInt(clrinfo);
  Module.RealBIMWeb.SetUnverelemSelectionColor(clr);
}

//天空盒相关
//设置天空盒的启用状态
function REsetSkyEnable(bool){
  Module.RealBIMWeb.SetSkyEnable(bool);
}
//获取天空盒的启用状态
function REgetSkyEnable(){
  var bool = Module.RealBIMWeb.GetSkyEnable();
  return bool;
}
//设置天空盒的背景颜色
function REsetBackColor(clr){
  var tempclr01 = clr.substring(0,2); var clr01 = (parseInt(tempclr01,16)/255);
  var tempclr02 = clr.substring(2,4); var clr02 = (parseInt(tempclr02,16)/255);
  var tempclr03 = clr.substring(4,6); var clr03 = (parseInt(tempclr03,16)/255);
  var clrarr=[clr01,clr02,clr03];
  Module.RealBIMWeb.SetBackColor(clrarr);
}
//获取天空盒的背景颜色
function REgetBackColor(){
  var color= Module.RealBIMWeb.GetBackColor();
  return color;
}

//设置地形的透明度
function REsetUnVerInstsAlpha(val){
  var bool= Module.RealBIMWeb.SetUnVerInstsAlpha(val);
  return bool;
}

//设置引擎UI按钮面板是否可见
function REsetUIPanelVisible(bool){
  Module.RealBIMWeb.SetUIPanelVisible(bool);
}
//设置引擎右上方ViewCube是否可见
function REsetViewCubeVisible(bool){
  Module.RealBIMWeb.SetViewCubeVisibility(bool);
}