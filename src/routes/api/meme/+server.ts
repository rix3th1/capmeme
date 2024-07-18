import { GROQ_API_KEY, PROMPT_MEME } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { json } from '@sveltejs/kit';
import { generateText } from 'ai';

const groq = createOpenAI({
	apiKey: GROQ_API_KEY,
	baseURL: 'https://api.groq.com/openai/v1'
});

export async function GET() {
	try {
		const { text } = await generateText({
			model: groq('gemma2-9b-it'),
			temperature: 0.7,
			frequencyPenalty: 1,
			presencePenalty: 1,
			prompt: PROMPT_MEME
		});

		const meme = JSON.parse(text);
		return json(meme);
	} catch (error) {
		console.error({ error });
		GET();
	}
}
