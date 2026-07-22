import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username, emailOTP, phoneNumber } from 'better-auth/plugins';
import { db } from '$lib/server/db/index.js';

let ORIGIN: string = process.env.ORIGIN ?? '';
let BETTER_AUTH_SECRET: string | undefined = process.env.BETTER_AUTH_SECRET;
let cookiePlugin;

try {
	const { ORIGIN: envOrigin, BETTER_AUTH_SECRET: envSecret } = await import('$app/env/private');
	const { sveltekitCookies } = await import('better-auth/svelte-kit');
	const { getRequestEvent } = await import('$app/server');

	ORIGIN = envOrigin;
	BETTER_AUTH_SECRET = envSecret;
	cookiePlugin = sveltekitCookies(getRequestEvent);
} catch {
	// Running outside SvelteKit (e.g. `better-auth generate`) — fall back to process.env, skip cookie plugin.
}

const basePlugins = [
	username(),
	emailOTP({
		async sendVerificationOTP({ email, otp }) {
			// TODO: wire up your email provider here (Resend, SendGrid, etc.)
			console.log(`Send OTP ${otp} to ${email}`);
		}
	}),
	phoneNumber({
		async sendOTP({ phoneNumber, code }) {
			// TODO: wire up your SMS provider here (Twilio, etc.)
			console.log(`Send code ${code} to ${phoneNumber}`);
		}
	})
];

export const auth = betterAuth({
	baseURL: ORIGIN,
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	plugins: cookiePlugin ? [...basePlugins, cookiePlugin] : basePlugins
});