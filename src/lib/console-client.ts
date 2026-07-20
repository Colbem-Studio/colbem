// src/lib/console-client.ts
import type {
	ConsolePingResult,
	ConsoleIncident,
	SendVerificationCodeRequest,
	SendVerificationCodeResponse,
	VerifyCodeRequest,
	VerifyCodeResponse,
	ConsoleApiError
} from './types.js';

// TODO: confirm this is the real base URL — assumed from prior conversation
const CONSOLE_BASE_URL = 'https://console.colbe.cc/api';

async function consoleFetch<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${CONSOLE_BASE_URL}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
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
	// TODO: confirm actual endpoint path and response shape
	getStatus(): Promise<ConsolePingResult[]> {
		return consoleFetch<ConsolePingResult[]>('/status');
	},

	// TODO: confirm actual endpoint path and response shape
	getIncidents(): Promise<ConsoleIncident[]> {
		return consoleFetch<ConsoleIncident[]>('/incidents');
	},

	// TODO: confirm actual endpoint path, method, and payload shape
	sendVerificationCode(body: SendVerificationCodeRequest): Promise<SendVerificationCodeResponse> {
		return consoleFetch<SendVerificationCodeResponse>('/verify/send', {
			method: 'POST',
			body: JSON.stringify(body)
		});
	},

	// TODO: confirm actual endpoint path, method, and payload shape
	verifyCode(body: VerifyCodeRequest): Promise<VerifyCodeResponse> {
		return consoleFetch<VerifyCodeResponse>('/verify/confirm', {
			method: 'POST',
			body: JSON.stringify(body)
		});
	}
};