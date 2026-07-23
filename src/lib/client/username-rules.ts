// src/lib/client/username-rules.ts
// Client + server shared validation rules for usernames.
// Keep this in a shared location (not $lib/server) since both the signup form
// (for live feedback) and the server action (for enforcement) need it.
// NOTE: containsProfanity() pulls in the full obscenity dataset — avoid importing
// it into client-facing components; use it only in server actions (+page.server.ts).

import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers
});

export function containsProfanity(text: string): boolean {
	return matcher.hasMatch(text);
}

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;
const VALID_PATTERN = /^[a-zA-Z0-9_.]+$/;

// Reserved system/brand words — expand as needed for your product.
const RESERVED_WORDS = [
	'admin', 'administrator', 'root', 'system', 'support',
	'moderator', 'mod', 'staff', 'colbe', 'colbem', 'help',
	'null', 'undefined', 'api', 'test', 'roblox',
];

export type UsernameValidationResult =
	| { valid: true }
	| { valid: false; reason: string };

export function validateUsername(username: string): UsernameValidationResult {
	const trimmed = username.trim();

	if (trimmed.length < MIN_LENGTH) {
		return { valid: false, reason: `Username must be at least ${MIN_LENGTH} characters.` };
	}

	if (trimmed.length > MAX_LENGTH) {
		return { valid: false, reason: `Username must be at most ${MAX_LENGTH} characters.` };
	}

	if (!VALID_PATTERN.test(trimmed)) {
		return { valid: false, reason: 'Only letters, numbers, dots, and underscores are allowed.' };
	}

	if (/^[._]/.test(trimmed) || /[._]$/.test(trimmed)) {
		return { valid: false, reason: 'Username cannot start or end with a dot or underscore.' };
	}

	const lower = trimmed.toLowerCase();
	if (RESERVED_WORDS.some((word) => lower === word || lower.includes(word))) {
		return { valid: false, reason: 'This username is reserved. Please choose another.' };
	}

	if (containsProfanity(trimmed)) {
		return { valid: false, reason: 'This username is not allowed.' };
	}

	return { valid: true };
}

// Minimum age requirement for account creation (COPPA-style baseline — adjust per your jurisdiction/policy).
export const MINIMUM_AGE = 13;

export function validateAge(birthDate: Date): UsernameValidationResult {
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	if (age < MINIMUM_AGE) {
		return { valid: false, reason: `You must be at least ${MINIMUM_AGE} years old to sign up.` };
	}

	return { valid: true };
}