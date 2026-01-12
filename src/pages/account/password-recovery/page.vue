<template>
    <b-container class="page px-2 px-lg-0">
        <rounded class="bg-white box mx-auto shadow-lg">
            <div>
                <h3 class="mb-0 font-weight-bold">
                    Recover password
                </h3>
            </div>
            <b-form novalidate @submit="send">
                <div class="mt-4">
                    <b-input type="password" class="clean" placeholder="New password" v-model="password"></b-input>
                    <div class="grad-purple line"></div>
                </div>
                <div class="text-center mt-5">
                    <s-button type="submit" class="grad-purple text-uppercase px-5">
                        Submit
                    </s-button>
                </div>
            </b-form>
        </rounded>
    </b-container>
</template>

<script>
    import _ from 'lodash';
    export default {
        data: () => ({
            password: '',
            loading: false
        }),
        methods: {
            send($event) {
                $event.preventDefault();
                if (!this.loading) {
                    this.loading = true;
                    this.$gql.request(`
                            mutation($id: String, $data: JSON) {
                                restorePasswordConfirm(id: $id, data: $data)
                            }
                        `, {
                            id: _.first(_.keys(this.$route.query)),
                            data: {
                                password: this.password
                            }
                        })
                        .then(({restorePasswordConfirm}) => {
                            if (restorePasswordConfirm) {
                                this.$notify('Password successfully changed');
                                this.$router.push({name: 'signin'});
                            } else {
                                this.$notify({type: 'error', text: 'Something went wrong'});
                            }
                        }, errors => {
                            let error = _.get(errors, 'response.errors[0].message', 'error');
                            this.$notify({type: 'error', text: _.split(error, '').map((c, i) => i == 0 ? _.capitalize(c) : c).join('')});
                        })
                        .finally(() => {
                            this.loading = false;
                        });
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