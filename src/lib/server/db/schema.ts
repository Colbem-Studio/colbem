// src/lib/server/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// ── Better Auth ──────────────────────────────────────────────
// Mirrors what `npx @better-auth/cli generate` would produce for the
// username() + phoneNumber() plugins. If you run that CLI separately,
// diff against this before merging — don't maintain two versions by hand.

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	image: text('image'),
	username: text('username').unique(),
	displayUsername: text('display_username'),
	phoneNumber: text('phone_number').unique(),
	phoneNumberVerified: integer('phone_number_verified', { mode: 'boolean' }).default(false),
	birthMonth: integer('birth_month'),
	birthDay: integer('birth_day'),
	birthYear: integer('birth_year'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	password: text('password'),
	accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
	refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
	scope: text('scope'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const verification = sqliteTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
});

// ── Status ────────────────────────────────────────────────────

export const statusIncidents = sqliteTable('status_incidents', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	status: text('status', { enum: ['operational', 'degraded', 'down'] }).notNull(),
	kind: text('kind', { enum: ['incident', 'maintenance'] }).notNull().default('incident'),
	service: text('service').notNull(),
	startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
	resolvedAt: integer('resolved_at', { mode: 'timestamp' }),
	description: text('description')
});

export const statusPings = sqliteTable('status_pings', {
	id: text('id').primaryKey(),
	service: text('service').notNull(),
	status: text('status', { enum: ['operational', 'degraded', 'down'] }).notNull(),
	latencyMs: integer('latency_ms'),
	checkedAt: integer('checked_at', { mode: 'timestamp' }).notNull()
});

// ── Chat / Calls ──────────────────────────────────────────────

export const channels = sqliteTable('channels', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type', { enum: ['text', 'voice'] }).notNull().default('text'),
	createdBy: text('created_by').notNull().references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const messages = sqliteTable('messages', {
	id: text('id').primaryKey(),
	channelId: text('channel_id').notNull().references(() => channels.id, { onDelete: 'cascade' }),
	senderId: text('sender_id').notNull().references(() => user.id),
	content: text('content').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const calls = sqliteTable('calls', {
	id: text('id').primaryKey(),
	initiatorId: text('initiator_id').notNull().references(() => user.id),
	channelId: text('channel_id').references(() => channels.id),
	status: text('status', { enum: ['ringing', 'active', 'ended'] }).notNull().default('ringing'),
	startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
	endedAt: integer('ended_at', { mode: 'timestamp' })
});

// ── Colbe web app (this repo) ───────────────────────────────────

export const task = sqliteTable('task', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});