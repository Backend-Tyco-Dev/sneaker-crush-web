<template>
    <!-- Wide ad: add slot ID from AdSense when you create a display ad unit -->
    <Adsense
        v-if="type === 'wide' && slotWide"
        data-ad-client="ca-pub-8300440672362237"
        :data-ad-slot="slotWide"
        data-ad-format="auto"
        data-full-width-responsive="true"
        class="adsbygoogle hei">
    </Adsense>
    <!-- Quad/sidebar ad: add slot ID (and optional layout key) from AdSense when you create an ad unit -->
    <Adsense
        v-else-if="type !== 'wide' && slotQuad"
        class="adsbygoogle quad"
        data-ad-client="ca-pub-8300440672362237"
        :data-ad-slot="slotQuad"
        data-ad-format="fluid"
        :data-ad-layout-key="layoutKeyQuad || undefined">
    </Adsense>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'wide'
        }
    },
    data () {
        return {
            // Set these when you have ad units from AdSense (Ads → By ad unit). Leave empty until then.
            slotWide: '',
            slotQuad: '',
            layoutKeyQuad: ''
        }
    }
}
</script>
<style scoped>

@media (min-width: 1200px) {
    .adsbygoogle.quad {
        max-width: 250px;
        width: 100%;
        max-height: 266px;
        height: 100%;
    }
}

.adsbygoogle.hei {
    margin: 10px 0;
}

@media (min-width: 600px) {
    .adsbygoogle.hei {
        max-height: 115px;
        height: 100%;
    }

}
</style>
