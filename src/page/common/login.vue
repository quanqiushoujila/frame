<template>
  <div class="login-container main-container">
    <div class="main-wrapper">
      <h1 class="main-logo login-logo">
        <img src="~img/logo-login.png" alt="logo">
        <span>数据指挥控制中心</span>
      </h1>
      <div class="main-slogan">
        <h2>
          <span>为数据管理赋权</span><span>数据应用赋能</span><span>数据资产赋值</span>
        </h2>
        <p>规范编辑 / 智能管理 / 关联应用 / 共享开放</p>
      </div>
      <div class="login-box">
        <p class="error">{{errorMsg}}</p>
        <el-form ref="form"
          :model="dataForm"
          :rules="dataRule"
          status-icon
          @keyup.enter.native="dataFormSubmit()"
          label-width="0">
          <el-form-item prop="userName">
            <el-input v-model="dataForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="dataForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="dataForm.captcha" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="6">
                <img :src="captchaPath" alt="aptcha">
              </el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary" class="btn-block" :disabled="btnDisabled"  @click="dataFormSubmit()">登录</el-button>
        </el-form>
      </div>
      <footer class="copyright">国脉海洋信息发展有限公司 版权所有</footer>
    </div>
  </div>
</template>

<script>
import { login } from 'js/api'
export default {
  name: 'login',
  data () {
    return {
      errorMsg: '',
      btnDisabled: false,
      dataForm: {
        userName: '',
        password: '',
        captcha: ''
      },
      dataRule: {
        userName: [
          { required: true, message: '帐号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      captchaPath: ''
    }
  },
  created () {
    // this.getCaptcha()
  },
  methods: {
    // 提交表单
    dataFormSubmit () {
      this.errorMsg = ''
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnDisabled = true
          console.log('验证通过')
          login(this.dataForm).then((data) => {
            console.log('data', data)
            if (data && data.code === this.GLOBAL.SUCCESS) {
              this.$cookie.set('token', data.token)
              this.$router.replace({ name: 'mainIndex' })
            } else {
              this.errorMsg = data.msg
              this.dataForm.password = ''
              this.dataForm.captcha = ''
              this.btnDisabled = false
            }
          })
        } else {
          console.log('验证不通过')
          return false
        }
      })
    }
    // 获取验证码
    // getCaptcha () {
    //   this.captchaPath = this.$http.adornUrl(`captcha.jpg?`)
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .login-container {
    background: url('../../assets/img/bg-login.jpg') top no-repeat;
    .main-wrapper {
      .login-logo {
        span {
          padding: 10px 30px 18px;
          margin-left: 30px;
          font-weight: 400;
          border-left: 1px solid #50678e;
          color: #e4e4e4;
        }
      }
      .login-box {
        width: 300px;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
        .error {
          position: absolute;
          top: -40px;
          left: 0;
          color: $error;
          font-size: 16px;
        }
      }
      .copyright {
        width: 100%;
        text-align: center;
        padding: 50px 0 20px;
        color: #9aa8b7;
        position: relative;
        bottom: 20px;
      }
    }
  }
</style>
