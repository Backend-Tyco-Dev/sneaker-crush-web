<template>
    <div class="grad-purple shadow-sm cont text-nowrap" :class="{inverse: inverse}">
        <b-row>
            <b-col cols="auto" class="va pr-0">
                <div class="d-inline-block zoom vam va">
                    <i class="fa fa-search vam"></i>
                </div>
            </b-col>
            <b-col class="va pl-0">
                <b-form class="vam w-100" @submit="search">
                    <b-input type="text" :class="{wide: wide}" class="input d-inline-block pl-1" placeholder="Search..." v-model="text" @input="change" @focus.native="show = true" @blur.native="hide()" ref="ss"></b-input>
                    <b-button class="d-none" type="submit"></b-button>
                </b-form>
            </b-col>
        </b-row>
        <!-- <div class="items shadow" :class="{wide: wide}" v-if="show && items && items.length">
            <div class="item py-1 hoverable" v-for="(item, index) in items" :key="index" @click="open(item)">
                <b-row>
                    <b-col :cols="wide ? 2 : 3" class="pr-0">
                        <prop :h="270" :v="210" inner-class="bg-image-contain" :inner-style="{backgroundImage: 'url(' + (item.imageUrls && item.imageUrls.length && item.imageUrls[0]) + ')'}">
                        </prop>
                    </b-col>
                    <b-col :cols="wide ? 10 : 9" class="pl-1">
                        <div class="w-100 text-truncate pr-2 font-weight-bold">
                            {{item.title}}
                        </div>
                        <div class="w-100 text-truncate pr-2 text-muted small">
                            {{item.nickname}}
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div> -->
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        props: {
            inverse: Boolean,
            wide: Boolean
        },
        data: () => ({
            last: '',
            text: '',
            loading: false,
            items: null,
            show: true
        }),
        methods: {
            change(value) {
                if (value && value != this.last) {
                    this.loading = true;
                    this.load(value);
                }
                if (!value) {
                    this.items = null;
                }
                this.last = '';
            },
            open(item) {
                this.text = '';
                this.items = null;
                this.$router.push({name: 'release-view', params: {id: item._id}});
            },
            hide() {
                setTimeout(() => {
                    this.show = false;
                }, 100);
            },
            search($event) {
                $event.preventDefault();
                if (this.text) {
                    this.$router.push({name: 'search', query: {q: this.text}});
                    this.$root.$emit('search.hide');
                    let el = _.get(this, '$refs.ss.$el');
                    if (el) el.blur();
                }
            }
        },
        mounted() {
            this.load = _.debounce(value => {
                this.$gql.request(`{searchRelease(text: "${value}"){_id title nickname imageUrls}}`)
                    .then(({searchRelease}) => {
                        this.items = searchRelease;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }, 400);
        }
    };
</script>

<style lang="scss" scoped>
    .cont {
        position: relative;
        border-radius: 100px;
    }
    .input {
        width: 130px;
        border: none;
        background: transparent;
        color: #fff;
        font-weight: bold;
        box-shadow: none;
        font-size: 10pt;
        @media (max-width: 1024px) {
            font-size: 16px;
        }
        &::placeholder {
            color: #fff;
        }
        &.wide {
            width: 100%;
        }
    }
    .zoom {
        border-radius: 100%;
        margin-left: 5px;
        color: #fff;
        width: 28px;
        height: 28px;
        background-color: rgba(0, 0, 0, .3);
        text-align: center;
    }
    .inverse {
        color: #1d2124;
        background: none;
        background-color: rgba(255, 255, 255, .25);
        .input {
            color: #1d2124;
            &::placeholder {
                color: #1d2124;
            }
        }
    }
    .items {
        position: absolute;
        top: 100%;
        left: 0;
        width: 190px;

        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #efefef;
        transform: translate(0, 8px);

        &.wide {
            width: 100%;
        }
        .item {
            &:hover {
                background-color: #efefef;
            }
        }
    }
</style>