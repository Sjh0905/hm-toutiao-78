<template>
    <div class="container">
        <el-card class="my-card">

        </el-card>

    </div>
</template>

<script>
export default {

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

    }
}
</style>
