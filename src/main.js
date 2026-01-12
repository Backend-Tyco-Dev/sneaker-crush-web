import Vue from 'vue';
Vue.config.productionTip = false;

import '@/modules/fontawesome';
import '@/modules/styles/main.scss';
// import '@/modules/vue-analytics';

import '@/components';

import '!!file-loader?name=[name].[ext]!@/sitemap.xml';
import '!!file-loader?name=[name].[ext]!@/robots.txt';

require('./app.js').default();

// Ads
import Ads from 'vue-google-adsense'
 
Vue.use(require('vue-script2'))
 
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
