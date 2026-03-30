<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>News</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container>
            <section class="home-intro py-4 mb-0">
                <p class="lead text-dark mb-2">
                    Read footwear news, industry updates, and editorial coverage—each story opens on its own page with full text and discussion.
                </p>
                <p class="text-muted small mb-0">
                    Tracking drops? Use the <router-link :to="{name: 'release-list'}">releases</router-link> calendar or learn more <router-link :to="{name: 'about'}">about us</router-link>.
                </p>
            </section>
            <template v-if="popular && popular.length">
                <div class="mt-5">
                    <headline>
                        <div class="text-uppercase h5 mb-0">
                            <b>Popular news</b> this month
                        </div>
                    </headline>
                    <slider-item :items="popular" class="mt-4">
                        <template slot="item" slot-scope="data">
                            <list-item
                                class="px-3"
                                :title="data.item.title"
                                :desc="data.item.subtitle"
                                :image="data.item.image"
                                cover
                                :route="{name: 'news-view', params: {id: data.item._id}}"
                                :left="{type: 'ago', data: data.item.date, bypass: true}"
                                :right="{type: 'text', data: data.item.source}"></list-item>
                            <div class="grad-purple line mt-1 mx-3"></div>
                        </template>
                    </slider-item>
                    <!-- <list :items="popular" class="mt-4" slider>
                        <template slot="item" slot-scope="data">
                            <list-item
                                :title="data.item.title"
                                :desc="data.item.subtitle"
                                :image="data.item.image"
                                cover
                                :route="{name: 'news-view', params: {id: data.item._id}}"
                                :left="{type: 'ago', data: data.item.date}"
                                :right="{type: 'text', data: data.item.source}"></list-item>
                            <div class="grad-purple line mt-1"></div>
                        </template>
                    </list> -->
                </div>
                <div class="grad-purple line my-5"></div>
            </template>
            <list :items="items" class="my-5" :load-more="false" :loading="loading">
                <template slot="item" slot-scope="data">
                    <list-item
                        :title="data.item.title"
                        :desc="data.item.subtitle"
                        :image="data.item.image"
                        cover
                        :route="{name: 'news-view', params: {id: data.item._id}}"
                        :left="{type: 'ago', data: data.item.date, bypass: true}"
                        :right="{type: 'text', data: data.item.source}"></list-item>
                </template>
                <template slot="other" slot-scope="data">
				<template v-if="data.index % 36 == 0 && !$store.getters.isMobile">
					    <b-col cols="6" sm="4" lg="3" class="d-inline-block mb-4 float-right">
						    <block-adwert type="quad"></block-adwert>
					    </b-col>
				    </template><template v-if="(data.index + 1) % 22 == 0">
                            <b-col cols="12" class="mb-3 float-left">
                                <block-adwert type="wide"></block-adwert>
                            </b-col>
                        </template>
                </template>
            </list>
            <div class="text-center mb-4" v-if="items && items.length && pageInfo.hasNextPage">
                <s-button class="grad-purple px-5" :disabled="loading" @click="loadPageScroll(pageInfo.currentPage + 1)">
                    {{ loading ? 'Loading...' : 'Load More' }}
                </s-button>
            </div>
            <preloader class="text-center" v-if="loading && !(items && items.length)"></preloader>
        </b-container>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';

    const convert = content => {
        let div = document.createElement('div');
        div.innerHTML = content;
        return div.innerText;
    };

    export default {
        metaInfo: {
            title: 'Sneaker News',
            meta: [
                {
                    vmid: 'description',
                    name: 'description',
                    content: 'Sneaker news and editorial articles: release context, industry updates, and stories from Sneaker Crush.'
                },
                {vmid: 'og:title', property: 'og:title', content: 'Sneaker News | Sneaker Crush'},
                {
                    vmid: 'og:description',
                    property: 'og:description',
                    content: 'Sneaker news and editorial articles: release context, industry updates, and stories from Sneaker Crush.'
                },
                {vmid: 'og:url', property: 'og:url', content: 'https://thesneakercrush.com/news'},
                {
                    vmid: 'og:image',
                    property: 'og:image',
                    content: 'https://thesneakercrush.com/static/favicons/android-icon-192x192.png'
                },
                {
                    vmid: 'keywords',
                    name: 'keywords',
                    content: 'sneaker news, footwear news, Jordan news, release coverage, Sneaker Crush'
                }
            ]
        },
        data: () => ({
            popular: null,
            items: null,
            pageInfo: {
                itemCount: null,
                pageCount: null,
                currentPage: null,
                hasNextPage: null
            },
            loading: true
        }),
        computed: {
            listView() {
                return this.$store.state.ui.listView;
            }
        },
        methods: {
            changeListView(value) {
                this.$store.commit('changeListView', value);
            },
            loadPageScroll(page = 1) {
				if(!this.loading) {
					this.loadItems(page);
				}
			},
            loadItems(page = 1) {
                this.loading = true;
                this.$gql.request(`
                    query($filter:JSON){
                        ArticlePagination(filter: $filter, sort:{date: -1}, perPage: 20, page: ${page}) {
                            items {
                                _id
                                title
                                content
                                date
                                image
                                link
                                source
                            }
                            pageInfo {
                                itemCount
                                pageCount
                                currentPage
                                hasNextPage
                            }
                        }
                    }
                `, {
                    filter: {
                        isDeleted: {
                            $ne: true
                        }
                    }
                }).then(({ArticlePagination}) => {
                    this.pageInfo = ArticlePagination.pageInfo;
                    let items = _.map(ArticlePagination.items, item => {
                        return _.extend(item, {
                            subtitle: convert(item.content)
                        });
                    });
                    this.items = _.concat(this.items || [], items);
                }).finally(() => {
                    this.loading = false;
                });
            },
            loadPopular() {
                let now = moment();
				let year = now.year();
				let month = now.month() + 1;
                this.$gql.request(`
                    query {
                        getPopular(type: "Article", year: ${year}, month: ${month}) {
                            ... on Article {
                                _id
                                title
                                content
                                date
                                image
                                link
                                source
                            }
                        }
                    }
                `).then(({getPopular}) => {
                    let items = _.map(getPopular, item => {
                        return _.extend(item, {
                            subtitle: convert(item.content)
                        });
                    });
                    this.popular = _.take(items, 6);
                });
            }
        },
        mounted() {
            this.loadPopular();
            this.loadItems();
        },
        
    };
</script>
