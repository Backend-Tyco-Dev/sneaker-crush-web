import _ from 'lodash';
import Vue from 'vue';
import createApp from './app.js';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();
        const store = app.$store;

        router.push(context.url);

        context.meta = app.$meta();
        global.window = {
            location: {
                href: context.url
            }
        };

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            Promise.all(matchedComponents.map(component => {
                if (component.asyncData) {
                    let data = {
                        params: _.get(router, 'app.$route.params'),
                        $gql: Vue.$gql
                    };
                    return component.asyncData.call(component, data).then(() => {
                        store.state.current = _.omit(data, ['$gql']);
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(reject);
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
        }, reject);
    });
};