// src/lib/types.ts
export interface ConsolePingResult {
	service: string;
	status: 'operational' | 'degraded' | 'down';
	latencyMs: number | null;
	checkedAt: number;
}

export interface ConsoleIncident {
	id: string;
	title: string;
	status: 'operational' | 'degraded' | 'down';
	kind: 'incident' | 'maintenance';
	service: string;
	startedAt: number;
	resolvedAt: number | null;
	description: string | null;
}

export interface SendVerificationCodeRequest {
	phone: string;
}

export interface SendVerificationCodeResponse {
	success: boolean;
	// TODO: confirm actual response shape — this is a guess
}

export interface VerifyCodeRequest {
	phone: string;
	code: string;
}

export interface VerifyCodeResponse {
	success: boolean;
	// TODO: confirm actual response shape — this is a guess
}

export interface ConsoleApiError {
	error: string;
	status: number;
}