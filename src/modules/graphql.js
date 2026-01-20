import Vue from 'vue';
import { GraphQLClient } from 'graphql-request';
import api from '@/modules/api';

const OPTIONS = {};

if (SERVER) {
    OPTIONS.headers = {
        'x-secret': 'xDqkUbTE3B6KvSlEbKva1xopqMr9BR9bbwcY4+uGuRvpRyWiA60UTN5YkTCulD2x'
    };
}

// Construct GraphQL endpoint URL
const graphqlUrl = `${api}graphql/`;

// Debug logging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && DEBUG) {
    console.log('[GraphQL] Endpoint URL:', graphqlUrl);
    console.log('[GraphQL] Options:', OPTIONS);
}

export default Vue.$gql = Vue.prototype.$gql = new GraphQLClient(graphqlUrl, OPTIONS);