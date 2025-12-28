# Creating Admin Users (Volunteers & Organisers)

Since we're using Supabase Auth for admin authentication, you need to create users in two steps:

## Method 1: Via Supabase Dashboard (Recommended)

### Step 1: Create Auth User
1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add User" (or "Invite User")
3. Enter:
   - Email: `volunteer1@example.com`
   - Auto-generate password (or set a temporary one)
4. Click "Create User"
5. **Copy the UUID** from the user list

### Step 2: Add to admin_users Table
Go to SQL Editor and run:
```sql
-- For a Volunteer
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES (
    'PASTE_UUID_HERE'::uuid, 
    'volunteer1@example.com', 
    'John Doe', 
    'volunteer'
);

-- For an Organiser
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES (
    'PASTE_UUID_HERE'::uuid, 
    'organiser1@example.com', 
    'Jane Smith', 
    'organiser'
);
```

## Method 2: Quick Test Users (SQL Only)

Run this in SQL Editor to create test accounts:

```sql
-- This creates users directly (for testing only)
-- In production, use Method 1 for proper password setup

DO $$
DECLARE
    v_volunteer_id UUID;
    v_organiser_id UUID;
BEGIN
    -- Note: These will need passwords set via Supabase Dashboard
    -- This just creates placeholder records
    
    INSERT INTO public.admin_users (email, full_name, role)
    VALUES 
        ('testvolunteer@focsera.in', 'Test Volunteer', 'volunteer'),
        ('testorganiser@focsera.in', 'Test Organiser', 'organiser')
    RETURNING id INTO v_volunteer_id;
    
    RAISE NOTICE 'Created test users. Set passwords via Supabase Dashboard';
END $$;
```

## Setting/Resetting Passwords

Users can reset their passwords via:
1. Supabase Dashboard → Authentication → Users → (click user) → "Send Password Recovery"
2. Or implement a "Forgot Password" flow in your app

## Testing Login

1. **Volunteer Dashboard**: `http://localhost:5173/arenax/admin/scan`
   - Use volunteer email/password
   
2. **Organiser Dashboard**: `http://localhost:5173/arenax/admin/reports`
   - Use organiser email/password

## Example Test Accounts

After setup, you might have:
- **Volunteers:**
  - `volunteer1@focsera.in` / `password123`
  - `volunteer2@focsera.in` / `password123`
  
- **Organisers:**
  - `organiser@focsera.in` / `admin123`
