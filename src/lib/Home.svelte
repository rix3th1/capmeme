<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	const getMeme = async () => {
		const res = await fetch('/api/meme');
		return res.json();
	};

	const writeText = (
		context: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		maxWidth: number
	) => {
		const words = text.split(' ');
		let line = '';
		const lineHeight = 24;

		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + ' ';
			const metrics = context.measureText(testLine);
			const testWidth = metrics.width;
			if (testWidth > maxWidth && i > 0) {
				context.strokeText(line, x, y);
				context.fillText(line, x, y);
				line = words[i] + ' ';
				y += lineHeight;
			} else {
				line = testLine;
			}
		}
		context.strokeText(line, x, y);
		context.fillText(line, x, y);
	};

	onMount(async () => {
		const [capInitMsg, agentMsg, capFinalMsg] = await getMeme();

		const context = canvas.getContext('2d');

		if (!context) {
			throw new Error('Canvas context not found');
		}

		const template = new Image();
		template.src = '/template.jpg';

		template.onload = () => {
			context.drawImage(template, 0, 0, canvas.width, canvas.height);

			context.fillStyle = '#fff';
			context.strokeStyle = '#000';
			context.lineWidth = 4;
			context.font = 'bold 20px Impact';
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			writeText(context, capInitMsg, canvas.width / 2, 200 - capInitMsg.length * 0.5, 500);
			writeText(context, agentMsg, canvas.width / 4, 420 - agentMsg.length * 0.5, 250);
			writeText(context, capFinalMsg, canvas.width / 1.3333, 420 - capFinalMsg.length * 0.5, 250);
		};
	});
</script>

<div class="flex w-full items-center justify-center">
	<canvas
		bind:this={canvas}
		class="background-animate w-11/12 rounded-lg border border-neutral-700/70 bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-900 shadow-2xl transition-colors hover:border-neutral-700 md:w-1/2"
		width="560"
		height="701"
	/>
</div>

<style>
	.background-animate {
		background-size: 400%;
		-webkit-animation: LoadingMeme 3s ease infinite;
		-moz-animation: LoadingMeme 3s ease infinite;
		animation: LoadingMeme 3s ease infinite;
	}

	@keyframes LoadingMeme {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
