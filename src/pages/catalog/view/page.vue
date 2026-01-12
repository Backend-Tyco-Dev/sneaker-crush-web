<template>
    <div>
        <template v-if="item">
            <div class="bg-light">
                <b-container class="py-5">
                    <b-row>
                        <b-col class="va">
                            <h2 class="text-dark vam mb-0">
                                <b>{{item.name}}</b>
                            </h2>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <b-container>
                <div class="mt-4">
                    {{item.description}}
                </div>
                <list :items="item.colorways" class="my-5">
                    <template slot="item" slot-scope="data">
                        <rounded class="shadow h-100 responsive">
                            <prop :h="270" :v="210" class="bg-bg" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + data.item.image + ')'}">
                                <slot name="over"></slot>
                            </prop>
                            <div class="p-3">
                                <div class="font-weight-bold text-uppercase mt-1 text-truncate">
                                    {{data.item.nickname}}
                                </div>
                                <div class="small" v-if="data.item.description">
                                    {{data.item.description | trunc(140)}}
                                </div>
                                <div class="text-center mt-3">
                                    <s-button class="text-white grad-purple" @click="open(data.item)">
                                        Buy now
                                    </s-button>
                                </div>
                            </div>
                        </rounded>
                    </template>
                </list>
                <preloader class="text-center" v-if="loading"></preloader>
            </b-container>
        </template>
        <b-modal v-model="modals.links.state" title="Links" ok-title="Close" ok-only>
            <div v-if="modals.links.items">
                <div v-for="(item, index) in modals.links.items" :key="index">
                    <a :href="item.url" target="_blank">
                        {{item.title || 'Unknown'}}
                    </a>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        data: () => ({
            item: null,
            modals: {
                links: {
                    state: false,
                    items: null
                }
            },
            loading: true
        }),
        methods: {
            open(item) {
                let links = item.links;
                if (_.isArray(links) && links.length > 1) {
                    let modal = this.modals.links;
                    modal.state = true;
                    modal.items = links;
                }
                if (_.isArray(links) && links.length == 1) {
                    window.open(links[0].url, '_blank');
                }
            }
        },
        mounted() {
            this.$gql.request(`
                query($filter:JSON){
                    Sneaker(filter:$filter) {
                        _id
                        name
                        description
                        date
                        colorways {
                            image
                            nickname
                            links {
                                url
                                title
                            }
                        }
                    }
                }
            `, {
                filter: {
                    _id: this.$route.params.id,
                    isDeleted: {
                        $ne: true
                    }
                }
            }).then(({Sneaker}) => {
                // console.log(Sneaker);
                this.item = Sneaker;
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>