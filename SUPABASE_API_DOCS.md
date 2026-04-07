# Supabase Backend & API Documentation

## Overview

This project uses Supabase as the backend for authentication, authorization, data persistence, and role-based access control. The frontend is built with React + TypeScript and communicates with Supabase via the client at `src/integrations/supabase/client.ts`.

## Supabase Project Structure

The `supabase/` folder contains the database schema and migration files used to configure the backend.

- `supabase/migrations/20260402072840_43dd48e3-5067-4882-908b-7ec5a28ed4d8.sql`
- `supabase/migrations/20260404164504_eff1bbaa-8c54-475d-b36b-df8e2deea965.sql`

The schema includes:

- `app_role` enum (`admin`, `analyst`, `viewer`)
- `profiles` table with active status and display information
- `user_roles` table for role assignments
- `transactions` table for financial records
- `has_role()` role-check function
- RLS policies for profile, role, and transaction access
- triggers for auto-creating profiles and default roles on signup

## Environment Variables

Use `.env.example` as a template. The app requires:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Example:

```env
VITE_SUPABASE_URL=https://xyz123.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1Ni...
```

## Deployment / Local Setup

### Using Supabase CLI

1. Install the CLI if needed:
   - `npm install -g supabase`
2. Create a new Supabase project in the Supabase dashboard.
3. Copy `.env.example` to `.env.local` and fill in your values.
4. Apply the database migrations from the `supabase/migrations` folder.
   - With Supabase CLI: `supabase db push`
   - Or use the Supabase dashboard SQL editor to run the migration SQL files.
5. Start the frontend:
   - `npm install`
   - `npm run dev`

### Recommended Supabase Configuration

- Enable email/password authentication in Supabase Auth.
- Use the provided anon/public key for client-side authentication.
- Keep the service role key secret and do not commit it.

## Database Schema

### `profiles`

- `id` UUID primary key
- `user_id` UUID references `auth.users(id)`
- `display_name` text
- `avatar_url` text
- `is_active` boolean default `true`
- `created_at` and `updated_at` timestamps

### `user_roles`

- `id` UUID primary key
- `user_id` UUID references `auth.users(id)`
- `role` app_role enum

### `transactions`

- `id` UUID primary key
- `user_id` UUID references `auth.users(id)`
- `amount` numeric(12,2)
- `type` text (`income` or `expense`)
- `category` text
- `date` date
- `notes` text
- `is_deleted` boolean default `false`
- `created_at` and `updated_at` timestamps

## Auth Flow and Role Management

- Users sign up via `supabase.auth.signUp()`.
- A trigger creates a `profiles` row and assigns a default `viewer` role.
- User roles are stored in `user_roles` and can be updated by admins.
- Role-based access is enforced with RLS policies and the `public.has_role()` helper.

## Row-Level Security Policies

### Profile policies

- Users can view their own profile.
- Admins can view all profiles.
- Users can update their own profile.
- Users can insert their own profile.
- Admins can update all profiles.

### Role policies

- Users can view their own role.
- Admins can view/manage all roles.

### Transaction policies

- Authenticated users can view non-deleted transactions.
- Admins and analysts can create transactions for their own user.
- Admins can update transactions.
- Admins can delete transactions.

## Frontend API Usage

The application uses Supabase client APIs for authentication and database operations.

### Authentication

- `supabase.auth.signUp(email, password, options)`
- `supabase.auth.signInWithPassword(email, password)`
- `supabase.auth.signOut()`

### Database operations

- `supabase.from('profiles').select()`
- `supabase.from('profiles').update({ is_active })`
- `supabase.from('user_roles').select()`
- `supabase.from('user_roles').update({ role })`
- `supabase.from('transactions').select()`
- `supabase.from('transactions').insert(data)`
- `supabase.from('transactions').update(data)`
- `supabase.from('transactions').update({ is_deleted: true })`

## Notes

- This repository uses Supabase as the backend, so there is no separate Node/Express API server in this codebase.
- The backend is implemented through Supabase-managed database tables, authentication, and RLS policies.
- If you want, I can also help prepare an API documentation page with Swagger-style endpoints and example requests.
