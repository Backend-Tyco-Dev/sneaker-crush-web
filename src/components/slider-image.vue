<template>
    <div>
        <!-- <prop :h="12" :v="10" class="bg-bg" inner-class="bg-image-cover" :inner-style="{backgroundImage: 'url(' + (filtered[current] || filtered[0]) + ')'}"></prop> -->
        <div class="text-center">
            <img :src="filtered[current] || filtered[0]" class="w-100 img-fluid" />
        </div>
        <!-- <b-row class="mt-4 justify-content-center flex-nowrap">
            <b-col cols="auto" :style="{width: size + '%'}" v-for="(image, index) in filtered" :key="index" @click="select(index)">
                <prop inner-class="bg-bg bg-image-cover" :inner-style="{backgroundImage: 'url(' + image + ')'}">
                </prop>
            </b-col>
        </b-row> -->
        <slider-item :items="filtered" :perPageCustom="[[120, 4], [576, 5]]">
            <template slot="item" slot-scope="data">
                <div class="p-3" @click="select(data.index)">
                    <prop inner-class="bg-bg bg-image-cover" :inner-style="{backgroundImage: 'url(' + data.item + ')'}">
                    </prop>
                </div>
            </template>
        </slider-item>
    </div>
</template>

<script>
    import _ from 'lodash';
    const LIMIT = 6;
    export default {
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            current: null
        }),
        computed: {
            filtered() {
                return this.items; // _.concat(this.items, [this.items[0], this.items[0], this.items[0]]);
            },
            size() {
                let size = Math.min(Math.max(4, this.filtered.length), 5);
                return (100 / size).toFixed(2);
            }
        },
        methods: {
            select(index) {
                this.current = index;
            }
        }
    };
</script>