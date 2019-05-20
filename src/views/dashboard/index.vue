<template>
  <div class="container" ref="container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      border
    >
      <el-table-column align="center" prop="date" label="日期" sortable width="180"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
      <el-table-column align="center" prop label="地址">
        <div>{{increment}}</div>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      isCollapse: true,
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    // console.log(this.$router)
    console.log(
      `%c 后台 %c Detected Vue %cv1.5`,
      "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      "background:#41b883 ; padding: 1px;  color: #fff",
      "background:#ff0000; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff"
    );
  },
  beforeMount() {},
  mounted() {
    this.getData();
    setTimeout(() => {
      this.$store.dispatch("updateUserInfo", "22222");
    }, 2000);
  },
  updated() {},
  computed: {
    increment() {
      return this.$store.getters.updateUserInfo;
    }
  },
  methods: {
    getClick() {
      console.log(222);
    },
    getData() {
      this.$axios({
        url: "bjqualitymgt/quality/track/queryQualityInfo",
        method: "post",
        headers: {
          Authorization:
            "BINGJIANG eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiwxLDEsMS1bNCwgOCwgMV0iLCJleHAiOjE4MDM5NjY2MjJ9.xnkNY7RRj6wQnAXQYw6kH43MmogO1h8pPWkV3-9NVpNjYtzpMfxRLirYgwW96lJEnfXiglb_VuX1KDn-u5KwJw",
          currentProjectId: 45
        },
        data: {}
      })
        .then(result => {
          if (result.data.code == 200) {
            console.log(result.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.container {
  padding: 20px;
}
.box {
  width: 300px;
  height: 300px;
}
.box2 button:nth-child(1) {
  background-color: blue;
}
</style>
