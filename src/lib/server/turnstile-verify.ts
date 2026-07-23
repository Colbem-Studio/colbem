// src/lib/server/turnstile-verify.ts
// Server-side verification — call this in your form action before trusting a submission.

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		console.warn('TURNSTILE_SECRET_KEY is not set — skipping verification (INSECURE).');
		return false;
	}

	const formData = new URLSearchParams();
	formData.append('secret', secret);
	formData.append('response', token);
	if (remoteIp) formData.append('remoteip', remoteIp);

	const res = await fetch(VERIFY_URL, { method: 'POST', body: formData });
	const data = (await res.json()) as { success: boolean };

	return data.success;
}