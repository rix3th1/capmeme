<script lang="ts">
	import { onMount } from 'svelte';
	import { canvas } from './stores';

	onMount(() => {
		const context = $canvas.getContext('2d');

		if (!context) {
			alert('Canvas context not found');
			return;
		}

		const template = new Image();
		template.src = '/template.jpg';

		template.addEventListener('load', () => drawMeme(template, context));
	});

	const drawMeme = async (template: HTMLImageElement, context: CanvasRenderingContext2D) => {
		try {
			const [capInitMsg, agentMsg, capFinalMsg] = await getMeme();

			context.drawImage(template, 0, 0, $canvas.width, $canvas.height);
			context.fillStyle = '#fff';
			context.strokeStyle = '#000';
			context.lineWidth = 4;
			context.font = 'bold 20px Impact';
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			drawText(context, capInitMsg, $canvas.width / 2, 200 - capInitMsg.length * 0.5, 500);
			drawText(context, agentMsg, $canvas.width / 4, 420 - agentMsg.length * 0.5, 250);
			drawText(context, capFinalMsg, $canvas.width / 1.3333, 420 - capFinalMsg.length * 0.5, 250);
		} catch (error) {
			if (confirm('Error fetching meme, reload?')) {
				window.location.reload();
			}
		}
	};

	const getMeme = async () => {
		const res = await fetch('/api/meme');
		return res.json();
	};

	const drawText = (
		context: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		maxWidth: number
	) => {
		const words = text.split(' ');
		let line = '';
		const LINE_HEIGHT = 24;

		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + ' ';
			const metrics = context.measureText(testLine);
			const testWidth = metrics.width;
			if (testWidth > maxWidth && i > 0) {
				context.strokeText(line, x, y);
				context.fillText(line, x, y);
				line = words[i] + ' ';
				y += LINE_HEIGHT;
			} else {
				line = testLine;
			}
		}
		context.strokeText(line, x, y);
		context.fillText(line, x, y);
	};
</script>

<div class="flex w-full items-center justify-center">
	<canvas
		bind:this={$canvas}
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
