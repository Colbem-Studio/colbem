// src/lib/client/auth.ts
import { createAuthClient } from 'better-auth/svelte';
import { usernameClient, emailOTPClient, phoneNumberClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	plugins: [usernameClient(), emailOTPClient(), phoneNumberClient()]
});