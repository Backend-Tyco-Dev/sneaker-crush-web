import _ from 'lodash';
import Vue from 'vue';
import store from '@/modules/vue-vuex';
import gql from '@/modules/graphql';

class Viewer {
    constructor() {
        Vue.set(this, 'logged', false);
    }

    login(credentials) {
        return gql.request(
            `mutation($email: String, $password: String) {
                auth(email: $email, password: $password)
            }`,
            credentials
        ).then(data => {
            let auth = _.get(data, 'auth');
            let token = _.get(auth, 'token');
            let user = _.get(auth, 'user');
            if (token) {
                Vue.set(this, 'logged', true);
                this.token = token;
                this.user = user;
            }
        });
    }

    logout() {
        this.token = null;
        Vue.set(this, 'logged', false);
    }

    get token() {
        let token = store.state.token;
        if (token) {
            let bearer = `Bearer ${token}`;
            gql.setHeader('Authorization', bearer);
        }
        return token;
    }

    set token(value) {
        store.commit('setToken', value);
        let bearer = value ? `Bearer ${value}` : '';
        gql.setHeader('Authorization', bearer);
    }

    check() {
        return new Promise((resolve, reject) => {
            let token = this.token;
            if (token) {
                gql.request(`{self{username email}}`)
                    .then(data => {
                        let user = _.get(data, 'self');
                        Vue.set(this, 'logged', !!_.get(data, 'self'));
                        Vue.set(this, 'user', user);
                    }, () => {
                        Vue.set(this, 'logged', false);
                    })
                    .finally(() => {
                        resolve();
                    });
            } else {
                resolve();
            }
        });
    }
}

export default Vue.$viewer = Vue.prototype.$viewer = new Viewer();