<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号:">{{userForm.id}}</el-form-item>
            <el-form-item label="手机号:">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
   <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'

export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    // 拿个人用户信息
    this.getUserInfo()
  },
  methods: {
    // 自定义上传
    myUpload (result) {
      // 选择了图片后 执行当前函数
      // axios + FormData 提交图片
      const formdata = new FormData()
      formdata.append('photo', result.file)
      this.$http.patch('user/photo', formdata).then(res => {
        // 上传成功 res响应对象
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 更新本地存储
        store.setUser({ photo: this.userForm.photo })
        // 更新home的头像
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 此时获取的用户数据 和 本地保存呢的用户数据 不一致
    // 需要: 1. 同步后台的用户名 2. 同步本地的用户名
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    async saveUserInfo () {
      // patch 做修改的时候使用的请求方式 , 局部修改
      // put 做修改的时候使用的请求方式 , 完整修改
      await this.$http.patch('user/profile', {
        // 严格按照后台的要求传参
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      // 成功
      this.$message.success('保存设置成功')
      // 更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新HOME组件的用户名
      // 谁接收数据谁绑定事件
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style scoped lang='less'></style>
