<template>
	<b-container>
		<slider-main :items="slider" v-if="slider && slider.length"></slider-main>
		<list :items="items" class="my-4" :load-more="true" @load-more="loadPageScroll()" :line-minus="3">
			<template slot="item" slot-scope="data">
				<list-item
					:title="data.item.title"
					:subtitle="data.item.subtitle"
					:image="data.item.image"
					:route="data.item.route"
					:left="data.item.left"
					:right="data.item.right"></list-item>
			</template>
			<template slot="other" slot-scope="data">
				<template v-if="data.index == 6">
					<b-col cols="6" sm="4" lg="3" class="d-inline-block mb-4 float-right">
						<block-popular :items="popular"></block-popular>
					</b-col>
				</template><template v-else-if="data.index % 23 == 0 && !$store.getters.isMobile">
					<b-col cols="6" sm="4" lg="3" class="d-inline-block float-right mb-4">
						<block-adwert type="quad"></block-adwert>
					</b-col>
				</template><template v-if="(data.index + 1) % 14 == 0">
					<b-col cols="12" class="d-inline-block mb-4 float-right">
						<block-adwert type="wide"></block-adwert>
					</b-col>
				</template>
			</template>
		</list>
		<preloader class="text-center" v-if="loading"></preloader>
	</b-container>
</template>

