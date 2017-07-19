// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './vuex/store';
import VueTouch from 'vue-touch';

Vue.use(VueTouch, {
    name: 'v-touch'
});

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

// 判断用户是否为登录状态
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.loginState) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});