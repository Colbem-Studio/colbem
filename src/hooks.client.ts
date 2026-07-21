// src/hooks.client.ts
import type { HandleClientError } from '@sveltejs/kit';
import { printConsoleWarning } from '$lib/client/consoleWarning.js';

printConsoleWarning();

// Catches uncaught client-side errors (failed load functions, render crashes, etc.)
// Better Auth call failures (signIn/signUp) do NOT throw, so they won't land here —
// use logAuthError() from consoleWarning.ts at the call site for those instead.
export const handleError: HandleClientError = ({ error, event, status, message }) => {
	const err = error as Error | undefined;

	console.log(
		'%cUnhandled client error',
		"color:#3b82f6; font-family: 'Builder Sans', sans-serif; font-size: 15px; font-weight: bold;"
	);

	console.log(
		`%c${[
			`Route: ${event.route?.id ?? event.url.pathname}`,
			`Status: ${status}`,
			`Message: ${message}`,
			err?.message ? `Error: ${err.message}` : null
		]
			.filter(Boolean)
			.join('\n')}`,
		"color:#93c5fd; font-family: 'Builder Sans', sans-serif; font-size: 13px; line-height: 1.6;"
	);

	if (err?.stack) {
		console.log('%cStack trace:', "color:#3b82f6; font-family: 'Builder Sans', sans-serif;", err.stack);
	}

	return {
		message: 'Something went wrong. Please try again.'
	};
};