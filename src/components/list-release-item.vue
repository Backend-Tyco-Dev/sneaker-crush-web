<template>
    <div>
        <b-row>
            <b-col cols="12" md="auto" :class="{'mb-3': showDate, 'd-none d-md-block': !showDate}">
                <div class="box text-center va">
                    <div class="vam" v-if="showDate">
                        <div class="h5 mb-0" :class="{'my-3': item.hasUnknownDay}">
                            <b>{{item.hasUnknownDay ? 'TBA' : item.date | date('DD')}}</b>
                        </div>
                        <div class="text-uppercase" v-if="!item.hasUnknownDay">
                            {{item.date | date('MMM')}}
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col cols="3" class="d-none d-md-block">
                <router-link :to="{name: 'release-view', params: {id: item._id}}">
                    <prop :h="270" :v="210" class="bg-bg" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + image + ')'}">
                    </prop>
                </router-link>
            </b-col>
            <b-col>
                <b-row>
                    <b-col class="font-weight-bold text-uppercase">
                        {{item.title}}
                    </b-col>
                    <b-col cols="auto" class="h5">
                        <b-badge class="grad-purple vam va py-0 mb-0 px-4 text-uppercase t-date">
                            <span class="vam">
                                {{item.date | date(item.hasUnknownDay ? 'MMMM' : 'DD MMMM')}}
                            </span>
                        </b-badge>
                    </b-col>
                </b-row>
                
                <div class="small mt-1 fw-500">
                    {{item.nickname}}
                </div>
                <router-link :to="{name: 'release-view', params: {id: item._id}}">
                    <prop :h="270" :v="210" class="d-block d-md-none mt-3" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + image + ')'}">
                    </prop>
                </router-link>
                <div class="mt-3 fw-500 d-none d-md-block">
                    {{item.description}}
                </div>
                <b-row class="mt-3 mt-md-0">
                    <b-col cols="6" md="12" class="va">
                        <div class="h5 mt-0 mt-md-2 vam mb-0">
                            <!-- <b><i class="fa fa-dollar-sign mr-1"></i>{{item.price}}</b> -->
                            <b><span v-if="typeof item.price != 'string'" class="simple">{{$options.filters.currencyChar()}}</span>{{item.price | currency}}</b>
                        </div>
                    </b-col>
                    <b-col cols="6" md="12" class="va text-right text-md-left mt-0 mt-md-3">
                        <s-button class="grad-purple px-4 shadow-sm vam" @click="openRelease()">
                            See More
                        </s-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-4 d-block d-sm-none">
            <b-col cols="12" md="11" offset-md="1">
                <div class="grad-purple line"></div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import moment from 'moment';
    import _ from 'lodash';
    export default {
        props: {
            item: Object,
            prev: Object,
            next: Object
        },
        methods: {
            openRelease() {
                this.$router.push({name: 'release-view', params: {id: this.item._id}});
            }
        },
        computed: {
            showDate() {
                return !this.prev || (this.prev && !moment(this.prev.date).isSame(this.item.date, 'd')) || (this.prev && !this.item.hasUnknownDay && this.prev.hasUnknownDay);
            },
            showLine() {
                return this.showDate || (this.next && moment(this.next.date).isSame(this.item.date, 'd'));
            },
            image() {
                return _.head(this.item.imageUrls) || '';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .bottom-line {
        height: 3px;
    }
    .box {
        width: 64px;
        @media (min-width: 768px) {
            height: 64px;
        }
        &:not(:empty) {
            border-right: 2px solid #8058cb;
        }
    }
    .t-date {
        font-size: 14px;
        height: 20px;
    }
    .fw-500 {
        font-weight: 500;
    }
</style>
