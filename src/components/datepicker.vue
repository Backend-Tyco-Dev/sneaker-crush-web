<template>
    <div class="d-inline-block s-datepicker btn dropdown-toggle" @click="open()">
        <date-picker ref="dp" type="month" v-model="time" :clearable="false" :first-day-of-week="1" lang="en" format="MMMM YYYY" :editable="false" input-class="s-datepicker-input"></date-picker>
    </div>
</template>

<script>
    export default {
        props: ['value'],
        data: () => ({
            time: null
        }),
        watch: {
            value(value) {
                this.time = value;
                // this.$emit('input', value);
            },
            time(value) {
                this.$emit('input', value);
            }
        },
        methods: {
            open() {
                let dp = this.$refs.dp;
                if (dp && !dp.popupVisible) {
                    setTimeout(() => {
                        dp.showPopup();
                    });
                }
            }
        },
        mounted() {
            this.time = this.value;
        }
    };
</script>

<style lang="scss" scoped>
    .s-datepicker {
        cursor: pointer;
        white-space: normal;
        padding: 4px 10px !important;
        ::v-deep input {
            background-color: transparent !important;
        }
        &:hover {
            cursor: pointer !important;
            @media (min-width:576px) {
                background-color: rgba(0, 0, 0, .1);
            }
        }
        ::v-deep {
            .mx-datepicker {
                width: auto;
            }
            .s-datepicker-input {
                border: none;
                outline: none;
                color: #000;
                font-size: 12pt;
                width: 130px;
                font-family: 'Montserrat', sans-serif;
                &::placeholder {
                    color: #000;
                }
            }
            .mx-input-append:not(.mx-clear-wrapper) {
                display: none;
            }
            .mx-input-append.mx-clear-wrapper {
                top: -5px;
            }
        }
    }
</style>