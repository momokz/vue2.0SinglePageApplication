import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

Vue.use(Vuex);

const state = {
    music: null,
    loginState: JSON.parse(window.sessionStorage.getItem('loginState')) ? JSON.parse(window.sessionStorage.getItem('loginState')).loginState : false
        // loginState: false
};

const mutations = {
    ACTIVEMUSIC(state, music) {
        state.music = music;
    },
    SET_LOGIN(state, loginState) {
        state.loginState = loginState;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});