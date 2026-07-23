// src/routes/api/auth/[...all]/+server.ts
import { auth } from '$lib/server/auth.js';

export const GET = (event: { request: Request }) => auth.handler(event.request);
export const POST = (event: { request: Request }) => auth.handler(event.request);