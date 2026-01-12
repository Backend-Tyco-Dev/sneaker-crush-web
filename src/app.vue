<template>
	<div id="app">
		<nav-header></nav-header>
		<router-view :key="$route.fullPath"/>
		<notifications position="top right"/>
	</div>
</template>

<script>
	// import '!!file-loader?name=[name].[ext]!@/assets/favicons/favicon.ico';
	export default {
		name: 'app',
		metaInfo: {
			title: 'Sneaker Crush | The Latest Sneaker Release Dates + News',
			meta: [
				{vmid: 'description', name: 'description', content: 'Stay up to date with the latest Sneaker news &amp; release dates with Sneaker Crush!'},
				// {vmid: 'keywords', name: 'keywords', content: ''}
				// {vmid: 'og:url', name: 'og:url', content: 'http://www.thesneakercrush.com'},
				// {vmid: 'og:title', name: 'og:title', content: 'Sneaker Crush | Sneaker Media Giant | The Go To for all Nike &amp; Air Jordan News/Release Dates'},
				// {vmid: 'og:description', name: 'og:description', content: 'Stay up to date with the latest Sneaker news &amp; release dates with Sneaker Crush!'},
				{vmid: 'apple-itunes-app', name: 'apple-itunes-app', content: 'app-id=661034398'},
			]
		},
		mounted() {
			this.$store.dispatch('onIsMobile');
		}
	};
</script>

<style lang="scss">
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