<script>
	import _ from 'lodash';
	import moment from 'moment';

	export default {
		metaInfo: {
			title: 'Sneaker Crush',
			meta: [
				{vmid: 'description', name: 'description', content: 'Stay up to date with the latest Sneaker news &amp; release dates with Sneaker Crush!'},
				{vmid: 'keywords', name: 'keywords', content: ''},
				{vmid: 'og:url', name: 'og:url', content: 'http://www.thesneakercrush.com'},
				{vmid: 'og:title', name: 'og:title', content: 'Sneaker Crush | Sneaker Media Giant | The Go To for all Nike &amp; Air Jordan News/Release Dates'},
				{vmid: 'og:description', name: 'og:description', content: 'Stay up to date with the latest Sneaker news &amp; release dates with Sneaker Crush!'},
			]
		},
		data: () => ({
			slider: [],
			items: null,
			popular: [],
			pageInfo: {
                itemCount: null,
                pageCount: null,
                currentPage: null,
                hasNextPage: null
			},
			releasesInfo: {},
			articlesInfo: {},
			stock: [],
			loading: true
		}),
		methods: {
			loadData() {
				let aPage = (this.articlesInfo.currentPage || 0) + 1;
				let rPage = (this.releasesInfo.currentPage || 0) + 1;
				this.loading = true;
				let rQuery = `
					ReleasePagination(filter: $filter, sort:{createdAt: -1}, perPage: 20, page: ${rPage}) {
						items {
							_id
							title
							date
							description
							price
							nickname
							colorway
							imageUrls
							createdAt
							brand {
								title
							}
						}
						pageInfo {
							itemCount
							pageCount
							currentPage
							hasNextPage
						}
					}`;
				let aQuery = `
					ArticlePagination(filter: $filter, sort:{createdAt: -1}, perPage: 20, page: ${aPage}) {
						items {
							_id
							title
							content
							date
							image
							link
							source
							createdAt
						}
						pageInfo {
							itemCount
							pageCount
							currentPage
							hasNextPage
						}
					}`;
                let query = ``;
				let aAvail = _.filter(this.stock, item => _.get(item, 'right.data') == 'News').length;
				let rAvail = _.filter(this.stock, item => _.get(item, 'right.data') == 'Release').length;
				if (aAvail < 20) {
					query += aQuery;
				}
				if (rAvail < 20) {
					query += rQuery;
				}
				new Promise((resolve) => {
					if (query) {
						this.$gql.request(`
							query($filter:JSON){
								${query}
							}
						`, {
							filter: {
								isDeleted: {
									$ne: true
								}
							}
						}).then(({ArticlePagination, ReleasePagination}) => {
							let stock = this.stock;
							if (ArticlePagination) {
								this.articlesInfo = ArticlePagination.pageInfo;
								let aItems = _.map(_.get(ArticlePagination, 'items'), item => {
									return {
										title: item.title,
										subtitle: item.source,
										image: item.image,
										route: {name: 'news-view', params: {id: item._id}},
										left: {type: 'ago', data: item.createdAt},
										right: {type: 'text', data: 'News'}
									};
								});
								stock = _.concat(stock, aItems);
							}
							if (ReleasePagination) {
								this.releasesInfo = ReleasePagination.pageInfo;
								let rItems = _.map(_.get(ReleasePagination, 'items'), item => {
									return {
										title: item.title,
										subtitle: item.nickname || item.colorway,
										image: _.get(item, 'imageUrls[0]'),
										route: {name: 'release-view', params: {id: item._id}},
										left: {type: 'ago', data: item.createdAt},
										right: {type: 'text', data: 'Release'}
									};
								});
								stock = _.concat(stock, rItems);
							}
							this.stock = _.orderBy(stock, [item => moment(item.left.data).valueOf()], ['desc']);
							// console.log(_.map(this.stock, 'left.data'));
							resolve();
						});
					} else {
						resolve();
					}
				}).then(() => {
					this.items = _.concat(this.items || [], _.take(this.stock, 20));
					this.stock = _.takeRight(this.stock, this.stock.length - 20);
					// console.log(this.stock);
					// console.log(_.map(this.stock, 'left.data'));
				})
				.finally(() => {
					this.loading = false;
				});
			},
			loadPageScroll() {
				let aPage = (this.articlesInfo.currentPage || 0) + 1;
				let rPage = (this.releasesInfo.currentPage || 0) + 1;
				
				if(!this.loading) {
					this.loadData();
				}
			},
      loadOther() {
				let now = moment();
				let year = now.year();
				let week = now.week();
                this.$gql.request(`
                    query($filterF: JSON) {
                        getPopularBoth(year: ${year}, week: ${week}) {
							__typename
							... on Article {
								_id
								date
								title
								source
								image
							}
							... on Release {
								_id
								title
								description
								nickname
								rdate: date
								price
								imageUrls
							}
						}
						Releases(filter:$filterF) {
							_id
							date
							title
							description
							imageUrls
							featuredOrderPriority
						}
						Articles(filter:$filterF) {
							_id
							date
							title
							source
							image
							featuredOrderPriority
						}
                    }
                `, {
					filterF: {
						featured: true,
						isDeleted: {$ne: true}
					}
				}).then(({getPopularBoth, Releases, Articles}) => {
					this.popular = _.take(_.map(getPopularBoth, item => {
						return item.__typename == 'Release' ? {
							to: {name: 'release-view', params: {id: item._id}},
							title: item.title,
							subtitle: item.nickname || item.colorway || '',
							image: _.get(item, 'imageUrls[0]')
						} : {
							to: {name: 'news-view', params: {id: item._id}},
							title: item.title,
							subtitle: item.source,
							image: item.image
						};
					}), 5);
					// this.slider = Releases;
					let sliderItems = _.concat([], 
						_.map(Releases, item => ({featuredOrderPriority: item.featuredOrderPriority, to: {name: 'release-view', params: {id: item._id}}, date: item.date, title: item.title, description: item.description, image: _.get(item, 'imageUrls[0]')})),
						_.map(Articles, item => ({featuredOrderPriority: item.featuredOrderPriority, to: {name: 'news-view', params: {id: item._id}}, date: item.date, title: item.title, description: item.source, image: item.image}))
					);
					this.slider = _.orderBy(sliderItems, [item => item.featuredOrderPriority || 0], ['desc']);
					// item => moment(item.date).valueOf(),
                });
			}
		},
		mounted() {
			this.loadData();
			this.loadOther();
		}
	};
</script>

<style lang="scss" scoped>
	
</style>
