// src/lib/client/turnstile.ts
// Client-side helper for rendering and resetting Cloudflare Turnstile widgets.
// Requires the Turnstile script loaded in app.html:
// <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

declare global {
	interface Window {
		turnstile?: {
			render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId?: string) => void;
			getResponse: (widgetId?: string) => string | undefined;
		};
	}
}

interface TurnstileRenderOptions {
	sitekey: string;
	callback?: (token: string) => void;
	'error-callback'?: () => void;
	'expired-callback'?: () => void;
	theme?: 'light' | 'dark' | 'auto';
}

// Public site key — safe to expose client-side (pair with a secret key server-side for verification).
const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;

export function renderTurnstile(
	container: HTMLElement,
	onSuccess: (token: string) => void,
	onError?: () => void
): string | undefined {
	if (typeof window === 'undefined' || !window.turnstile) {
		console.warn('Turnstile script not loaded yet.');
		return undefined;
	}

	if (!TURNSTILE_SITE_KEY) {
		console.warn('PUBLIC_TURNSTILE_SITE_KEY is not set.');
		return undefined;
	}

	return window.turnstile.render(container, {
		sitekey: TURNSTILE_SITE_KEY,
		callback: onSuccess,
		'error-callback': onError,
		'expired-callback': onError,
		theme: 'auto'
	});
}

export function resetTurnstile(widgetId?: string) {
	window.turnstile?.reset(widgetId);
}