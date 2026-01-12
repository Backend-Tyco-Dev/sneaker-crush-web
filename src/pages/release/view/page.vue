<template>
    <b-container>
        <template v-if="item">
            <b-row>
                <b-col cols="12" lg="6">
                    <slider-image :items="item.imageUrls"></slider-image>
                </b-col>
                <b-col cols="12" lg="6">
                    <b-row class="mt-4">
                        <b-col class="text-muted">
                            {{item.nickname}}
                        </b-col>
                        <b-col cols="auto" class="h6">
                            <b-badge pill class="grad-purple vam mb-0 px-5 text-uppercase">
                                {{item.date | date(item.hasUnknownDay ? 'MMMM' : 'DD MMMM')}}
                            </b-badge>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="va">
                            <h4 class="vam mb-0">
                                <span class="text-uppercase">
                                    <b>{{item.title}}</b>
                                </span>
                            </h4>
                        </b-col>
                        <b-col cols="auto">
                            <button-icon class="fav btn-sm" :icon="{'far fa-heart': !item.isFavorite, 'fa fa-heart': item.isFavorite}" :loading="favloading" @click="favorite()">
                            </button-icon>
                            <b-dropdown variant="link" class="vam" toggle-class="p-0" no-caret right>
                                <template slot="button-content">
                                    <button-icon class="share btn-sm" icon="far fa-share-square"></button-icon>
                                </template>
                                <b-dropdown-item @click="share('facebook')">Facebook</b-dropdown-item>
                                <b-dropdown-item @click="share('twitter')">Twitter</b-dropdown-item>
                            </b-dropdown>
                            <b-dropdown variant="link" class="vam" toggle-class="p-0" no-caret right>
                                <template slot="button-content">
                                    <button-icon class="calendar btn-sm" icon="far fa-calendar-alt"></button-icon>
                                </template>
                                <b-dropdown-item @click="addToCalendar('google')">Google</b-dropdown-item>
                                <b-dropdown-item @click="addToCalendar('apple')">Apple</b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>
                    <div class="grad-purple text h4 d-inline-block font-weight-bold mt-2" v-if="item.price">
                        <!-- <i class="fa mr-1 grad-purple text" :class="$options.filters.currencyIcon()"></i><b>{{item.price | currency}}</b> -->
                        <b>
                            <span v-if="typeof item.price != 'string'" class="simple">{{$options.filters.currencyChar()}}</span>{{item.price | currency}}
                        </b>
                    </div>
                    <div class="text-muted mt-2" v-if="item.colorway">
                        {{item.colorway}}
                    </div>
                    <div class="text-muted mt-4" v-if="item.description">
                        {{item.description}}
                    </div>
                </b-col>
            </b-row>
            <b-row class="my-4">
                <b-col cols="12" lg="6" class="order-3 order-lg-1 mt-3 mt-lg-0">
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
                    <comment-list v-model="comments" :id="item._id" type="Release"></comment-list>
                </b-col>
                <b-col cols="12" lg="3" class="order-1 order-lg-2">
                    <headline>
                        <div class="text-uppercase font-weight-bold">
                            <div class="d-inline-block align-middle h40"></div>Retailer
                        </div>
                    </headline>
                    <div>
                        <b-row>
                            <b-col cols="12" sm="6" lg="12" v-for="(link, index) in item.buyLinks" :key="index">
                                <b-row class="mb-3">
                                    <b-col class="va text-center retailer">
                                        <prop v-if="link.icon" :h="5" :v="2" class="w-100 vam" inner-class="bg-image-contain" :inner-style="{backgroundImage: 'url(' + link.icon + ')'}">
                                        </prop>
                                        <div class="vam small" v-if="!link.icon">
                                            {{link.title}}
                                        </div>
                                    </b-col>
                                    <b-col class="va">
                                        <s-button class="grad-purple w-100 vam" @click="openLink(link)">
                                            Buy
                                        </s-button>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="small text-muted text-center my-3" v-if="item.buyLinks && !item.buyLinks.length">
                        Empty list.
                    </div>
                </b-col>
                <b-col cols="12" lg="3" class="order-2 order-lg-3">
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
                    <!-- <headline reverse class="d-none d-md-flex">
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
                                :subtitle="data.item.nickname || data.item.colorway"
                                :image="data.item.imageUrls && data.item.imageUrls[0]"
                                :route="{name: 'release-view', params: {id: data.item._id}}"
                                :left="{type: 'ago', data: data.item.createdAt}"
                                :right="{type: 'date', data: data.item.date, format: 'MMM DD'}"></list-item>
                        </template>
                    </list>
                </b-col>
            </b-row>
        </template>
        <preloader class="text-center" v-if="loading"></preloader>
        <!-- <b-modal v-model="modals.share.state" title="Share" hide-header hide-footer>
            <search-input wide></search-input>
        </b-modal> -->
    </b-container>
