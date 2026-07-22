// login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { auth } from '$lib/server/auth.js';

export const actions: Actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');

		if (typeof identifier !== 'string' || typeof password !== 'string' || !identifier || !password) {
			return fail(400, { error: 'Username and password are required.' });
		}

		try {
			// TODO: confirm method name — username plugin typically exposes signInUsername
			await auth.api.signInUsername({
				body: { username: identifier, password }
			});
		} catch (err) {
			console.error('Login failed:', err);
			return fail(401, { error: 'Invalid credentials.' });
		}

		throw redirect(303, '/@me'); 
	}
};