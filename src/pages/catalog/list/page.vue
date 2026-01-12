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
            <list :items="items" class="my-5" :load-more="pageInfo.hasNextPage" @load-more="loadItems(pageInfo.currentPage + 1)">
                <template slot="item" slot-scope="data">
                    <list-item
                        :title="data.item.name"
                        :image="data.item.colorways && data.item.colorways[0] && data.item.colorways[0].image"
                        :route="{name:'catalog-view', params: {id: data.item._id}}"
                        :left="{type: 'year', data: data.item.date}"></list-item>
                </template>
                <template slot="other" slot-scope="data">
                    <template v-if="data.index == 11">
                        <b-col cols="12" class="mb-3">
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
    export default {
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
