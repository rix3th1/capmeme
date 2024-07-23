<script>
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import Home from '$lib/Home.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="fixed h-screen w-full bg-cover" style="background-image: url(/background.webp)">
		<div
			class="flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950/80 to-black/90 backdrop-blur-sm md:backdrop-blur-none"
		/>
	</div>

	<div class="overflor-auto absolute inset-0 flex h-screen flex-col px-6">
		<Header />

		<div
			class="mx-auto flex w-full max-w-4xl flex-grow flex-col items-center justify-center md:pt-10"
		>
			<Home />
		</div>

		<Footer />
	</div>
</section>
