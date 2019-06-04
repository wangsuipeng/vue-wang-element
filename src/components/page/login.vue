<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            label-position="left"
            class="login-form"
        >
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <span class="svg-container">
                    <i class="iconfont icon-gerenzhongxin"></i>
                </span>
                <el-input
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    name="username"
                    auto-complete="on"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima"></i>
                </span>
                <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    name="password"
                    auto-complete="on"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-button type="primary" style="width:100%;" @click="submitForm()">Sign in</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import { mapMutations } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            loading: false
        };
    },
    methods: {
        // ...mapMutations(["changeLogin"]),
        // submitForm() {
        //   this.$refs.loginForm.validate((valid) => {
        //     if (valid) {
        //       this.loading = true;
        //       localStorage.setItem('ms_username',this.loginForm.username)
        //       this.$router.push({path: '/dashboard'});// 登录成功后重新定向到首页
        //       console.log("登录成功~~~~！")
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   })
        // }
        submitForm() {
			let _this = this;
        	if (this.loginForm.username === "" ||  this.loginForm.password === "") {
        		this.$message({
        			message: "账号密码不能为空 ",
        			type: "warning"
        		});
        	} else {
        		this.$axios({
        		    method: "post",
        		    url: "bjupm/login",
        		    data: this.loginForm
        		}).then(result => {
					if (result.data.code === 200) {
						console.log(result.data.data[2])
						let userToken = result.data.data[2];
        		    	// 将用户token保存到vuex中
						// this.changeLogin({ Authorization: userToken });
						this.$store.dispatch("changeLogin",userToken)
        		    	this.$router.push({ path: "/dashboard" }); // 登录成功后重新定向到首页
        		    	this.$message({
        					message: '登陆成功',
        					type: 'success'
        				});
					} else if (result.data.code === 401) {
						this.$message.error('该用户已登录');
					}
        		})
        		.catch(err => {
        			this.$message({
        	    		message: "账号或密码错误 ",
        	    		type: "warning"
        	    	});
        		    console.log(err);
        		});
        	}
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style scoped>
.login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}
.login-container .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}
.login-container .el-input {
    width: 85%;
    height: 47px;
    margin-left: 40px;
}
.el-button {
    width: 85%;
    height: 47px;
    line-height: 1px;
    padding: 12px 5px 12px 15px;
}
.title {
    color: #fff;
    font-weight: bold;
    margin-left: 190px;
    margin-bottom: 20px;
}
.svg-container {
    position: absolute;
    left: 20px;
    top: 3px;
    color: #889aa4;
    vertical-align: middle;
    width: 3px;
    display: inline-block;
}
</style>
