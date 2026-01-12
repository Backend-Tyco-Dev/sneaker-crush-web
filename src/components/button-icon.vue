<template>
    <b-btn class="button hoverable va text-center p-0" @click="click()">
        <span class="vam f0">
            <i :class="icon" v-if="!loading"></i>
            <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
        </span>
    </b-btn>
</template>

<script>
    export default {
        props: {
            icon: [String, Object],
            loading: Boolean
        },
        methods: {
            click() {
                this.$emit('click');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .f0 {
        font-size: 0;
    }
    .button {
        border: none;
        width: 32px;
        height: 32px;
        i {
            font-size: 10pt;
        }
    }
</style>