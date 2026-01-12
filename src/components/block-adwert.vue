<template>
    <Adsense
        v-if="type == 'wide'"
        data-ad-client="ca-pub-6475787002077359"
        data-ad-slot="8592458973"
        data-ad-format="auto"
        data-full-width-responsive="true"
        class="adsbygoogle hei">
    </Adsense>
    <Adsense
        v-else
        class="adsbygoogle quad"
        data-ad-format="fluid"
        data-ad-layout-key="-8a+ey-1j-37+bu"
        data-ad-client="ca-pub-6475787002077359"
        data-ad-slot="3065279057">
    </Adsense>
</template>
<script>
 export default {
     props: {
         type: {
             type: String,
             default: "wide"
         }
     },
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
