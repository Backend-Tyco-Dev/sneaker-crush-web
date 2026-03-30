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
                <section class="section-intro py-3">
                    <p class="text-muted small mb-0">
                        Catalog pages group colorways and purchase links for this silhouette. For release timing and calendar updates, see the
                        <router-link :to="{name: 'release-list'}">releases</router-link>
                        section.
                    </p>
                </section>
                <div class="mt-4" v-if="item.description">
                    {{item.description}}
                </div>
                <p v-else class="text-muted mt-4 mb-0">
                    {{ catalogFallbackSummary }}
                </p>
                <list :items="item.colorways" class="my-5">
                    <template slot="item" slot-scope="data">
                        <rounded class="shadow h-100 responsive">
                            <prop :h="270" :v="210" class="bg-bg" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + $normalizeImageUrl(data.item.image) + ')'}">
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
    import moment from 'moment';

    const SITE_BASE = 'https://thesneakercrush.com';

    export default {
        metaInfo: function() {
            if (!this.seo.title) {
                return {title: 'Catalog'};
            }
            return {
                title: this.seo.title + ' | Sneaker Crush Catalog',
                meta: [
                    {vmid: 'description', name: 'description', content: this.seo.description},
                    {vmid: 'og:title', property: 'og:title', content: this.seo.title + ' | Sneaker Crush'},
                    {vmid: 'og:description', property: 'og:description', content: this.seo.description},
                    {vmid: 'og:url', property: 'og:url', content: SITE_BASE + this.$route.path}
                ]
            };
        },
        data: () => ({
            item: null,
            modals: {
                links: {
                    state: false,
                    items: null
                }
            },
            loading: true,
            seo: {
                title: '',
                description: ''
            }
        }),
        computed: {
            catalogFallbackSummary() {
                let s = this.item;
                if (!s) {
                    return '';
                }
                let year = s.date ? moment(s.date).format('YYYY') : '';
                let out = `${s.name} in the Sneaker Crush catalog.`;
                if (year) {
                    out += ` Added ${year}.`;
                }
                out += ' Browse colorways below or check upcoming drops in releases.';
                return out;
            }
        },
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
                this.item = Sneaker;
                if (Sneaker) {
                    this.seo.title = Sneaker.name;
                    this.seo.description = Sneaker.description
                        || _.truncate(this.catalogFallbackSummary, {length: 160, separator: ' '});
                }
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>