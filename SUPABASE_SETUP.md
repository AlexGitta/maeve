# Supabase Waitlist Setup Guide

This guide will help you set up Supabase for your waitlist feature.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: maeve-waitlist (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait for it to set up (~2 minutes)

## Step 2: Create the Waitlist Table

1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public signup)
CREATE POLICY "Anyone can join waitlist"
ON waitlist FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow reading (optional, for admin dashboard later)
CREATE POLICY "Service role can read waitlist"
ON waitlist FOR SELECT
TO authenticated
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
```

4. Click **"Run"** to execute the query
5. You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

## Step 4: Configure Environment Variables

### For Local Development:

1. Create a `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual credentials from Step 3

### For GitHub Pages Deployment:

Since GitHub Pages only serves static files, you need to build with environment variables:

**Option 1: GitHub Actions Secrets (Recommended)**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add two secrets:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`, Value: your-supabase-url
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: your-anon-key

5. Update your GitHub Actions workflow to use these secrets during build:

```yaml
# In your .github/workflows/*.yml file
- name: Build
  env:
    NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
  run: npm run build
```

**Option 2: Build Locally and Commit**

1. Set environment variables locally in `.env.local`
2. Run `npm run build`
3. Deploy the `out` folder to GitHub Pages

⚠️ **Note**: Environment variables are baked into the static build, so the anon key will be visible in your JavaScript bundle. This is OK because:
- The anon key is designed to be public
- Row Level Security policies protect your data
- Only INSERT is allowed (users can't read/delete data)

## Step 5: Test Your Setup

1. Run your app locally: `npm run dev`
2. Try submitting an email
3. Check the Supabase dashboard:
   - Click **"Table Editor"** in the left sidebar
   - Click **"waitlist"** table
   - You should see your email entry!

## Step 6: View Your Waitlist

To see all emails in your waitlist:

1. Go to Supabase Dashboard → **Table Editor** → **waitlist**
2. You'll see all signups with timestamps

To export as CSV:
1. Click the **"..."** menu in the table view
2. Select **"Download as CSV"**

## Optional: Set Up Welcome Emails

To send welcome emails when someone joins, you can:

### Option A: Supabase Edge Function + Resend

1. Install Resend account and get API key
2. Create a Supabase Edge Function:

```bash
supabase functions new send-welcome-email
```

3. Add this code to trigger on new waitlist entries
4. Deploy the function

### Option B: Use Supabase Webhooks

1. Use a service like Zapier or Make.com
2. Connect to Supabase webhook
3. Trigger email on new row in waitlist table

## Troubleshooting

**Error: "Invalid API key"**
- Double-check your environment variables
- Make sure you're using the **anon** key, not the service_role key
- Restart your dev server after changing `.env.local`

**Error: "Insert failed"**
- Check that the table was created correctly
- Verify Row Level Security policy exists
- Check browser console for detailed error

**Duplicate email error doesn't show**
- This is expected! The code handles it with a user-friendly message
- Postgres error code 23505 is caught and displays "You're already on the waitlist!"

## Next Steps

- Set up email notifications (see Optional section above)
- Create an admin dashboard to view signups
- Add analytics to track conversion rates
- Export emails for your email marketing platform

## Security Notes

✅ **Safe to expose**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

❌ **NEVER expose**:
- Database password
- `service_role` key
- Any other secret keys

The Row Level Security (RLS) policies ensure that users can only insert their email, not read or modify other data.
