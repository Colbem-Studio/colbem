// src/lib/client/consoleWarning.ts
// Prints a large styled warning in the browser DevTools console to deter
// "self-XSS" social engineering (tricking users into pasting malicious code).

export function printConsoleWarning() {
	if (typeof window === 'undefined') return;

	const bigText = [
		'  _______      _________      _____       ______     _',
		' / _____ \\    |____ ____|    / ___ \\     | ____ \\   | |',
		'/ /     \\_\\       | |       / /   \\ \\    | |   \\ \\  | |',
		'| |               | |      / /     \\ \\   | |   | |  | |',
		'\\ \\______         | |      | |     | |   | |___/ /  | |',
		' \\______ \\        | |      | |     | |   |  ____/   | |',
		'        \\ \\       | |      | |     | |   | |        | |',
		' _      | |       | |      \\ \\     / /   | |        |_|',
		'\\ \\_____/ /       | |       \\ \\___/ /    | |         _',
		' \\_______/        |_|        \\_____/     |_|        |_|'
	].join('\n');

	console.log(
		`%c${bigText}`,
		'color:#3b82f6; font-family: monospace; font-weight: bold; font-size: 12px;'
	);

	console.log(
		'%cKeep your account safe!',
		"color:#3b82f6; font-family: 'Builder Sans', sans-serif; font-size: 24px; font-weight: bold;"
	);

	console.log(
		'%cDo not send any information from here to anyone or paste any text here.\n' +
			"If someone is asking you to copy or paste text here, then you're giving " +
			'someone access to your account, your messages, and your servers.',
		"color:#f3f4f6; font-family: 'Builder Sans', sans-serif; font-size: 14px; line-height: 1.5;"
	);

	console.log(
		'%cLearn more: https://colbe.cc/privacy',
		"color:#3b82f6; font-family: 'Builder Sans', sans-serif; font-size: 13px; text-decoration: underline;"
	);
}