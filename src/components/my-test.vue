<template>
  <div class="container">
    <!-- 插槽 如果不写名字 认为默认插槽 -->
    <!-- 给插槽取名字就是 具名插槽 -->
    <div class="header">header</div>
    <div class="content">
        <slot name="content" :msg="msg"></slot>
    </div>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
