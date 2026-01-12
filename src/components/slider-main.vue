<template>
    <div class="slider bg-bg">
        <div class="items">
            <prop :h="2" :v="1"></prop>
            <prop :h="2" :v="1"font class="item" inner-class="va inside-cont" v-for="(item, index) in items" :key="index" :class="{show: current == index}">
                <div class="image" :style="{backgroundImage: 'url(' + item.image + ')'}"></div>
                <div class="inside vam">
                    <h1 class="font-weight-bold">
                        {{item.title}}
                    </h1>
                    <!-- <div class="small pt-2 d-none d-md-block">
                        {{item.description}}
                    </div> -->
                    <div class="mt-3 mt-md-3">
                        <router-link class="btn grad-purple text-white px-3 px-md-5" :to="item.to">
                            <span class="small font-weight-bold">
                                Read More
                            </span>
                        </router-link>
                    </div>
                </div>
            </prop>
        </div>
        <div class="controls">
            <div class="prev" @click="prev()" v-if="items.length > 1">
            </div>
            <div class="next" @click="next()" v-if="items.length > 1">
            </div>
        </div>
    </div>
</template>

<script>
    const TIME = 3000;
    export default {
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            prev() {
                this.current--;
                let len = this.items.length;
                if (this.current < 0) {
                    this.current = len - 1;
                }
            },
            next() {
                this.current++;
                let len = this.items.length;
                if (this.current > len - 1) {
                    this.current = 0;
                }
                clearTimeout(this.timer);
                if (len > 1) {
                    this.timer = setTimeout(() => {
                        this.next(true);
                    }, TIME);
                }
            }
        },
        data: () => ({
            current: 0,
            timer: null
        }),
        mounted() {
            this.timer = setTimeout(() => {
                this.next();
            }, TIME);
        },
        destroyed() {
            clearTimeout(this.timer);
        }
    };
</script>

<style lang="scss" scoped>
    
    .inside {
        position: relative;
        width: 60%;
        z-index: 10;
        padding: 0 12%;
        ::v-deep {
            @media (max-width: 768px) {
                h1 {
                    font-size: 1.4rem;
                }
            }
            @media (max-width: 576px) {
                h1 {
                    font-size: 1rem;
                }
                .btn {
                    font-size: .8rem;
                }
            }
        }
    }
    .items {
        position: relative;
    }
    .item {
        position: absolute !important;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity .5s;
        white-space: nowrap;
        &.show {
            opacity: 1;
        }
    }
    .slider {
        
        position: relative;
        ::v-deep .inside-cont {
            white-space: nowrap;
            & > * {
                white-space: normal;
            }
        }
    }
    .image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        // left: 30%;
        // top: 20%;
        // bottom: 10%;
        // right: 4%;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;

        &::before {
            background-color: rgba(164, 91, 203, 0.5);
            display: block;
            content:" ";
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
    }
    .controls {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        pointer-events: none;
        .prev, .next {
            position: absolute;
            top: 50%;
            width: 20px;
            pointer-events: auto;
            transform: translate(0, -50%);
        }
        .prev, .next {
            left: 20px;
            cursor: pointer;
            &:before, &:after {
                content: '';
                display: block;
                height: 20px;
                width: 1px;
                background-color: #fff;
            }
            &:before {
                transform-origin: 0 100%;
                transform: rotate(45deg);
            }
            &:after {
                transform-origin: 0 0%;
                transform: rotate(-45deg);
            }
        }
        .next {
            left: auto;
            right: 20px;
            transform-origin: 50% 50%;
            transform: translate(0, -50%) rotate(180deg);
        }
    }
    .slider h1.font-weight-bold {
        color: #fff;
    }
    @media (max-width: 600px) {
        .slider h1.font-weight-bold {
            word-break: break-word;
            overflow: hidden;

            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            line-height: 20px;
            max-height: 100px;
        }
    }
</style>
