<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Search</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container>
            <list :items="items" class="my-5" :load-more="pageInfo.hasNextPage" @load-more="loadItems(pageInfo.currentPage + 1)">
                <template slot="item" slot-scope="data">
                    <list-item
                        :title="data.item.title"
                        :subtitle="data.item.nickname || data.item.colorway"
                        :image="data.item.imageUrls && data.item.imageUrls[0]"
                        :route="{name: 'release-view', params: {id: data.item._id}}"
                        :left="{type: 'price', data: data.item.price}"
                        :right="{type: 'date', data: data.item.date, format: 'MMM DD'}"></list-item>
                </template>
            </list>
            <preloader class="text-center" v-if="loading"></preloader>
        </b-container>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    export default {
        data: () => ({
            items: null,
            filter: {
                time: moment().startOf('month').valueOf(),
                brand: null,
                brands: []
            },
            pageInfo: {
                itemCount: null,
                pageCount: null,
                currentPage: null,
                hasNextPage: null
            },
            loading: false
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
            loadItems(page = 1) {
                if (!this.loading) {
                    this.loading = true;
                    let vars = {
                        filter: {
                            $text: {$search: _.get(this.$route, 'query.q')},
                            isDeleted: {
                                $ne: true
                            }
                        }
                    };
                    this.$gql.request(`
                        query($filter:JSON){
                            ReleasePagination(filter: $filter, perPage: 20, page: ${page}) {
                                items {
                                    _id
                                    title
                                    date
                                    description
                                    price
                                    nickname
                                    colorway
                                    imageUrls
                                }
                                pageInfo {
                                    itemCount
                                    pageCount
                                    currentPage
                                    hasNextPage
                                }
                            }
                        }
                    `, vars)
                    .then(({ReleasePagination}) => {
                        this.pageInfo = ReleasePagination.pageInfo;
                        this.items = _.concat(this.items || [], ReleasePagination.items);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                }
            }
        },
        mounted() {
            this.loadItems();
        }
    };
</script>

<style lang="scss" scoped>
    .btn-sgray {
        &:hover {
            background-color: rgba(0, 0, 0, .1) !important;
        }
    }
</style>
