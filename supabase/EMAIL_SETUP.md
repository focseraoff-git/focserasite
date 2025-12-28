# ArenaX Email Setup Instructions

## 📧 Email Function Created!

Your Supabase Edge Function has been created at:
**`supabase/functions/send-game-card-email/index.ts`**

## 🚀 Deployment Steps

### Step 1: Install Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

### Step 3: Link Your Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

(Find your project ref in your Supabase dashboard URL)

### Step 4: Set Your Resend API Key

**⚠️ THIS IS WHERE YOU PASTE YOUR RESEND API KEY:**

```bash
supabase secrets set RESEND_API_KEY=re_YourResendAPIKeyHere
```

Replace `re_YourResendAPIKeyHere` with your actual Resend API key from https://resend.com/api-keys

### Step 5: Deploy the Function

```bash
supabase functions deploy send-game-card-email
```

## ✅ Verification

After deployment, test the function from your Supabase dashboard:
1. Go to Edge Functions
2. Find `send-game-card-email`
3. Click "Invoke" to test

## 📝 Email Template Features

Your email includes:
- ✨ ArenaX gilded brown/gold theme
- 🎫 QR codes for each game card
- 📱 Responsive design
- 🎨 Beautiful gradient backgrounds
- 📋 Card details (code, flat number, phone)
- 📖 Clear instructions for users

## 🔧 Customization

To change the sender email from `onboarding@resend.dev`:
1. Verify your domain in Resend
2. Update line 54 in `index.ts`:
   ```typescript
   from: "ArenaX Games <noreply@yourdomain.com>"
   ```

## 🎯 Frontend Integration

The frontend is already configured! The form at:
- `src/components/GameCardBookingForm.tsx`

Will automatically call this function when users book game cards.

---

**🔑 IMPORTANT: Paste your Resend API key in Step 4 above!**
