<template>
	<div class="header" :class="{inverse: inverse}">
		<b-container>
			<b-row class="py-4 flex-nowrap">
				<b-col cols="3" md="4" class="d-block d-xl-none va">
					<div class="vam p-2" @click="toggle()">
						<!-- <i class="fa fa-bars fa-lg"></i> -->
						<i class="hm hm-menu hm-md align-middle" :class="{'white': inverse}"></i>
					</div>
				</b-col>
				<b-col cols="5" sm="6" md="4" xl="auto" class="va text-center text-xl-left">
					<router-link to="/" class="d-inline-block logo vam" :class="variant"></router-link>
				</b-col>
				<b-col cols="auto" sm="3" md="4" class="d-block d-xl-none text-right va text-nowrap">
					<div class="vam text-nowrap">
						<div class="btn btn-link va text-dark" @click="search()">
							<!-- <i class="fa fa-search vam"></i> -->
							<i class="hm hm-search hm-md vam" :class="{'white': inverse}"></i>
						</div>
						<router-link class="btn btn-link va text-dark" :to="{name: 'account-view'}">
							<!-- <i class="far fa-user vam"></i> -->
							<i class="hm hm-account hm-md vam" :class="{'white': inverse}"></i>
						</router-link>
					</div>
				</b-col>
				<b-col cols="auto" class="d-none d-xl-block" v-if="!promo">
					<router-link class="btn vam shadow-sm px-5 text-white" :class="{'wt text-dark': inverse, 'grad-purple': !inverse}" :to="{name:'promo'}">
						<small><b>Download The App</b></small>
					</router-link>
				</b-col>
				<b-col class="va text-right d-none d-xl-block text-nowrap">
					<router-link :to="{name: 'release-list'}" class="text-dark font-weight-bold vam mr-3">Releases</router-link>
					<router-link :to="{name: 'catalog-list'}" class="text-dark font-weight-bold vam mx-3">Catalog</router-link>
					<router-link :to="{name: 'news-list'}" class="text-dark font-weight-bold vam mx-3">News</router-link>
					<a href="http://sneakercrushshop.com" target="_blank" class="text-dark font-weight-bold vam ml-3">Store</a>
				</b-col>
				<b-col cols="auto" class="d-none d-xl-block">
					<search-input :inverse="inverse"></search-input>
				</b-col>
				<b-col cols="auto" class="va d-none d-xl-block pl-1">
					<template v-if="$viewer.logged">
						<b-dropdown variant="link" class="vam" right no-caret>
							<template slot="button-content">
								<!-- <i class="far fa-user vam text-dark" :class="{'white': inverse}"></i> -->
								<i class="hm hm-account align-middle" :class="{'white': inverse}"></i>
							</template>
							<b-dropdown-item :to="{name: 'account-view'}">Account</b-dropdown-item>
							<b-dropdown-item @click="logout()">Logout</b-dropdown-item>
						</b-dropdown>
					</template>
					<template v-if="!$viewer.logged">
						<router-link class="btn btn-link vam va text-dark" :to="{name: 'account-view'}">
							<!-- <i class="far fa-user vam" :class="{'white': inverse}"></i> -->
							<i class="hm hm-account vam" :class="{'white': inverse}"></i>
						</router-link>
					</template>
				</b-col>
			</b-row>
		</b-container>
		<div class="menu d-xl-none" :class="{show: show}">
			<b-container class="pb-3">
				<b-row>
					<b-col cols="12">
						<router-link :to="{name: 'release-list'}" class="text-dark font-weight-bold vam mx-2 py-2 d-inline-block" @click.native="toggle(false)">Releases</router-link>
					</b-col>
					<b-col cols="12">
						<router-link :to="{name: 'catalog-list'}" class="text-dark font-weight-bold vam mx-2 py-2 d-inline-block" @click.native="toggle(false)">Catalog</router-link>
					</b-col>
					<b-col cols="12">
						<router-link :to="{name: 'news-list'}" class="text-dark font-weight-bold vam mx-2 py-2 d-inline-block" @click.native="toggle(false)">News</router-link>
					</b-col>
					<b-col cols="12">
						<a href="http://sneakercrushshop.com" target="_blank" class="text-dark font-weight-bold vam mx-2 py-2 d-inline-block" @click.native="toggle(false)">Store</a>
					</b-col>
				</b-row>
				<b-row class="mt-3">
					<b-col>
                        <a href="https://play.google.com/store/apps/details?id=sneakercrush.mobile.sc" target="_blank" class="d-inline-block app google mr-3"></a><a href="https://itunes.apple.com/app/sneaker-crush-release-dates/id661034398" target="_blank" class="d-inline-block app apple"></a>
					</b-col>
				</b-row>
			</b-container>
			<div class="grad-purple line" v-if="!inverse"></div>
		</div>
		<b-modal v-model="modals.search.state" title="Search" hide-header hide-footer>
            <search-input wide></search-input>
        </b-modal>
	</div>
</template>

<script>
	import _ from 'lodash';
    export default {
		data: () => ({
			show: false,
			variant: null,
			inverse: null,
			promo: null,
			modals: {
				search: {
					state: false,
					items: null
				}
			}
		}),
		watch: {
			'$route.fullPath': function() {
				this.checkVariant();
			}
		},
		methods: {
			toggle(value) {
				this.show = typeof value == 'boolean' ? value : !this.show;
			},
			checkVariant() {
				this.variant = this.$route.meta.header;
				this.inverse = !!~['inverse', 'promo'].indexOf(this.variant);
				this.promo = this.variant == 'promo';
			},
			logout() {
				this.$viewer.logout();
				this.$router.push('/');
				this.$forceUpdate();
			},
			search() {
				let modal = this.modals.search;
				modal.state = true;
			}
		},
		mounted() {
			this.checkVariant();
			this.$root.$on('menu.hide', () => {
				this.toggle(false);
			});
			this.$root.$on('search.hide', () => {
				this.modals.search.state = false;
			});
		}
    };
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		z-index: 1000;
		font-size: 10pt;
		@media (max-width: 576px) {
			overflow: hidden;
		}
		// overflow: hidden;
		&.inverse {
			color: #fff;
			a:not(.dropdown-item), .btn {
				color: #fff !important;
				* {
					color: #fff !important;
				}
			}
			.wt {
				color: #1d2124 !important;
			}
		}
	}
	.menu {
		max-height: 0px;
		transition: max-height .4s;
		overflow: hidden;
		&.show {
			max-height: 220px;
		}
	}
	.logo {
        height: 30px;
        width: 186px;
        background-image: url('/static/logo-color.svg');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain;
		max-width: 100%;
		&.inverse {
			background-image: url('/static/logo-outline.svg');
		}
		&.promo {
			background-image: url('/static/logo-color.svg');
			@media (max-width: 1200px) {
				background-image: url('/static/logo-outline.svg');
			}
		}
	}
	.account-icon {
		display: inline-block;
		font-size: 0;
		&:before {
			content: '';
			display: inline-block;
			width: 1rem;
			height: 1rem;
            background-color: #000;
            mask-image: url('/static/account.svg');
			mask-size: contain;
			mask-repeat: no-repeat;
			mask-position: center center;
		}
		&.white {
			&:before {
				background-color: #fff;
			}
		}
	}
	.wt {
		background-color: rgba(255, 255, 255, .25);
	}
	.app {
        background-size: contain;
        background-repeat: no-repeat;
        height: 39px;
        &.google {
            width: 131px;
            background-image: url('/static/app-google.png');
        }
        &.apple {
            width: 116px;
            background-image: url('/static/app-apple.png');
        }
    }
</style>