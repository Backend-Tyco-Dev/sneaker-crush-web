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
            <list :items="items" class="my-5" :load-more="pageInfo.hasNextPage" @load-more="loadPageScroll(pageInfo.currentPage + 1)">
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
                    <template v-if="data.index % 23 == 0 && !$store.getters.isMobile">
					    <b-col cols="6" sm="4" lg="3" class="d-inline-block mb-4 float-right">
						    <block-adwert type="quad"></block-adwert>
					    </b-col>
				    </template><template v-if="(data.index + 1) % 14 == 0">
                            <b-col cols="12" class="mb-3 float-left">
                                <block-adwert type="wide"></block-adwert>
                            </b-col>
                        </template>
                </template>
            </list>
            <preloader class="text-center" v-if="loading"></preloader>
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
