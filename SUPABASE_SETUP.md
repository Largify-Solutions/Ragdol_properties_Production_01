# 🚀 Supabase Setup Guide

Your app has been successfully migrated from Firebase to Supabase! Follow these steps to get everything running.

## Option 1: Local Development (Recommended for Testing)

### Step 1: Start Supabase Locally
```bash
# Install Supabase CLI if you haven't already
brew install supabase/tap/supabase

# Start Supabase (this will start PostgreSQL, Auth, Storage, etc.)
supabase start
```

### Step 2: Get Your Local Credentials
```bash
# Get your local connection details
supabase status
```

You'll see output like:
```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Anon key: eyJhbGc...
Service role key: eyJhbGc...
```

### Step 3: Create .env.local
```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` with your local values:
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste-your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<paste-your-service-role-key>
```

### Step 4: Run the Migration
```bash
# Apply the database schema
supabase db push
```

### Step 5: Start Your App
```bash
npm run dev
```

---

## Option 2: Hosted Supabase (Production)

### Step 1: Create a Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details and wait for setup to complete

### Step 2: Get Your Project Credentials
1. Go to Project Settings → API
2. Copy your:
   - Project URL (looks like `https://xxxxx.supabase.co`)
   - `anon` public key
   - `service_role` key (keep this secret!)

### Step 3: Create .env.local
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 4: Run the Migration
```bash
# Login to Supabase CLI
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

### Step 5: Start Your App
```bash
npm run dev
```

---

## Troubleshooting

### "Error fetching partners/testimonials: {}"
This means Supabase isn't connected. Check:
1. ✅ `.env.local` file exists with correct values
2. ✅ Supabase is running (`supabase status`)
3. ✅ Database migration has been applied (`supabase db push`)
4. ✅ Restart your Next.js dev server after adding `.env.local`

### Check Supabase Connection
```bash
# Check if Supabase is running
supabase status

# View database tables
supabase db dump --schema public

# View logs
supabase logs
```

### Reset Everything (if needed)
```bash
# Stop Supabase
supabase stop

# Remove all data
supabase db reset

# Start fresh
supabase start
supabase db push
```

---

## What's Been Migrated

✅ **Database Schema** - 34 tables with RLS policies
✅ **Authentication** - Supabase Auth (replaces Firebase Auth)
✅ **Storage** - Supabase Storage buckets (replaces Firebase Storage)
✅ **API Routes** - All 42 routes now use Supabase
✅ **Pages** - All 28 page components migrated
✅ **Components** - All 8 shared components migrated

## Next Steps

1. Set up your `.env.local` file (see above)
2. Run the database migration
3. (Optional) Seed some test data
4. Test all features:
   - User registration/login
   - Admin dashboard
   - Agent portal
   - Property listings
   - Enquiry forms

Need help? Check the Supabase docs: https://supabase.com/docs
