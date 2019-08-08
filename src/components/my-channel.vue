<template>
<!-- 把关于下拉频道的东西搬到了这个my-channel.vue里 -->
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MyChannel',
  props: ['value'],
  data () {
    return {
    //   myValue: null,//只是为了测试用的
      channelOptions: []
    }
  },
  watch: {

    // 监听一个属性的方式 total (newVal, oldVal) {}
    // 对象下的属性名'reqParams.channel_id'监听生成式的方法方式
    'myValue': function (newVal, oldVal) {
      if (newVal === '') {
        // axios 不会将参数提交给后台
        this.myValue = null
      }
    }
  },
  created () {
    //   获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      // 后端不支持 空字符问题
      if (val === '') val = null
      // 提交给父组件
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
