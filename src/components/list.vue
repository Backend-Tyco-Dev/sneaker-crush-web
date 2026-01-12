<template>
    <div class="" :class="{'slider': slider}">
        <b-row class="d-block mt-3 item-block" :class="{'text-nowrap': slider}">
            <template v-for="(item, index) in filtered" v-if="filtered && filtered.length">
                <b-col :cols="line ? 12 : cols.value" class="d-inline-block align-top mb-4">
                    <slot name="item" :item="item" :items="filtered" :index="index"></slot>
                    <slot name="line" :item="item" :items="filtered" :index="index" v-if="line"></slot>
                    <slot name="block" :item="item" :items="filtered" :index="index" v-if="!line"></slot>
                </b-col><slot name="other" :index="index"></slot>
            </template>
            <div class="text-center mt-4 mb-5" v-if="loadMore && filtered && filtered.length">
                <mugen-scroll :handler="loadNextPage" :should-handle="loadMore">
                </mugen-scroll>
                <s-button class="grad-purple px-5" @click="loadNextPage()">
                    Load More
                </s-button>
                
            </div>
            <b-col cols="12" class="text-center py-3" v-if="filtered && !filtered.length"><!-- !filtered || -->
                Nothing here.
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _ from 'lodash';
    import MugenScroll from 'vue-mugen-scroll';
    import ResizedVar from '@/modules/resized-var';
    const COLS = new ResizedVar({xs: 6, sm: 4, md: 4, lg: 3, xl: 3});
    export default {
        components: {
            MugenScroll,
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            loadMore: Boolean,
            slider: Boolean,
            line: Boolean,
        },
        data: () => ({
            cols: COLS,
        }),
        computed: {
            filtered() {
                return this.items;
            },
        },
        // watch: {
        //     'cols.value': function(value) {
        //         this.filtered;
        //     }
        // },
        methods: {
            loadNextPage() {
                if (this.loadMore) {
                    this.$emit('load-more');
               } 
            }
        }
    };
</script>

<style lang="scss" scoped>
    .slider {
        // overflow: hidden;
        // @media (max-width: 1200px) {
            overflow-x: scroll;
            overflow-y: hidden;
        // }
        .item-block * {
            white-space: normal !important;
        }
    }
</style>
