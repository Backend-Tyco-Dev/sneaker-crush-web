<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Contact</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container class="py-5 legal-page">
            <p class="lead">
                We read messages from readers and partners. For general inquiries, editorial feedback, or business questions, use the email below.
            </p>
            <p>
                <strong>Email:</strong>
                <a href="mailto:Partners@thesneakercrush.com">Partners@thesneakercrush.com</a>
            </p>
            <p>
                For app-related support, you can also find Sneaker Crush on the
                <a href="https://play.google.com/store/apps/details?id=sneakercrush.mobile.sc" target="_blank" rel="noopener noreferrer">Google Play</a>
                and
                <a href="https://itunes.apple.com/app/sneaker-crush-release-dates/id661034398" target="_blank" rel="noopener noreferrer">App Store</a>
                listing pages.
            </p>
            <p class="mb-0">
                We do <strong>not</strong> offer product purchases on this site; release pages link to retailers when that information is available.
            </p>
        </b-container>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Contact',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content: 'Contact Sneaker Crush for general inquiries, editorial feedback, or business questions.'
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://thesneakercrush.com/contact'
            }
        ]
    }
};
</script>

<style lang="scss" scoped>
.legal-page {
    max-width: 720px;
    p {
        line-height: 1.65;
    }
}
</style>