</template>

<script>
    import _ from 'lodash';
    import fp from 'lodash/fp';
    import moment from 'moment';
    import social from '@/modules/social';

    import { VCALENDAR, VEVENT } from 'ics-js';

    const ICON_DIR = '/static/retailers/';
    const BUY_LINK_TYPES = {
        // 'nike': '/static/icon-nike.svg',
        // 'ebay': '/static/icon-ebay.svg',
        // 'footlocker': '/static/icon-footlocker.svg',
        // 'kicksusa': '/static/icon-kicksusa.svg'

        'adidas': `${ICON_DIR}adidas.png`,
        'caliroots': `${ICON_DIR}caliroots.png`,
        'ebay': `${ICON_DIR}ebay.png`,
        'end': `${ICON_DIR}end.png`,
        'footlocker': `${ICON_DIR}footlocker.png`,
        'kicksusa': `${ICON_DIR}kicksusa.jpeg`,
        'nike canada': `${ICON_DIR}nike-canada.png`,
        'nike': `${ICON_DIR}nike.png`,
        'ruvilla': `${ICON_DIR}ruvilla.png`,
        'shoe palace': `${ICON_DIR}shoe-palace.png`,
        'sneakersnstuff': `${ICON_DIR}sneakernstuff.jpg`,
        'stadium goods': `${ICON_DIR}stadium-goods.jpeg`,
        'stockx': `${ICON_DIR}stockx.jpg`
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
            favloading: false,
            loading: true,
            cal: null,
            seo: {
                title: '',
                description: '',
                keywords: '',
                image: ''
            },
        }),
        methods: {
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
            },
            favorite() {
                if (this.$viewer.logged) {
                    if (!this.favloading) {
                        this.favloading = true;
                        let method = this.item.isFavorite ? 'unfavorite' : 'favorite';
                        this.item.isFavorite = !this.item.isFavorite;
                        this.$gql.request(`mutation{${method}(id:"${this.item._id}")}`)
                            .finally(() => {
                                this.favloading = false;
                            });
                    }
                } else {
                    let route = this.$route;
                    let back = {
                        name: route.name,
                        params: _.extend({}, route.params, {like: true})
                    };
                    this.$router.push({name: 'signin', params: {back: back}});
                }
            },
            share(type) {
                let item = this.item;
                let wparams;
                if (type == 'facebook2') {
                    wparams = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600';
                }
                let desc = `${moment(item.createdAt).format('MMM DD, YYYY')}\n${item.title}\n${item.nickname || item.colorway}\n$${item.price}\nDownload Sneaker Crush here: snkcr.sh/2dDpWOC`;
                // console.log(desc);
                let params = {
                    url: window.location.href,
                    cover: _.get(item, 'imageUrls[0]') || '',
                    title: item.title,
                    desc: desc,
                    // backurl: '' //window.location.href
                };
                // console.log(params);
                let url = social(type, params);
                window.open(url, '', wparams);
            },
            addToCalendar(type) {
                let item = this.item;
                if (item) {
                    let startEST = moment(item.date).startOf('day').add(9, 'hour').format('YYYYMMDDTHHmmss');
                    let endEST = moment(item.date).startOf('day').add(10, 'hour').format('YYYYMMDDTHHmmss');
                    let startUTC = moment(item.date).startOf('day').add(14, 'hour').format('YYYYMMDDTHHmmss') + 'Z';
                    let endUTC = moment(item.date).startOf('day').add(15, 'hour').format('YYYYMMDDTHHmmss') + 'Z';
                    switch(type) {
                        case 'apple':
                            let calText = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:The Sneaker Crush
CALSCALE:GREGORIAN
X-WR-CALNAME:The Sneaker Crush
X-ORIGINAL-URL:https://thesneakercrush.com
BEGIN:VEVENT
CREATED:${startEST}
UID:879798768
DTEND;TZID=America/New_York:${endEST}
DTSTART;TZID=America/New_York:${startEST}
DTSTAMP:${startEST}

SUMMARY:${item.title}
ORGANIZER:Sneaker News
URL;VALUE=URI:${window.location.href}
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
                            // let cal = this.cal = new VCALENDAR();
                            // cal.addProp('PRODID', 'The Sneaker Crush');
                            // cal.addProp('VERSION', 2)
                            // let event = new VEVENT();
                            // event.addProp('UID');
                            // event.addProp('DTSTAMP', start);
                            // event.addProp('DTSTART', start);
                            // event.addProp('DTEND', end);
                            // event.addProp('SUMMARY', item.title);
                            // event.addProp('URL', window.location.href);
                            // cal.addComponent(event);
                            let uri = 'data:text/calendar;charset=utf8,' + calText; //this.cal.toString();
                            let blob = new Blob([calText], {type: 'text/calendar'});

                            var link = document.createElement("a");
                            link.href = window.URL.createObjectURL(blob);
                            link.download = "thesneakercrush.ics";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            // window.open(uri);
                            break;
                        case 'google':
                            let url = `https://calendar.google.com/calendar/r/eventedit?text=${item.title}&ctz=America/New_York&dates=${startEST}/${endEST}&details=For+details,+link+here:+${window.location.href}`
                            window.open(url);
                            break;
                    }
                }
            },
            openLink(link) {
                if (link.link) {
                    window.open(link.link);
                }
            }
        },
        mounted() {
            this.loadPopular();
            this.$gql.request(`
                query($filter:JSON) {
                    Release(filter:$filter) {
                        _id
                        title
                        date
                        description
                        price
                        nickname
                        colorway
                        imageUrls
                        isFavorite
                        hasUnknownDay
                        buyLinks {
                            link
                            title
                        }
                        related(limit:4) {
                            _id
                            title
                            nickname
                            colorway
                            date
                            imageUrls
                            createdAt
                        }
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
                    }
                }
            `, {
                filter: {
                    _id: this.$route.params.id,
                    isDeleted: {
                        $ne: true
                    }
                }
            }).then(({Release}) => {
                this.item = Release;
                this.loading = false;
                if (Release) {
                    Release.buyLinks = _.map(Release.buyLinks, item => {
                        let title = _.toLower(item.title || '');
                        let icon = fp.flow(
                                fp.toPairs,
                                fp.map(v => [v[0], v[1], ~title.indexOf(v[0])]),
                                fp.orderBy(['2'], ['desc']),
                                fp.filter(item => item[2]),
                                fp.head,
                                fp.get('1')
                            )(BUY_LINK_TYPES);
                        return _.extend(item, {icon});
                    });
                    this.comments = Release.comments;
                    this.commentInfo = Release.comments.pageInfo;
                    this.related = Release.related;
                    this.$gql.request(`mutation{popularAddView(type:"Release", id:"${Release._id}")}`);

                    let seo = this.seo;
		        	seo.title = Release.title;
		        	seo.description = Release.description;
		        	// seo.keywords = '',
		        	seo.image = Release.imageUrls && Release.imageUrls.length && Release.imageUrls[0];
                    // console.log(this.$route.params.like);
                    // console.log(Release.date);
                    // console.log(moment(Release.date).format('YYYY-MM-DDTHH:mm:ss'));
                    if (this.$route.params.like) {
                        this.favorite();
                    }
                }
            }, () => {
                this.$router.push('/error/404');
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
    .fav {
        padding-top: 2px !important;
        background-color: #ff9827;
    }
    .share {
        background-color: #4091f9;
        padding-left: 4px !important;
    }
    .calendar {
        background-color: #b658f5;
    }
    .retailer {
        white-space: nowrap;
        > * {
            white-space: normal;
        }
    }
</style>