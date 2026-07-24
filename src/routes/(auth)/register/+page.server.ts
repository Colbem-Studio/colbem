// register/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { auth } from '$lib/server/auth.js';

export const actions: Actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const username = formData.get('username');
		const password = formData.get('password');
		const month = formData.get('month');
		const day = formData.get('day');
		const year = formData.get('year');
		const phone = formData.get('phone');

		if (
			typeof email !== 'string' || !email ||
			typeof username !== 'string' || !username ||
			typeof password !== 'string' || !password
		) {
			return fail(400, { error: 'Email, username, and password are required.' });
		}

		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters.' });
		}

		// TODO: birthday/phone need your Drizzle user schema before these can be persisted.
		console.log('Registration extra fields (not yet persisted):', { month, day, year, phone });

		try {
			await auth.api.signUpEmail({
				body: { name: username, email, password, username }
			});
		} catch (err) {
			console.error('Registration failed:', err);
			return fail(400, { error: 'Registration failed. Please try again.' });
		}

		throw redirect(303, '/dashboard'); 
	}
};