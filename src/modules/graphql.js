import Vue from 'vue';
import { GraphQLClient } from 'graphql-request';
import api from '@/modules/api';

const OPTIONS = {
    credentials: 'include',
    mode: 'cors'
};

if (SERVER) {
    OPTIONS.headers = {
        'x-secret': 'xDqkUbTE3B6KvSlEbKva1xopqMr9BR9bbwcY4+uGuRvpRyWiA60UTN5YkTCulD2x'
    };
}

export default Vue.$gql = Vue.prototype.$gql = new GraphQLClient(`${api}graphql/`, OPTIONS);