<template>
    <div>
        <div class="bg-main">
            <b-container class="py-5">
                <b-row>
                    <b-col class="va">
                        <h2 class="text-white vam mb-0">
                            <b>Terms and Conditions</b>
                        </h2>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container class="py-5 legal-page">
            <p class="text-muted small">Last updated: March 2026</p>
            <p>
                These Terms and Conditions (“Terms”) govern your access to and use of
                <a href="https://thesneakercrush.com" rel="noopener noreferrer">thesneakercrush.com</a>
                and related online services operated by Sneaker Crush (“we”, “us”, “our”). By using the site, you agree
                to these Terms. If you do not agree, please do not use the site.
            </p>
            <h3 class="h5 mt-4">Use of the site</h3>
            <p>
                The site provides editorial content, release information, news, and discovery features for
                informational purposes. We may update, suspend, or discontinue any part of the site at any time.
                You agree to use the site only in compliance with applicable laws and these Terms.
            </p>
            <h3 class="h5 mt-4">Accounts</h3>
            <p>
                If you create an account, you are responsible for safeguarding your credentials and for activity under
                your account. You agree to provide accurate information and to notify us promptly of unauthorized use
                if supported by your account tools or <router-link :to="{name: 'contact'}">contact options</router-link>.
            </p>
            <h3 class="h5 mt-4">Content and intellectual property</h3>
            <p>
                Text, graphics, logos, and other materials on the site are owned by Sneaker Crush or our licensors and
                are protected by applicable intellectual property laws. You may not copy, scrape, redistribute, or
                exploit site content for commercial purposes without our prior written permission, except as allowed by
                law (for example, fair use or temporary caching by your browser).
            </p>
            <h3 class="h5 mt-4">Third-party links and retailers</h3>
            <p>
                The site may link to third-party retailers, apps, or services. We do not control those sites and are not
                responsible for their products, prices, availability, or policies. Purchases you make elsewhere are
                solely between you and the seller.
            </p>
            <h3 class="h5 mt-4">Advertising</h3>
            <p>
                We may display third-party advertising, including through Google AdSense. Advertisers are responsible for
                their ads; your interactions with ads may be subject to the advertiser’s and Google’s policies.
            </p>
            <h3 class="h5 mt-4">Disclaimers</h3>
            <p>
                The site and its content are provided “as is” without warranties of any kind, to the fullest extent
                permitted by law. Release dates, prices, and product details may change; we do not guarantee accuracy
                or completeness. Use information at your own discretion.
            </p>
            <h3 class="h5 mt-4">Limitation of liability</h3>
            <p>
                To the fullest extent permitted by law, Sneaker Crush and its affiliates will not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data,
                arising from your use of the site.
            </p>
            <h3 class="h5 mt-4">Changes</h3>
            <p>
                We may revise these Terms from time to time. The “Last updated” date at the top will change when we do.
                Continued use of the site after changes means you accept the updated Terms.
            </p>
            <h3 class="h5 mt-4">Privacy</h3>
            <p>
                Our collection and use of personal information is described in our
                <router-link :to="{name: 'privacy'}">Privacy Policy</router-link>.
            </p>
            <h3 class="h5 mt-4">Contact</h3>
            <p class="mb-0">
                Questions about these Terms:
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
        title: 'Terms and Conditions',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content: 'Terms and Conditions for using Sneaker Crush: site use, accounts, content, and disclaimers.'
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://thesneakercrush.com/terms'
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
