<template>
    <b-container class="page px-2 px-lg-0">
        <b-row>
            <b-col cols="12" offset="0" md="6" offset-md="3" >
                <b-row class="text-white text-center">
                    <b-col cols="3">
                        <div class="display-4 font-weight-bold">
                            {{dd}}
                        </div>
                        <div class="h5 mb-0 text-uppercase">
                            days
                        </div>
                    </b-col>
                    <b-col cols="3">
                        <div class="display-4 font-weight-bold">
                            {{hh}}
                        </div>
                        <div class="h5 mb-0 text-uppercase">
                            hours
                        </div>
                    </b-col>
                    <b-col cols="3">
                        <div class="display-4 font-weight-bold">
                            {{mm}}
                        </div>
                        <div class="h5 mb-0 text-uppercase">
                            min
                        </div>
                    </b-col>
                    <b-col cols="3">
                        <div class="display-4 font-weight-bold">
                            {{ss}}
                        </div>
                        <div class="h5 mb-0 text-uppercase">
                            sec
                        </div>
                    </b-col>
                </b-row>
                <prop :h="488" :v="240" class="mt-4" inner-class="bg-image-contain" :inner-style="{backgroundImage: 'url(/static/soon.svg)'}">
                </prop>
                <div class="notify">
                    <b-row>
                        <b-col class="pr-0">
                            <b-input type="text" class="w-100 form-control" placeholder="Email"></b-input>
                        </b-col>
                        <b-col cols="auto" class="pl-0">
                            <s-button class="notify-me text-dark px-5 text-uppercase h-100">
                                Notify me!
                            </s-button>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import moment from 'moment';
    const DUE = '2019-05-01';
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

    const due = moment(DUE);

    let count = function() {
        let diff = due.diff(moment());
        let dd = diff / DAY | 0;
        let hh = (diff - (dd * DAY)) / HOUR | 0;
        let mm = (diff - (dd * DAY + hh * HOUR)) / MINUTE | 0;
        let ss = (diff - (dd * DAY + hh * HOUR + mm * MINUTE)) / SECOND | 0;
        this.dd = dd;
        this.hh = hh;
        this.mm = mm;
        this.ss = ss;
    };
    let timer;
    export default {
        data: () => ({
            dd: null,
            hh: null,
            mm: null,
            ss: null
        }),
        mounted() {
            count.call(this);
            timer = setInterval(count.bind(this), 1000);
        },
        destroyed() {
            clearInterval(timer);
            timer = null;
        }
    };
</script>

<style lang="scss">
    .page {
        padding-top: 180px;
        padding-bottom: 100px;
        @media (max-width: 1200px) {
            padding: 80px 0;
        }
    }
    .notify {
        border-radius: 100px;
        background-color: rgba(255, 255, 255, .3);
        input {
            border: none;
            background: transparent;
            border-radius: 100px 0 0 100px;
            box-shadow: none;
            font-weight: bold;
            color: #333;
            &:focus {
                background-color: transparent;
            }
            &::placeholder {
                color: #333;
            }
        }
    }
    .notify-me {
        background-color: #fff;
        &:hover {
            background-color: #eee;
        }
    }
</style>