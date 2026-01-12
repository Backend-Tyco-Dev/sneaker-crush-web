<template>
    <b-container>
        <template v-if="item">
            <prop :h="2" :v="1" class="bg-bg" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + item.image + ')'}"></prop>
            <b-row class="mt-3">
                <b-col class="text-muted small">
                    {{item.source}}
                </b-col>
                <b-col class="text-right small">
                    <i class="far fa-clock mr-2 grad-purple text"></i>{{item.date | ago}}
                </b-col>
            </b-row>
            <div class="mt-3">
                <b-row>
                    <b-col class="va">
                        <h5 class="vam mb-0">
                            <span class="text-uppercase">
                                <b>{{item.title}}</b>
                            </span>
                        </h5>
                    </b-col>
                    <b-col cols="auto">
                        <b-dropdown variant="link" class="vam" toggle-class="p-0" no-caret right>
                            <template slot="button-content">
                                <button-icon class="share btn-sm" icon="far fa-share-square"></button-icon>
                            </template>
                            <b-dropdown-item @click="share('facebook')">Facebook</b-dropdown-item>
                            <b-dropdown-item @click="share('twitter')">Twitter</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-row>
            </div>
            <div class="text-muted mt-3 content" v-html="item.content">
            </div>
            <b-row class="my-4">
                <b-col cols="12" lg="9" class="order-2 order-lg-1">
                    <headline>
                        <div class="text-uppercase font-weight-bold">
                            <div class="d-inline-block grad-purple comment-circle va text-center mr-2">
                                <div class="comment-icon bg-image-contain vam">
                                </div>
                                <div class="comment-count">
                                    {{commentInfo.itemCount}}
                                </div>
                            </div>Comments
                        </div>
                    </headline>
                    <comment-list v-model="comments" :id="item._id" type="Article"></comment-list>
                </b-col>
                <b-col cols="12" lg="3" class="order-1 order-lg-2">
                    <headline>
                        <div class="text-uppercase">
                            <div class="d-inline-block align-middle h40"></div><b>Popular</b> this week
                        </div>
                    </headline>
                    <b-row class="d-none d-lg-block">
                        <b-col cols="4" lg="12" v-for="(item, index) in popular" :key="index">
                            <release-small :item="item" :trunc="20"></release-small>
                        </b-col>
                    </b-row>
                    <slider-item :items="popular" class="d-block d-lg-none">
                        <template slot="item" slot-scope="data">
                            <release-small :item="data.item" :trunc="20"></release-small>
                        </template>
                    </slider-item>
                    <!-- <headline reverse>
                        <div class="text-uppercase">
                            <div class="d-inline-block align-middle h40"></div>See all of popular
                        </div>
                    </headline> -->
                </b-col>
            </b-row>
            <b-row class="my-4" v-if="related && related.length">
                <b-col>
                    <headline>
                        <div class="text-uppercase font-weight-bold h5 mb-0">
                            Related
                        </div>
                    </headline>
                    <list :items="related" class="mt-3" one-line>
                        <template slot="item" slot-scope="data">
                            <list-item
                                :title="data.item.title"
                                :desc="data.item.description"
                                :image="data.item.imageUrls && data.item.imageUrls[0]"
                                :route="{name: 'release-view', params: {id: data.item._id}}"
                                :left="{type: 'ago', data: data.item.date}"
                                :right="{type: 'date', data: data.item.date, format: 'MMM DD'}"></list-item>
                        </template>
                    </list>
                </b-col>
            </b-row>
        </template>
        <preloader class="text-center" v-if="loading"></preloader>
    </b-container>
</template>

<script>
    import _ from 'lodash';
    import fp from 'lodash/fp';
    import moment from 'moment';
    import social from '@/modules/social';

    const BUY_LINK_TYPES = {
        'nike': '/static/icon-nike.svg',
        'ebay': '/static/icon-ebay.svg',
        'footlocker': '/static/icon-footlocker.svg',
        'kicksusa': '/static/icon-kicksusa.svg'
    };

    export default {
        metaInfo: function() {
			return {
				title: this.seo.title,
				meta: [
					{vmid: 'description', name: 'description', content: this.seo.description},
					{vmid: 'keywords', name: 'keywords', content: this.seo.keywords},
					{vmid: 'og:title', name: 'og:title', content: this.seo.title},
					{vmid: 'og:description', name: 'og:description', content: this.seo.description},
					{vmid: 'og:image', name: 'og:image', content: this.seo.image}
				]
			};
		},
        data: () => ({
            item: null,
            comments: null,
            commentInfo: {
                itemCount: null,
                currentPage: null,
                hasNextPage: null
            },
            popular: null,
            related: null,
            loading: true,
            seo: {
                title: '',
                description: '',
                keywords: '',
                image: ''
            },
        }),
        methods: {
            share(type) {
                let item = this.item;
                let wparams;
                if (type == 'facebook2') {
                    wparams = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600';
                }
                let params = {
                    url: window.location.href,
                    cover: item.image,
                    // title: item.title,
                    desc: item.title + '\nSee more on Sneaker Crush here: snkcr.sh/2dDpWOC',
                    // backurl: window.location.href
                };
                // console.log(params);
                let url = social(type, params);
                window.open(url, '', wparams);
            },
            loadPopular() {
                let now = moment();
				let year = now.year();
				let week = now.week();
                this.$gql.request(`
                    query {
                        getPopular(type:"Release", year: ${year}, week: ${week}) {
                            ... on Release {
                                _id
                                title
                                description
                                nickname
                                date
                                price
                                imageUrls
                            }
                        }
                    }
                `).then(({getPopular}) => {
                    this.popular = _.take(getPopular, 5);
                });
            }
        },
        mounted() {
            this.loadPopular();
            this.$gql.request(`
                query($filter:JSON) {
                    Article(filter:$filter) {
                        _id
                        title
                        content
                        date
                        image
                        link
                        source
                        comments(sort:{timestamp:-1}, perPage: 5){
                            items {
                                _id
                                author{
                                    username
                                }
                                message
                                timestamp
                            }
                            pageInfo {
                                itemCount
                                currentPage
                                hasPreviousPage
                                hasNextPage
                            }
                        }
                        related(limit:4) {
                            _id
                            title
                            description
                            date
                            imageUrls
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
            }).then(({Article}) => {
                this.item = Article;
                if (Article) {
                    this.comments = Article.comments;
                    this.commentInfo = Article.comments.pageInfo;
                    this.related = Article.related;
                    this.$gql.request(`mutation{popularAddView(type:"Article", id:"${Article._id}")}`);

                    let seo = this.seo;
		        	seo.title = Article.title;
		        	// seo.description = ,
		        	// seo.keywords = '',
		        	seo.image = Article.image;
                }
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style lang="scss" scoped>
    .comment-circle {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        .comment-icon {
            width: 24px;
            height: 24px;
            background-image: url('/static/comment.svg');
        }
        .comment-count {
            display: inline-block;
            position: absolute;
            white-space: nowrap;
            top: -3px;
            left: 30px;
            background-color: #fff;
            color: #5c50bb;
            font-size: 7pt;
            box-shadow: 0 0 20px rgba(0, 0, 0, .3);
            padding: 2px 6px;
            border-radius: 100px;
        }
    }
    .h40 {
        height: 40px;
    }
    .share {
        background-color: #4091f9;
        padding-left: 4px !important;
    }
    .content {
        ::v-deep img {
            max-width: 100% !important;
            height: auto !important;
        }
    }
</style>
