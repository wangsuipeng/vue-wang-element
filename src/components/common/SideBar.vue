<template>
  <div class="sidebar"> 
    <logo :collapse="collapse" />
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
              <i :class="item.icon"></i>
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
            <i :class="item.icon"></i>
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
import Logo from '../common/Logo.vue'
export default {
  components: {Logo},
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
          icon: "el-icon-lx-wendang",
          index: "documentation",
          title: "文档"
        },
        {
          icon: "el-icon-lx-quanxiankuaizhuang",
          index: "2",
          title: "权限测试",
          subs: [
            {
              index: 'page',
              title: '页面权限'
            },
            {
              index: 'role',
              title: '角色权限'
            }
          ]
        },
        {
          icon: "el-icon-lx-biaoge",
          index: '3',
          title: 'Table',
          subs: [
            {
              index: 'complex-table',
              title: '综合Table'
            },
            {
              index: 'drag-table',
              title: '拖拽Table'
            }
          ]
        },
        {
          icon: "el-icon-lx-tab",
          index: 'tab',
          title: 'Tab',
        },
        {
          icon: "el-icon-lx-excel",
          index: '4',
          title: 'Excel',
          subs:[
            {
              index: 'export-excel',
              title: '导出 Excel'
            },
            {
              index: 'upload-excel',
              title: '上传 Excel'
            }
          ]
        },
        {
          icon: "el-icon-lx-zip",
          index: '5',
          title: 'Zip',
          subs:[
            {
              index: 'download',
              title: 'Export Zip'
            }
          ]
        },
        {
          icon: "el-icon-lx-zujian",
          index: '6',
          title: '组件',
          subs:[
            {
              index: 'tinymce',
              title: '富文本编辑器'
            },
            {
              index: 'avatar-upload',
              title: '头像上传'
            }
          ]
        },
        {
          icon: "el-icon-lx-tubiao",
          index: '7',
          title: '图表',
          subs:[
            {
              index: 'line',
              title: '折线图'
            },
            {
              index: 'cake',
              title: '饼形图'
            },
            {
              index: 'column',
              title: '柱形图'
            }
          ]
        },
        {
          icon: "el-icon-lx-pdf1",
          index: 'pdf',
          title: 'pdf',
        },
        {
          icon: "el-icon-lx-icon-test",
          index: '9',
          title: '错误页面',
          subs:[
            {
              index: '401',
              title: '401'
            },
            {
              index: '404',
              title: '404'
            }
          ]
        },
        {
          icon: "el-icon-lx-diqiu",
          index: 'i18n',
          title: '国际化',
        },
        {
          icon: "el-icon-lx-wailian",
          index: 'link',
          title: '外链',
        },
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
  /* width: 200px!important; */
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0; 
  font-size: 0;
  overflow: hidden;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  z-index: 1001;
}
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
