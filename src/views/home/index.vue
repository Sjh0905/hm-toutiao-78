<template>
     <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
        <!-- logo -->
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <!-- 导航菜单 -->

        <!-- 导航菜单容器 -->
        <!-- default-active="2" 默认激活的菜单项 指定的其实就是菜单项的index属性的值-->
        <!-- 导航菜单容器 -->
        <!-- background-color="#545c64" 背景颜色 -->
        <!-- text-color="#fff" 文字颜色 -->
        <!-- active-text-color="#ffd04b" 激活文字颜色 -->
        <el-menu
           :collapse="isCollapse"
           :collapse-transition="false"
           :default-active="$route.path"
           background-color="#002033"
           text-color="#fff"
           active-text-color="#ffd04b"
           router>
           <!-- el-submenu 是菜单项包含子级菜单 -->
           <!-- el-menu-item 是菜单项不包含子级菜单 -->
           <el-menu-item index="/">
             <i class="el-icon-s-home"></i>
             <span slot="title">首页</span>
           </el-menu-item>
           <el-menu-item index="/article">
             <i class="el-icon-document"></i>
             <span slot="title">内容管理</span>
           </el-menu-item>
           <el-menu-item index="/image">
             <i class="el-icon-picture"></i>
             <span slot="title">素材管理</span>
           </el-menu-item>
           <el-menu-item index="/publish">
             <i class="el-icon-s-promotion"></i>
             <span slot="title">发布文章</span>
           </el-menu-item>
           <el-menu-item index="/comment">
             <i class="el-icon-chat-dot-round"></i>
             <span slot="title">评论管理</span>
           </el-menu-item>
           <el-menu-item index="/fans">
             <i class="el-icon-present"></i>
             <span slot="title">粉丝管理</span>
           </el-menu-item>
           <el-menu-item index="/setting">
             <i class="el-icon-setting"></i>
             <span slot="title">个人设置</span>
           </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 3. 再渲染 -->
            <img :src="photo" alt="">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- native是绑定原生事件的修饰符 -->
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <!-- 二级路由的出口  组件显示位置 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 1.先定义值
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 2. 再赋值
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换侧边栏到 收起与展开
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // click 绑定的是原生的dom对象,
    //  绑定在组件上会被认为是自定义事件, 组件内部没触发是无效事件
    //  可把click绑定在组件解析后的dom上使用事件修饰符native 绑定原生事件的修饰符
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除用户信息
      store.clearUser()
      // 跳转登录
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="less">
  .wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header{
    // border-bottom:1px solid #ddd;
     line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown{
      float: right;
      .el-dropdown-link{
        font-weight: bold;
      }
      img{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .logo{
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
  }
  .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 30px auto;
  }
  .el-menu {
      border-right: none;
  }
}
</style>
