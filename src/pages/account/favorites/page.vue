<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5 text-white">
                <h2 class="mb-0 font-weight-bold">
                    Favorites
                </h2>
            </b-container>
        </div>
        <b-container>
            <list :items="items" class="my-5" no-limit>
                <template slot="item" slot-scope="data">
                    <list-item
                        :title="data.item.title"
                        :subtitle="data.item.nickname || data.item.colorway"
                        :image="data.item.imageUrls && data.item.imageUrls[0]"
                        :route="{name: 'release-view', params: {id: data.item._id}}"
                        :left="{type: 'date', data: data.item.date, format: 'MMM DD'}">
                        <template slot="over">
                            <div class="fav-heart">
                                <i class="fa fa-heart grad-purple text"></i>
                            </div>
                        </template>
                    </list-item>
                </template>
                <template slot="other" slot-scope="data">
                    <template v-if="(data.index + 1) % 16 == 0">
                        <b-col cols="12" class="d-inline-block mt-4 float-right">
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
    export default {
        data: () => ({
            items: null,
            loading: true
        }),
        mounted() {
            this.$gql.request(`
                query{
                    getMyFavorites {
                        _id
                        title
                        description
                        nickname
                        colorway
                        date
                        imageUrls
                    }
                }
            `).then(({getMyFavorites}) => {
                // console.log(getMyFavorites);
                this.items = getMyFavorites;
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style lang="scss" scoped>
    .fav-heart {
        position: absolute;
        right: 12px;
        top: 10px;
    }
</style>
