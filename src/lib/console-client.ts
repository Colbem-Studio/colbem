// src/lib/server/console-client.ts
// NOTE: server-only — uses a secret API key, never import into client-side code
import type {
	ConsoleHealthResult,
	ConsoleAlgorithmResult,
	ConsoleRenderResult,
	SendVerificationCodeRequest,
	SendVerificationCodeResponse,
	VerifyCodeRequest,
	VerifyCodeResponse,
	ConsoleApiError
} from './types.js';

// TODO: confirm this is the real base URL
const CONSOLE_BASE_URL = 'https://console.colbe.cc/api';

const CONSOLE_API_KEY = process.env.CONSOLE_API_KEY;

if (!CONSOLE_API_KEY) {
	console.warn('CONSOLE_API_KEY is not set — console-client requests will fail authentication.');
}

async function consoleFetch<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${CONSOLE_BASE_URL}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CONSOLE_API_KEY}`,
			...init?.headers
		}
	});

	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as Partial<ConsoleApiError>;
		throw new Error(body.error ?? `Console API request failed with status ${res.status}`);
	}

	return res.json() as Promise<T>;
}

export const consoleClient = {
	// maps to app/api/health
	// TODO: confirm response shape
	getHealth(): Promise<ConsoleHealthResult> {
		return consoleFetch<ConsoleHealthResult>('/health');
	},

	// maps to app/api/algorithm
	// TODO: confirm method (GET/POST?) and payload/response shape
	getAlgorithm(): Promise<ConsoleAlgorithmResult> {
		return consoleFetch<ConsoleAlgorithmResult>('/algorithm');
	},

	// maps to app/api/render
	// TODO: confirm method and payload/response shape
	getRender(): Promise<ConsoleRenderResult> {
		return consoleFetch<ConsoleRenderResult>('/render');
	},

	// maps to app/api/verification — has nested routes based on the expand arrow
	// TODO: confirm actual sub-paths (e.g. /verification/send vs /verification/code)
	sendVerificationCode(body: SendVerificationCodeRequest): Promise<SendVerificationCodeResponse> {
		return consoleFetch<SendVerificationCodeResponse>('/verification/send', {
			method: 'POST',
			body: JSON.stringify(body)
		});
	},

	verifyCode(body: VerifyCodeRequest): Promise<VerifyCodeResponse> {
		return consoleFetch<VerifyCodeResponse>('/verification/confirm', {
			method: 'POST',
			body: JSON.stringify(body)
		});
	}
};