<template>
    <router-link :to="{name: 'release-view', params: {id: item && item._id}}" class="lnk text-dark">
        <b-row class="mb-1">
            <b-col cols="6" md="" class="pr-1">
                <prop :h="270" :v="210" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + (item.imageUrls && item.imageUrls[0] || '') + ')'}"></prop>
            </b-col>
            <b-col cols="6" md="" class="pl-1">
                <div class="text-uppercase title pt-2">
                    <b>{{item.title}}</b>
                </div>
                <div class="small pr-2">
                    {{item.nickname | trunc(trunc)}}
                </div>
            </b-col>
        </b-row>
    </router-link>
</template>

<script>
    export default {
        props: {
            item: Object,
            trunc: {
                type: Number,
                default: 20
            }
        }
    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 10pt;
        max-height: 46px;
        overflow: hidden;
    }
    .lnk {
        &:hover {
            text-decoration: none;
        }
    }
</style>