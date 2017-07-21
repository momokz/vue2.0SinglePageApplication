<template>
    <div class="regist">
        <div class="regist-1">
            已有账号，
            <router-link to="/login">返回</router-link> 登录页
        </div>
        <ul class="regist-list">
            <li>
                <label for="">用户名：</label>
                <input type="text" v-model="username">
            </li>
            <li>
                <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="password">
            </li>
            <li>
                <button type="button" class="login-btn" @click="regist()">注册</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'regist',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        regist() {
            if (this.username == '' && this.password == '') {
                alert('请填写用户名及密码！');
                return;
            }
            window.localStorage.setItem('login', JSON.stringify({
                username: this.username,
                password: this.password
            }));
            this.$router.push({
                name: 'login'
            });
        }
    }
}
</script>
<style scoped>
.regist-1 {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
}
.regist-list {
    width: 300px;
    margin: 0 auto;
}
.regist-list li {
    height: 30px;
    line-height: 30px;
    overflow: auto;
    margin-top: 10px;
    overflow-y: hidden;
}
.regist-list li:last-child {
    text-align: center;
}
.regist-list li label {
    float: left;
    width: 50px;
}
.regist-list li input {
    box-sizing: border-box;
    display: inline-block;
    width: 200px;
    padding-left: 10px;
    line-height: 24px;
    border-radius: 10px;
    outline: none;
}
.login-btn {
    width: 50px;
    height: 30px;
    background: #93d2cf;
    border: none;
    display: inline-block;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    outline: none;
}
</style>