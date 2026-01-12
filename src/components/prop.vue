<template>
    <div class="proportion">
        <div class="outer" :style="{paddingTop: this.padding}">
            <div class="inner" :class="innerClass" :style="innerStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            h: {
                type: Number,
                default: 1
            },
            v: {
                type: Number,
                default: 1
            },
            innerClass: String,
            innerStyle: Object
        },
        computed: {
            padding() {
                return (this.v / this.h) * 100 + '%';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .proportion {
        position: relative;
    }
    .inner {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>