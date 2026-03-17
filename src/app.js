import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';
import { normalizeImageUrl } from '@/utils/imageUrl';

Vue.prototype.$normalizeImageUrl = normalizeImageUrl;

import '@/modules/vue-vuex';
import '@/modules/vue-meta';
import '@/modules/graphql';
import '@/modules/bootstrap';
import '@/modules/filters';
import '@/modules/vue-form-generator';
import '@/modules/vue-notification';
import '@/modules/vue-datepicker';
import viewer from '@/modules/viewer';
import '@/modules/adsense';

import '@/components';

export default () => {
    const router = createRouter();

    return viewer.check().finally(() => {
        const app = new Vue({
            router,
            render: h => h(App)
        });
    
        if (!SERVER) {
            router.afterEach(() => {
                app.$store.state.current = {};
            });
            if (window && window.__INITIAL_STATE__) {
                app.$store.replaceState(window.__INITIAL_STATE__)
            }
    
            app.$mount('#app');
        }
    });

    // eslint-disable-next-line no-undef, no-unreachable -- legacy: returns Promise; app/router used by SSR entry
    return { app, router };
};
