import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const CONFIG = {
    plugins: SERVER ? [] : [
        createPersistedState({
            paths: ['storage', 'token', 'ui']
        })
    ],
    state: {
        token: null,
        storage: {},
        ui: {
            listView: 'grid',
            currency: 'usd'
        },
        isMobile: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        changeListView(state, value) {
            state.ui.listView = value;
        },
        currency(state, value) {
            state.ui.currency = value;
        },
        SET_MOBILE(state, is) {
            state.isMobile = is
        }
    },
    actions: {
        onIsMobile({ commit }) {
            commit('SET_MOBILE', window.innerWidth <= 1200);
        }
    },
    getters: {
        isMobile: state => state.isMobile
    }
};

export default Vue.$store = Vue.prototype.$store = new Vuex.Store(CONFIG);
