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
    <!-- Quad/sidebar: same format as AdSense snippet (auto + responsive) -->
    <Adsense
        v-else-if="type !== 'wide' && slotQuad"
        class="adsbygoogle quad"
        data-ad-client="ca-pub-8300440672362237"
        :data-ad-slot="slotQuad"
        data-ad-format="auto"
        data-full-width-responsive="true">
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
            slotWide: '3435947277',
            slotQuad: '8269471552'
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
