<template>
    <div class="login">
        <ul>
            <li>
                <label for="">用户名：</label>
                <input type="text" v-model="username" :required="inputFlag">
            </li>
            <li>
                <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="password" :required="inputFlag">
            </li>
            <li>
                <button type="button" class="login-btn" @click="login()">登录</button>
                <button type="button" class="login-btn" @click="goRegist()">注册</button>
            </li>
        </ul>
        <hr>
        <div class="login-comment">
            <p>可以使用测试账号登录，用户名：test，密码：test</p>
            <p>或是注册自己的账号</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            inputFlag: true,
            logging: false
        }
    },
    methods: {
        login() {
            let loginUser = null;
            let loginPassword = null;
            if (!this.check({
                    username: this.username,
                    password: this.password
                })) {
                return;
            }
            let login = JSON.parse(window.localStorage.getItem('login'));
            if (login) {
                loginUser = login.username;
                loginPassword = login.password;
            }
            this.logging = true;
            if (this.username == 'test' && this.password == 'test' || this.username == loginUser && this.password == loginPassword) {
                window.sessionStorage.setItem('loginState', JSON.stringify({
                    loginState: true
                }));
                this.$store.dispatch('setLogin', true);
                this.$router.push({
                    name: 'movie'
                });
            } else {
                alert('用户名密码不匹配');
                this.logging = false;
            }
        },
        check(obj) {
            if (this.isEmpty(obj.username)) {
                alert('用户名不能为空');
                return false;
            }
            if (this.isEmpty(obj.password)) {
                alert('密码不能为空');
                return false;
            }
            return true;
        },
        isEmpty(val) {
            return val === '';
        },
        goRegist() {
            this.$router.push({
                name: 'regist'
            })
        }
    }
}
</script>
<style scoped>
.login ul {
    width: 300px;
    margin: 0 auto;
}
.login li {
    height: 30px;
    line-height: 30px;
    overflow: auto;
    margin-top: 10px;
    overflow-y: hidden;
}
.login li:last-child {
    text-align: center;
}
.login li label {
    float: left;
    width: 50px;
}
.login li input {
    box-sizing: border-box;
    display: inline-block;
    width: 200px;
    padding-left: 10px;
    line-height: 24px;
    border-radius: 10px;
    outline: none;
}
.login-comment {
    margin-top: 10px;
    text-align: center;
    line-height: 24px;
}
.login hr {
    margin: 15px 0;
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