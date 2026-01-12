import Vue from 'vue';
// import { Card, Modal, Layout, Button } from 'bootstrap-vue/es/components';

// Vue.use(Card);
// Vue.use(Modal);
// Vue.use(Layout);
// Vue.use(Button);

if (!SERVER) {
    // let bContainer = require('bootstrap-vue/es/components/layout/container').default;
    // Vue.component('b-container', bContainer);

    // let bRow = require('bootstrap-vue/es/components/layout/row').default;
    // Vue.component('b-row', bRow);

    // let bCol = require('bootstrap-vue/es/components/layout/col').default;
    // Vue.component('b-col', bCol);

    // let bButton = require('bootstrap-vue/es/components/button/button').default;
    // Vue.component('b-btn', bButton);

    // let bModal = require('bootstrap-vue/es/components/modal/modal').default;
    // Vue.component('b-modal', bModal);

    // let bCard = require('bootstrap-vue/es/components/card/card').default;
    // Vue.component('b-card', bCard);

    // let bPagination = require('bootstrap-vue/es/components/pagination/pagination').default;
    // Vue.component('b-pagination', bPagination);

    // let bPaginationNav = require('bootstrap-vue/es/components/pagination-nav/pagination-nav').default;
    // Vue.component('b-pagination-nav', bPaginationNav);

    // let bAlert = require('bootstrap-vue/es/components/alert/alert').default;
    // Vue.component('b-alert', bAlert);

    let BootstrapVue = require('bootstrap-vue').default;
    Vue.use(BootstrapVue);
} else {
    let BootstrapVue = require('bootstrap-vue');
    Vue.use(BootstrapVue);
}

// import BootstrapVue from 'bootstrap-vue';
// Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';