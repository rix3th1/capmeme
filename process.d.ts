declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		GROQ_API_KEY?: string;
		PROMPT_MEME?: string;
	}
}
