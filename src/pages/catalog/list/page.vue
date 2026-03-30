<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Catalog</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container>
            <section class="home-intro py-4 mb-0">
                <p class="lead text-dark mb-2">
                    Browse silhouettes and colorways in our catalog—reference pages for models and variants beyond a single drop date.
                </p>
                <p class="text-muted small mb-0">
                    For release timing and retailers, use <router-link :to="{name: 'release-list'}">releases</router-link>; for articles, see <router-link :to="{name: 'news-list'}">news</router-link>.
                </p>
            </section>
            <list :items="items" class="my-5" :load-more="pageInfo.hasNextPage" :loading="loading" @load-more="loadItems(pageInfo.currentPage + 1)">
                <template slot="item" slot-scope="data">
                    <list-item
                        :title="data.item.name"
                        :image="data.item.colorways && data.item.colorways[0] && data.item.colorways[0].image"
                        :route="{name:'catalog-view', params: {id: data.item._id}}"
                        :left="{type: 'year', data: data.item.date}"></list-item>
                </template>
                <template slot="other" slot-scope="data">
                    <template v-if="data.index == 18">
                        <b-col cols="12" class="mb-3">
                            <block-adwert type="wide"></block-adwert>
                        </b-col>
                    </template>
                </template>
            </list>
            <preloader class="text-center" v-if="loading && !(items && items.length)"></preloader>
        </b-container>
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        metaInfo: {
            title: 'Sneaker Catalog',
            meta: [
                {
                    vmid: 'description',
                    name: 'description',
                    content: 'Browse the Sneaker Crush catalog: silhouettes, colorways, and model reference pages.'
                },
                {vmid: 'og:title', property: 'og:title', content: 'Sneaker Catalog | Sneaker Crush'},
                {
                    vmid: 'og:description',
                    property: 'og:description',
                    content: 'Browse the Sneaker Crush catalog: silhouettes, colorways, and model reference pages.'
                },
                {vmid: 'og:url', property: 'og:url', content: 'https://thesneakercrush.com/catalog'},
                {
                    vmid: 'og:image',
                    property: 'og:image',
                    content: 'https://thesneakercrush.com/static/favicons/android-icon-192x192.png'
                },
                {
                    vmid: 'keywords',
                    name: 'keywords',
                    content: 'sneaker catalog, silhouettes, colorways, model reference'
                }
            ]
        },
        data: () => ({
            items: null,
            pageInfo: {
                currentPage: null,
                hasNextPage: null
            },
            loading: false
        }),
        methods: {
            loadItems(page = 1) {
                this.loading = true;
                this.$gql.request(`
                    query($filter:JSON){
                        SneakerPagination(filter: $filter, sort:{createdAt: 1, orderPriority: -1}, perPage: 1000, page: ${page}) {
                            items {
                                _id
                                name
                                date
                                colorways {
                                    image
                                }
                            }
                            pageInfo {
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
                })
                .then(({SneakerPagination}) => {
                    this.pageInfo = SneakerPagination.pageInfo;
                    this.items = _.concat(this.items || [], SneakerPagination.items);
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.loadItems();
        }
    };
</script>
