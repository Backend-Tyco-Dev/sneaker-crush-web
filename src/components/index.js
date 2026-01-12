import Vue from 'vue';
import _ from 'lodash';

_.each([
	'prop',
	'preloader',
	'nav-header',
	'nav-footer',
	's-button',
	's-input',
	'search-input',
	'slider-main',
	'block-popular',
	'block-adwert',
	'list-release-item',
	'headline',
	'dropdown',
	'datepicker',
	'release-small',
	'list-item',
	'rounded',
	'button-icon',
	'comment-list',
	'list',
	'currency-dropdown',
	'slider-image',
	'slider-item',
	'popular-small'
], name => {
    Vue.component(name, require(`./${name}.vue`).default);
});
