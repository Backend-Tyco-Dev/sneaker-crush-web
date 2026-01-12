<template>
    <router-link class="d-block item-link text-dark w-100" :to="route" :title="title">
        <prop :h="270" :v="200" class="bg-image" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + image + ')'}">
            <!-- :inner-class="cover ? 'bg-image-cover' : 'bg-image-contain'" -->
            <slot name="over"></slot>
        </prop>
        <div class="font-weight-bold text-uppercase mt-1 text-truncate w-100" v-if="title">
            {{title}}
        </div>
        <div class="subtitle text-truncate" v-if="subtitle">
            {{subtitle}}
        </div>
        <div class="subtitle" v-if="desc">
            {{desc | trunc(200)}}
        </div>
        <b-row class="text-uppercase mt-1" :class="{'flex-nowrap': right.type != 'text'}">
            <b-col cols="" md="" class="va text-nowrap pr-0" v-if="left">
                <span class="vam" v-if="left.type == 'year'">
                    <i class="far fa-calendar-alt mr-2 grad-purple text"></i><small><b>{{left.data}}</b></small>
                </span><span class="time vam" v-if="left.type == 'ago'">
                    <template v-if="!left.bypass">
                        <i class="far fa-clock mr-1 grad-purple text"></i><b>{{left.data | ago}}</b>
                    </template>
                    <template v-if="left.bypass">
                        <i class="far fa-clock mr-1 grad-purple text"></i>
                        <b class="d-inline-block d-lg-none">{{left.data | ago(null, left.bypass)}}</b>
                        <b class="d-none d-lg-inline-block">{{left.data | ago}}</b>
                    </template>
                </span><span class="vam" v-if="left.type == 'price'">
                    <!-- <i class="fa mr-1" :class="$options.filters.currencyIcon()"></i><span class="boldest">{{left.data | currency}}</span> -->
                    <span class="boldest">
                        <span v-if="typeof left.data != 'string'" class="simple">{{$options.filters.currencyChar()}}</span>{{left.data | currency}}
                    </span>
                </span><span class="date-badge vam" v-if="left.type == 'date'">
                    <b-badge class="grad-purple vam mb-0">
                        {{left.data | date(left.format)}}
                    </b-badge>
                </span>
            </b-col>
            <b-col cols="auto" md="auto" class="va text-nowrap pl-0 c-right" v-if="right" :class="{'pl-3': right.type == 'text'}" >
                <div class="h-100 text-badge vam va" v-if="right.type == 'text'">
                    <b-badge pill class="grad-purple vam mb-0">
                        {{right.data}}
                    </b-badge>
                </div>
                <div class="date-badge vam" v-if="right.type == 'date'">
                    <b-badge class="grad-purple vam mb-0">
                        {{right.data | date(right.format)}}
                    </b-badge>
                </div>
            </b-col>
        </b-row>
    </router-link>
</template>

<script>
    import _ from 'lodash';
    import ResizedVar from '@/modules/resized-var';
    const SUBTITLE_LENGTH = new ResizedVar({xs: 90, sm: 100, md: 100, lg: 100});
    export default {
        data: () => ({
            len: SUBTITLE_LENGTH
        }),
        props: {
            title: String,
            subtitle: String,
            desc: String,
            image: String,
            left: {
                type: Object,
                default: () => ({})
            },
            right: {
                type: Object,
                default: () => ({})
            },
            cover: Boolean,
            route: {
                type: [Object, String],
                default: () => ''
            }
        }
    };
</script>

<style lang="scss" scoped>
    .item-link {
        text-decoration: none;
        overflow: hidden;
    }
    .time {
        font-size: 10px;
        i {
            padding: 1px;
            font-size: 9px;
        }
    }
    .text-badge {
        font-size: 9pt;
        min-height: 25px;
        .badge {
            height: 14px;
            font-size: 8px;
            min-width: 70px;
            padding: 3px 7px;
            @media (max-width: 1024px) {
                height: 13px;
                font-size: 8px;
                min-width: 70px;
                padding: 3px 7px;
            }
        }
    }
    .date-badge {
        .badge {
            font-size: 12px;
            padding-left: 14px;
            padding-right: 14px;
        }
    }
    .c-right {
        font-size: 0px;
    }
    .subtitle {
        font-size: 14px;
        font-weight: 500;
        word-break: break-word;
        overflow: hidden;

        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        line-height: 21px;
        max-height: 84px;
    }
    .bg-image {
        background-color: #f9f9f9;
    }
    .boldest {
        font-weight: 900;
    }
</style>
