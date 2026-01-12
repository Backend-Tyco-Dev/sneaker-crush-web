<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Releases</b>
                        </h2>
                    </b-col>
                    <b-col cols="auto" class="va">
                        <div class="vam text-white text-right text-uppercase font-weight-bold small va">
                            <div class="vam">
                                <!-- <i class="fa fa-dollar-sign mr-2"></i> -->
                                Currency converter
                            </div>
                            <currency-dropdown class="ml-2 ml-md-4 font-weight-bold text-white small vam"></currency-dropdown>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container>
            <div>
                <b-row class="my-4 flex-nowrap">
                    <b-col cols="" class="text-nowrap text-left">
                        <dropdown v-model="filter.brand" title="Brand" :items="filter.brands" @change="filterLoad()"></dropdown>
                        <datepicker v-model="filter.time" class="ml-4" @input="filterLoad()"></datepicker>
                    </b-col>
                    <b-col cols="auto" class="text-right">
                        <b-btn variant="link" class="text-dark btn-sgray" @click="changeListView('list')" v-if="listView == 'grid'">
                            <i class="fa fa-bars"></i>
                        </b-btn>
                        <b-btn variant="link" class="text-dark btn-sgray" @click="changeListView('grid')" v-if="listView == 'list'">
                            <i class="fa fa-th-large"></i>
                        </b-btn>
                    </b-col>
                </b-row>
            </div>
            <template v-if="popular && popular.length">
                <div class="mt-4">
                    <headline>
                        <div class="text-uppercase h5 mb-0">
                            <b>Popular</b> this month
                        </div>
                    </headline>
                    <slider-item :items="popular" class="mt-4">
                        <template slot="item" slot-scope="data">
                            <list-item
                                class="px-3"
                                :title="data.item.title"
                                :subtitle="data.item.nickname || data.item.colorway"
                                :image="data.item.imageUrls && data.item.imageUrls[0]"
                                :route="{name: 'release-view', params: {id: data.item._id}}"
                                :left="{type: 'price', data: data.item.price}"
                                :right="{type: 'date', data: data.item.date, format: data.item.hasUnknownDay ? 'MMM' : 'MMM DD'}"></list-item>
                            <div class="grad-purple line mt-1 mx-3"></div>
                        </template>
                    </slider-item>
                </div>
                <div class="grad-purple line my-5"></div>
            </template>
            <list :items="items" class="my-5" :load-more="pageInfo.hasNextPage" @load-more="loadItems(pageInfo.currentPage + 1)" :line="listView == 'list'">
                <template slot="block" slot-scope="data">
                    <list-item
                        :title="data.item.title"
                        :subtitle="data.item.nickname || data.item.colorway"
                        :image="data.item.imageUrls && data.item.imageUrls[0]"
                        :route="{name: 'release-view', params: {id: data.item._id}}"
                        :left="{type: 'price', data: data.item.price}"
                        :right="{type: 'date', data: data.item.date, format: data.item.hasUnknownDay ? 'MMM' : 'MMM DD'}"></list-item>
                </template>
                <template slot="line" slot-scope="data">
                    <list-release-item :item="data.item" :prev="data.items[data.index - 1]" :next="data.items[data.index + 1]"></list-release-item>
                </template>
                <template slot="other" slot-scope="data">
                    <template v-if="data.index % 23 == 0 && listView == 'grid' && !$store.getters.isMobile">
					    <b-col cols="6" sm="4" lg="3" class="d-inline-block mb-4 float-right">
						    <block-adwert type="quad"></block-adwert>
					    </b-col>
				    </template><template v-if="listView == 'list' ? data.index == 2 : data.index == 15">
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
    export default {
        data: () => ({
            popular: null,
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
                            isDeleted: {
                                $ne: true
                            }
                        }
                    };
                    let brand = this.filter.brand;
                    if (brand) {
                        vars.filter.brand = brand;
                    }
                    let time = this.filter.time;
                    if (time) {
                        let timeM = moment(time).add(5, 'd').utc();
                        vars.filter.date = {
                            $gte: timeM.startOf('month').valueOf(),
                            $lte: timeM.endOf('month').valueOf()
                        };
                    }
                    this.$gql.request(`
                        query($filter:JSON){
                            ReleasePagination(filter: $filter, sort:{date: 1, orderPriority: -1}, perPage: 20, page: ${page}) {
                                items {
                                    _id
                                    title
                                    date
                                    description
                                    price
                                    nickname
                                    colorway
                                    imageUrls
                                    hasUnknownDay
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
            },
            loadPopular() {
                let now = moment();
				let year = now.year();
				let month = now.month() + 1;
                this.$gql.request(`
                    query {
                        getPopular(type: "Release", year: ${year}, month: ${month}) {
                            ... on Release {
                                _id
                                title
                                nickname
                                date
                                price
                                imageUrls
                                colorway
                                hasUnknownDay
                            }
                        }
                        ModelBrands {
                            _id
                            title
                        }
                    }
                `).then(({getPopular, ModelBrands}) => {
                    this.popular = _.take(getPopular, 6);
                    this.filter.brands = _.concat([{text: 'All', value: null}], _.map(ModelBrands, brand => {
                        return {text: brand.title, value: brand._id};
                    }));
                });
            },
            filterLoad(value) {
                this.items = [];
                setTimeout(() => {
                    this.loadItems();
                });
            }
        },
        mounted() {
            this.loadPopular();
            this.loadItems();
        }
    };
</script>

<style lang="scss" scoped>
    .btn-sgray {
        &:hover {
            @media (min-width:576px) {
                background-color: rgba(0, 0, 0, .1) !important;
            }
        }
    }
</style>
