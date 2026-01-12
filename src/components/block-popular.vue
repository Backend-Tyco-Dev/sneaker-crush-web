<template>
    <div class="bg-bg pt-2">
        <headline class="text-uppercase px-3">
            <b>Popular</b> this week
        </headline>
        <popular-small v-for="(item, index) in items" :key="index" :item="item"></popular-small>
        <div class="bottom grad-purple mt-2"></div>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                default: () => []
            }
        }
    };
</script>

<style lang="scss" scoped>
    .bottom {
        height: 2px;
    }
</style>