<template>
    <b-row>
        <b-col cols="auto" class="title va" :class="{'order-2 pl-0': reverse, 'pr-0': !reverse}">
            <div class="vam">
                <slot></slot>
            </div>
        </b-col>
        <b-col class="va line-cont" :class="{'order-1 pr-2': reverse, 'pl-2': !reverse}">
            <div class="line grad-purple w-100 vam">
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        props: {
            reverse: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 9pt;
        max-width: 100%;
        @media (max-width: 576px) {
            white-space: normal;
            word-break: break-word;
        }
    }
    .line-cont {
        font-size: 0px;
    }
    .line {
        height: 3px;
    }
</style>