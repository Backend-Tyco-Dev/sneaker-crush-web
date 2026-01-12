import Vue from 'vue';
import _ from 'lodash';

const CURRENCIES = [
    {
        type: 'usd',
        value: 1,
        icon: 'dollar-sign',
        active: true,
        char: '$'
    }, // us dollar
    {
        type: 'eur',
        value: 0.87,
        icon: 'euro-sign',
        active: true,
        char: '€'
    }, // euro
    {
        type: 'gbp',
        value: 0.76,
        icon: 'pound-sign',
        active: true,
        char: '£'
    }, // uk pound
    {
        type: 'rub',
        value: 65.45,
        icon: 'ruble-sign',
        char: 'RUB'
    }, // ruble
    {
        type: 'kzt',
        value: 380,
        icon: 'tenge',
        char: 'KZT'
    }, // tenge
    {
        type: 'krw',
        value: 1110,
        icon: 'won-sign',
        char: 'KRW'
    }, // won
    {
        type: 'jpy',
        value: 108.79,
        icon: 'yen-sign',
        char: '¥'
    }, // yen
    {
        type: 'inr',
        value: 71,
        icon: 'rupee-sign'
    }, // rupee
    {
        type: 'ils',
        value: 3.66,
        icon: 'shekel-sign'
    }, // shekel
    {
        type: 'try',
        value: 5.22,
        icon: 'lira-sign'
    }, // turkish lira
    {
        type: 'uah',
        value: 27.62,
        icon: 'hryvnia'
    } // hryvnia
];

Vue.filter('currency', function(value) {
    let code = Vue.$store.state.ui.currency;
    let exchange = _.find(CURRENCIES, item => item.type == code);
    let str = Math.round(value * _.get(exchange, 'value', 1));
    return _.isNaN(str) ? value : str;
});

Vue.filter('currencyIcon', function() {
    let code = Vue.$store.state.ui.currency;
    let exchange = _.find(CURRENCIES, item => item.type == code);
    return 'fa-' + (_.get(exchange, 'icon') || '');
});

Vue.filter('currencyChar', function() {
    let code = Vue.$store.state.ui.currency;
    let exchange = _.find(CURRENCIES, item => item.type == code);
    return _.get(exchange, 'char') || '';
});

export default CURRENCIES;