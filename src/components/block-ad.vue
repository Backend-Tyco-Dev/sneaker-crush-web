
<template>
    <router-link to="#">
        <prop :h="h" :v="v" class="bg-bg ad" :inner-class="'bg-image-cover ' + type">
        </prop>
    </router-link>
</template>
<script>
    const TYPES = {
        quad: {
            h: 324,
            v: 290
        },
        wide: {
            h: 1138,
            v: 141
        }
    };
    export default {

        props: {
            type: String
        },
        data: () => ({
            h: 8,
            v: 1
        }),
        watch: {
            type(value) {
                this.checkType(value);
            }
        },
        methods: {
            checkType(value) {
                let type = TYPES[value || this.type];
                if (type) {
                    this.h = type.h;
                    this.v = type.v;
                }
            }
        },
        mounted() {
            this.checkType();
        }
    };
</script>

<style lang="scss" scoped>
    .ad {
        ::v-deep .wide {
            background-image: url('/static/ad-wide.png');
        }
        ::v-deep .quad {
            background-image: url('/static/ad-quad.png');
        }
    }
</style>
