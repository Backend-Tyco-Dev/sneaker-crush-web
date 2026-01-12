import _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';

let loadPage = path => require(`@/pages/${path}/page.vue`).default;

let pages = {
	container: loadPage('container'),
	simple: loadPage('page-simple'),
	inverse: loadPage('page-inverse'),
	main: loadPage('main'),
	empty: loadPage('empty'),
	release: {
		list: loadPage('release/list'),
		view: loadPage('release/view')
	},
	catalog: {
		list: loadPage('catalog/list'),
		view: loadPage('catalog/view')
	},
	news: {
		list: loadPage('news/list'),
		view: loadPage('news/view')
	},
	store: loadPage('store'),
	account: {
		signin: loadPage('account/signin'),
		signup: loadPage('account/signup'),
		view: loadPage('account/view'),
		favorites: loadPage('account/favorites'),
		passwordForget: loadPage('account/password-forget'),
		passwordRecovery: loadPage('account/password-recovery')
	},
	promo: loadPage('promo'),
	search: loadPage('search'),
	error: {
		404: loadPage('error/404')
	}
};

Vue.use(Router);

const CONFIG = {
	mode: 'history',
	scrollBehavior: () => ({ x: 0, y: 0 }),
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: pages.simple,
			children: [
				{
					path: '',
					component: pages.main
				},
				{
					path: 'releases',
					component: pages.container,
					children: [
						{
							path: '',
							name: 'release-list',
							component: pages.release.list
						},
						{
							path: ':id',
							name: 'release-view',
							component: pages.release.view
						}
					]
				},
				{
					path: 'catalog',
					component: pages.container,
					children: [
						{
							path: '',
							name: 'catalog-list',
							component: pages.catalog.list
						},
						{
							path: ':id',
							name: 'catalog-view',
							component: pages.catalog.view
						}
					]
				},
				{
					path: 'news',
					component: pages.container,
					children: [
						{
							path: '',
							name: 'news-list',
							component: pages.news.list
						},
						{
							path: ':id',
							name: 'news-view',
							component: pages.news.view
						}
					]
				},
				{
					path: 'search',
					name: 'search',
					component: pages.search
				}
			]
		},
		{
			path: '/store',
			component: pages.inverse,
			children: [
				{
					path: '',
					name: 'store',
					meta: {header: 'inverse'},
					component: pages.store
				}
			]
		},
		{
			path: '/signin',
			component: pages.inverse,
			children: [
				{
					path: '',
					name: 'signin',
					meta: {header: 'inverse'},
					component: pages.account.signin
				}
			]
		},
		{
			path: '/signup',
			component: pages.inverse,
			children: [
				{
					path: '',
					name: 'signup',
					meta: {header: 'inverse'},
					component: pages.account.signup
				}
			]
		},
		{
			path: '/forget-password',
			component: pages.inverse,
			children: [
				{
					path: '',
					name: 'forget-password',
					meta: {header: 'inverse'},
					component: pages.account.passwordForget
				}
			]
		},
		{
			path: '/password-recovery',
			component: pages.inverse,
			children: [
				{
					path: '',
					name: 'password-recovery',
					meta: {header: 'inverse'},
					component: pages.account.passwordRecovery
				}
			]
		},
		{
			path: '/account',
			component: pages.simple,
			meta: {auth: true},
			children: [
				{
					path: '',
					name: 'account-view',
					component: pages.account.view
				},
				{
					path: 'favorites',
					name: 'account-favorites',
					component: pages.account.favorites
				}
			]
		},
		{
			path: '/promo',
			name: 'promo',
			meta: {header: 'promo'},
			component: pages.promo
		},
		{
			path: '/error',
			component: pages.container,
			children: [
				{
					path: '404',
					component: pages.error['404']
				}
			]
		},
		{
			path: '*',
			redirect: '/error/404'
		}
	]
};

let addBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		let logged = Vue.$viewer.logged;
		let routes = _.get(to, 'matched', []);
		let isNeedAuth = _.reduce(routes, (s, route) => s || _.get(route, 'meta.auth'), false);
		let isNoNeedAuth = _.reduce(routes, (s, route) => s || _.get(route, 'meta.auth') === false, false);
		if (isNeedAuth && !logged) {
			next({name: 'signin'});
			return;
		}
		if (isNoNeedAuth && logged) {
			next('/');
			return;
		}
		next();
	});
};

let router = new Router(CONFIG);
addBeforeEach(router);

export default router;
export function createRouter() {
	let router = new Router(CONFIG);
	addBeforeEach(router);
	return router;
};