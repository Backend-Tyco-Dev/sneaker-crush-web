<template>
    <b-dropdown :text="text" class="dd-button" :right="right">
        <b-dropdown-item class="dd-item grad-purple-hover" :active="item.value == value" v-for="(item, index) in items" :key="index" @click="select(item, index)">
            {{item.text}}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import _ from 'lodash';
    export default {
        props: {
            value: String,
            items: {
                type: Array,
                default: () => []
            },
            title: String,
            right: Boolean
        },
        data: () => ({
        }),
        computed: {
            text() {
                let item = _.find(this.items, item => item.value == this.value);
                return _.get(item, 'text', this.title || '');
            }
        },
        methods: {
            select(item, index) {
                let newValue = _.get(this.items[index], 'value');
                if (this.value != newValue) {
                    this.$emit('change', newValue);
                }
                this.$emit('input', newValue);
            }
        }
    }
</script>

<style lang="scss">
    .dd-item {
        &:hover {
            color: #fff;
        }
    }
    .dd-button {
        &:hover {
            border-radius: 100px;
            @media (min-width:576px) {
                background-color: rgba(0, 0, 0, .1);
            }
        }
        button {
            background-color: transparent !important;
            border: none;
            color: #000 !important;
            border: none;
            box-shadow: none;
        }
        .dropdown-item {
            &.active {
                color: #fff !important;
            }
        }
        &.text-white {
            button {
                color: #fff !important;
            }
        }
        &.small {
            button {
                font-size: .8rem;
            }
        }
        &.font-weight-bold {
            button {
                font-weight: bold;
            }
        }
    }
</style>