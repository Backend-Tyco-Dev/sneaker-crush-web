<template>
    <div class="cont-rounded" @click="click()">
        <slot></slot>
    </div>
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
    .cont-rounded {
        border-radius: 42px;
        overflow: hidden;
        &.sm {
            border-radius: 14px;
        }
        &.responsive {
            @media (max-width: 768px) {
                border-radius: 16px;
            }
        }
    }
</style>