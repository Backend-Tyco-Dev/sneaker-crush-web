<template>
    <b-container class="page px-2 px-lg-0">
        <rounded class="bg-white box mx-auto shadow-lg">
            <div>
                <h3 class="mb-0 font-weight-bold">
                    Forgot password
                </h3>
            </div>
            <b-form novalidate @submit="send">
                <div class="mt-4">
                    <b-input type="text" class="clean" placeholder="Email" v-model="email"></b-input>
                    <div class="grad-purple line"></div>
                </div>
                <div class="text-center mt-5">
                    <s-button type="submit" class="grad-purple text-uppercase px-5">
                        Send email
                    </s-button>
                </div>
            </b-form>
            <div class="text-center mt-4 small">
                <router-link :to="{name: 'signin'}">Back</router-link>
            </div>
        </rounded>
    </b-container>
</template>

<script>
    export default {
        data: function() {
            return {
                email: ''
            }
        },
        methods: {
            send($event) {
                $event.preventDefault();
                if (this.email) {
                    this.$gql.request(`
                        mutation {
                            restorePasswordByEmail(email: "${this.email}")
                        }
                    `)
                    .then(({restorePasswordByEmail}) => {
                        this.$notify('Check your email');
                    }, () => {
                        this.$notify({type: 'error', text: 'Check entered email'});
                    });
                } else {
                    this.$notify({type: 'error', text: 'Please enter email'});
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page {
        padding: 120px 0;
        @media (max-width: 1200px) {
            padding: 40px 0;
            .box {
                margin-top: 0;
            }
        }
    }
    .box {
        max-width: 488px;
        padding: 150px 60px 100px 60px;
        margin-top: 5%;
    }
</style>