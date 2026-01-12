<template>
    <dropdown right v-model="item" :items="items" @change="change"></dropdown>
</template>

<script>
    import _ from 'lodash';
    import CURRENCIES from '@/modules/currency';
    export default {
        props: {
            inverse: Boolean
        },
        data: () => ({
            items: _.filter(CURRENCIES, item => item.active).map(data => {
                return {
                    text: _.toUpper(data.type),
                    value: data.type
                };
            }),
            item: null
        }),
        methods: {
            change(value) {
                this.$store.commit('currency', value);
                setTimeout(() => {
                    this.$root.$forceUpdate();
                });
            }
        },
        mounted() {
            this.item = this.$store.state.ui.currency;
        }
    };
</script>