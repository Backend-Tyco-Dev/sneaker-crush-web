<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>About Sneaker Crush</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container class="py-5 legal-page">
            <p class="lead">
                Sneaker Crush is an editorial destination focused on sneaker release dates, industry news, and catalog-style discovery for collectors and fans worldwide.
            </p>
            <p>
                Our team curates timely coverage of upcoming drops, retail context, and stories from across the footwear space. We combine structured release information with articles and commentary so readers can plan purchases and stay informed—not only see a list of names and dates.
            </p>
            <p>
                Content is produced for sneaker enthusiasts who want a single place to track releases alongside thoughtful write-ups. We aim for clear navigation, accurate labeling of sources where applicable, and a consistent experience on both desktop and mobile.
            </p>
            <p class="mb-0">
                Sneaker Crush is operated with readers in mind: if you have feedback or corrections, we welcome you to reach out via our <router-link :to="{name: 'contact'}">Contact</router-link> page.
            </p>
        </b-container>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'About Us',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content: 'Learn about Sneaker Crush: sneaker release dates, news, and editorial coverage for collectors and fans.'
            },
            {
                vmid: 'og:title',
                property: 'og:title',
                content: 'About Sneaker Crush'
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://thesneakercrush.com/about'
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
