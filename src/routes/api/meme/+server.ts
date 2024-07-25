import { GROQ_API_KEY, GROQ_MODEL, PROMPT_MEME } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';
import { error, json } from '@sveltejs/kit';
import { generateText } from 'ai';

const groq = createOpenAI({
	apiKey: GROQ_API_KEY,
	baseURL: 'https://api.groq.com/openai/v1'
});

export const GET = async () => {
	try {
		const { text } = await generateText({
			model: groq(GROQ_MODEL),
			temperature: 0.7,
			frequencyPenalty: 1,
			presencePenalty: 1,
			prompt: PROMPT_MEME
		});

		const meme = JSON.parse(text);
		return json(meme);
	} catch (err) {
		console.error({ error: err });
		error(502, { message: 'Failed to generate meme' });
	}
};
