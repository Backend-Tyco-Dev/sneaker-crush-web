<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Privacy Policy</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container class="py-5 legal-page">
            <p class="text-muted small">Last updated: March 2026</p>
            <p>
                This policy describes how Sneaker Crush (“we”, “us”) handles information when you use
                <a href="https://thesneakercrush.com" rel="noopener noreferrer">thesneakercrush.com</a>
                and related services. We want you to understand what data may be collected, how it is used, and
                your choices.
            </p>
            <h3 class="h5 mt-4">Information we may collect</h3>
            <p>
                Depending on how you use the site, we or our service providers may process technical data such as
                IP address, browser type, device type, and general location (e.g. country or region) for security,
                analytics, and improving the service. If you sign in to an account, we process the email and profile
                data you provide as part of that feature.
            </p>
            <h3 class="h5 mt-4">Cookies and similar technologies</h3>
            <p>
                We use cookies and similar technologies to remember preferences, measure traffic, and deliver relevant
                experiences. Third-party services we use (including advertising partners) may set their own cookies
                as described in their policies.
            </p>
            <h3 class="h5 mt-4">Advertising and Google</h3>
            <p>
                We may use Google AdSense to show ads. Google may use cookies and other signals to serve and measure
                ads. You can learn how Google uses data when you use our partners’ sites or apps in
                Google’s Privacy &amp; Terms, and how to manage ad personalization in your Google account
                settings. For more on how AdSense works, see
                <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer">Google AdSense Program Policies</a>
                and
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.
            </p>
            <h3 class="h5 mt-4">Your choices</h3>
            <p>
                You can control cookies through your browser settings. For EU/UK/CH visitors, you may see a consent
                banner where required to manage advertising and related storage choices.
            </p>
            <h3 class="h5 mt-4">Contact</h3>
            <p class="mb-0">
                Questions about this policy:
                <a href="mailto:Partners@thesneakercrush.com">Partners@thesneakercrush.com</a>
                ·
                <router-link :to="{name: 'contact'}">Contact page</router-link>
            </p>
        </b-container>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Privacy Policy',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content: 'Privacy Policy for Sneaker Crush: data collection, cookies, advertising, and your choices.'
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://thesneakercrush.com/privacy'
            }
        ]
    }
};
</script>

<style lang="scss" scoped>
.legal-page {
    max-width: 720px;
    p,
    li {
        line-height: 1.65;
    }
}
</style>
