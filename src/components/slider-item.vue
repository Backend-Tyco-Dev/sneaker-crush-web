<template>
    <carousel class="sc-carousel" :perPageCustom="perPageCustom" :paginationEnabled="false" ref="slider">
        <slide v-for="(item, index) in items" :key="index">
            <div :style="{width: slideWidth + 'px'}">
                <slot name="item" :item="item" :index="index"></slot>
            </div>
        </slide>
    </carousel>
</template>

<script>
    import _ from 'lodash';
    import { Carousel, Slide } from 'vue-carousel';
    Slide.computed.activeSlides = function() {
        const { currentPage, currentPerPage, $children } = this.carousel;
        const children = $children
            .filter(child => _.get(child, '$el.className', []).indexOf("VueCarousel-slide") >= 0)
            .map(child => child._uid);

        let len = $children.length;
        let index = currentPerPage * currentPage;
        if (_.ceil(len / currentPerPage) - 1 == currentPage && len < (currentPage + 1) * currentPerPage) {
            index = len - currentPerPage;
        }
        let activeSlides = _.slice(children, index, index + currentPerPage);

        return activeSlides;
    };
    export default {
        props: {
            items: Array,
            perPageCustom: {
                type: Array,
                default: () => [[576, 3], [992, 4], [1200, 4]]
            }
        },
        components: {Carousel, Slide},
        data: () => ({
            slideWidth: null
        }),
        methods: {
            sliderWidth() {
                this.slideWidth = _.get(this, '$refs.slider.slideWidth');
            }
        },
        mounted() {
            this.sliderWidth();
            this.$watch('$refs.slider.slideWidth', value => {
                this.sliderWidth();
            });
        }
    };
</script>

<style lang="scss" scoped>
    .sc-carousel {
        // /deep/ .VueCarousel-slide-active {
        //     &:first-child {
        //         padding-left: 0;
        //     }
        // }
        ::v-deep {
            .VueCarousel-inner {
                margin-left: -15px !important;
                margin-right: -15px !important;
            }
        }
    }
</style>