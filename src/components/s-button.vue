<template>
    <b-btn class="button hoverable" @click="click()">
        <span>
            <slot></slot>
        </span>
    </b-btn>
</template>

<script>
    export default {
        methods: {
            click() {
                this.$emit('click');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .button {
        border: none;
        span {
            font-size: 80%;
            font-weight: bold;
        }
    }
</style>