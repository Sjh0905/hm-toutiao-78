<template>
    <div class="container">
        <el-card class="my-card">
            <!-- logo -->
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 表单 -->
            <!-- el-form 表单容器 -->
            <!-- ref="form" 操作dom需要 -->
            <!-- :model="form" 绑定整个表单的数据对象 -->
            <!-- label-width="80px" 说明文字的宽度 -->
            <!-- el-form-item 表单项 代表每一项-->
            <!-- label="活动名称" 说明文字 -->
           <!--
               使用element-ui的组件套路, 根据需求去找组件, 参考提供的例子,分析它的原代码,
               遇见不认识的属性, 事件, 函数, 提供了详细的说明
            -->
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile"  placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
            <el-input v-model="loginForm.code"  placeholder="请输入验证码" style="width:236px; "></el-input>
            <el-button style='margin-left:10px'>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
            </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    //   自定义校验函数 声明在使用, 在return之前定义
    const checkMobile = (rule, value, callback) => {
      // 按照自己校验逻辑去校验值value即可
      // 手机格式 1开头, 第二位 3-9 最后 9 位数即可
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
      callback()
    }
    return {
      // 表单的数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '',
        code: ''
      },
      //   校验规则对象 , 在data函数中定义
      loginRules: {
        //   字段参考接口文档
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },

          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //   1. 对整个表单进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('success')
          //   2. 校验成功发起登录请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
            //   res 是响应对象 , res.data数据属于响应体
              this.$router.push('/')
                .catch(() => {
                //   请求失败 提示 手机号或验证码错误
                  this.$message.error('手机或验证码错误')
                })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
    width: 100%;
    height: 100%;
    position: absolute;
    // center / cover 背景图定位 / 背景图尺寸 cover 等比缩放铺满容器多余被剪裁  contian 等比缩放完全显示在当前容器, 可能会存在留白
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .my-card {
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        text-align: center;
        img {
            width: 200px;
            display: inline-block;
            margin: 0 auto;
        }

    }
}
</style>
