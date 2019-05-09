<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index"> 
                <template slot="title">{{subItem.title}}</template>
                <el-menu-item v-for="(three,i) in subItem.subs" :key="i" :index="three.index">
                  {{ three.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>  
          </el-submenu>
        </template> 
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>   
      </template> 
    </el-menu>
  </div>
</template>
<script>
import bus from "../../assets/js/bus"
import { generateTitle } from '../../utils/i18n.js'
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "首页"
        },
        {
          icon: "el-icon-lx-cascades",
          index: "form",
          title: "文档"
        },
        {
          icon: "el-icon-lx-copy",
          index: "tab",
          title: "图标"
        },
        // {
        //   icon: "el-icon-lx-calendar",
        //   index: "3",
        //   title: "组件",
        //   subs: [
        //     {
        //       index: "tableTree",
        //       title: "列表拖拽"
        //     },
        //     {
        //       index: "3-2",
        //       title: "头像上传",
        //       subs: [
        //         {
        //           index: "editor",
        //           title: "富文本编辑器"
        //         },
        //         {
        //           index: "markdown",
        //           title: "markdown编辑器"
        //         }
        //       ]
        //     },
        //     {
        //       index: "upload",
        //       title: "小组件"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-emoji",
        //   index: "icon",
        //   title: "自定义图标"
        // },
        // {
        //   icon: "el-icon-lx-favor",
        //   index: "charts",
        //   title: "schart图表"
        // },
        // {
        //   icon: "el-icon-rank",
        //   index: "6",
        //   title: "拖拽组件",
        //   subs: [
        //     {
        //       index: "drag",
        //       title: "拖拽列表"
        //     },
        //     {
        //       index: "dialog",
        //       title: "拖拽弹框"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "7",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "8",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "9",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "10",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // }
      ]
    };
  },
  created() {
    bus.$on("collapse", param => {
      this.collapse = param;
    });
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.sidebar {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0; 
  font-size: 0;
  overflow: hidden;
  /* z-index: 1001; */
}
/* .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0; 
  display: block;
  overflow-y: scroll;
} */
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
