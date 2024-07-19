<script>
	import GitHubButton from './GitHubButton.svelte';
	import ShareButton from './ShareButton.svelte';
</script>

<div
	class="mx-auto mt-20 flex w-full max-w-4xl flex-col items-center border-t border-white/20 py-7 backdrop-blur-sm md:flex-row md:justify-between"
>
	<div class="flex flex-none items-center text-white/70">
		Powered by <span class="mx-1 font-bold"> Grok</span>
		and
		<span class="ml-1 font-bold">HTML 5 Canvas</span>.
	</div>
	<div class="mt-2 flex items-center md:mt-0">
		<ShareButton />
		<GitHubButton />
	</div>
</div>
