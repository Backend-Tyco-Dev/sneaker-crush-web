import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment';
import './moment-shortformat-fix';

const FORMAT_DATE = 'MM.DD.YYYY';
Vue.filter('date', function(value, format) {
    if (value && moment(value).isValid()) {
        return moment(value).utc().format(format || FORMAT_DATE);
    } else {
        return value || '';
    }
});

Vue.filter('ago', function(value, format, short) {
    let date = moment(value); // '2019-03-01T13:15:15+06:00'
    // console.log(date.format('YYYY MM DD HH mm'));
    return short ? date.short() : date.fromNow(); //date.isAfter(now) ? date.fromNow() : date.format(format || FORMAT_DATE);
});

Vue.filter('trunc', function(value, length) {
    return _.truncate(value, {length});
});

Vue.filter('ts', function(value) {
	let date = new Date(value);
	return !_.isNaN(date.getTime()) ? date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() : '';
});