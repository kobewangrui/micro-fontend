<template>
<div class="loginouter">
    <div class="loginDiv">
        <div class="leftLogin">
            <img src="../assets/loginlogo.png">
        </div>
        <div class="rightLogin">
            <p>信息管理平台</p>
        </div>
    </div>
    <h1 style="color:#fff;" @click="login">登录</h1>

</div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            login(){
                this.$emit('loginFun',true)
            },
        },
    }
</script>
<style lang="scss">
.loginouter{
    width: 100%;
    height: 100vh;
    background-image: url('../assets/bgimage.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .loginDiv{
        width: 920px;
        height: 460px;
        border: 1px solid #FFF;
    }
}
</style>
