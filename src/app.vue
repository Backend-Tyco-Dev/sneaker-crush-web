<template>
	<div id="app">
		<nav-header></nav-header>
		<router-view class="app-router" :key="$route.fullPath"/>
		<notifications position="top right"/>
	</div>
</template>

<script>
	// import '!!file-loader?name=[name].[ext]!@/assets/favicons/favicon.ico';
	export default {
		name: 'app',
		metaInfo: {
			title: 'Sneaker Crush',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: 'Sneaker release dates, footwear news, and catalog browsing at Sneaker Crush.'
				},
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
	html,
	body {
		margin: 0;
		min-height: 100vh;
		background-color: #fff;
	}
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.app-router {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
</style>
