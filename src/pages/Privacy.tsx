// Focsera Privacy Policy Page (TSX)
// Framework: React + TailwindCSS
// Usage: <PrivacyPolicyPage />
// Last Updated: 16 Nov 2025

import React from "react";
import { Lock, Shield, Mail, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:py-20">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-neutral-800/60 p-3 ring-1 ring-neutral-700/60">
              <Lock className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="text-sm tracking-wide text-neutral-400">Legal Policy</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Focsera – Privacy Policy</h1>
              <p className="mt-3 text-sm text-neutral-400">Last Updated: <time dateTime="2025-11-16">16 November 2025</time></p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <div className="prose prose-invert prose-neutral max-w-none">
          <h2>1. Introduction</h2>
          <p>Your privacy is important to us. This Privacy Policy explains how <strong>Focsera</strong> collects, uses, stores, and protects your data.</p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Account details</li>
            <li>Communication history</li>
          </ul>

          <h3>2.2 Website Usage Data</h3>
          <ul>
            <li>Pages visited</li>
            <li>Click activity</li>
            <li>Browser/device information</li>
            <li>Cookies and analytics data</li>
          </ul>

          <h3>2.3 Google Account Data (if using Google Login or API services)</h3>
          <p>Only with your explicit permission, we may access:</p>
          <ul>
            <li>Google Profile name</li>
            <li>Google email address</li>
            <li>Profile photo</li>
            <li>OAuth user ID</li>
            <li>Any additional data shown on the Google consent screen</li>
          </ul>
          <p>We do not access data unless you authorize it.</p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>Provide and improve our services</li>
            <li>Allow login and account creation</li>
            <li>Send service updates and communications</li>
            <li>Personalize user experience</li>
            <li>Enhance website functionality</li>
            <li>Maintain security and prevent misuse</li>
          </ul>
          <p><strong>We do not sell personal data or Google user data.</strong></p>

          <h2>4. Data Sharing</h2>
          <p>We only share data with:</p>
          <ul>
            <li>Trusted service providers (hosting, email, authentication)</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p>We never share data for advertising or marketing without consent.</p>

          <h2>5. Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>Analytics</li>
            <li>Functionality</li>
            <li>Site performance</li>
          </ul>
          <p>Users may disable cookies in their browser settings.</p>

          <h2>6. Google User Data Policy</h2>
          <p>(Required for Google OAuth, YouTube API, Gmail API, Calendar API, or any Google integration.)</p>

          <h3>6.1 What Google Data We Access</h3>
          <p>Only what you approve through Google’s OAuth consent screen.</p>

          <h3>6.2 How We Use Google Data</h3>
          <ul>
            <li>Create/verify your account</li>
            <li>Personalize your profile</li>
            <li>Communicate important updates</li>
            <li>Improve service functionality</li>
          </ul>
          <p>We never:</p>
          <ul>
            <li>Sell Google data</li>
            <li>Use it for ads without permission</li>
            <li>Share it with third parties except secure infrastructure providers</li>
          </ul>

          <h3>6.3 Data Storage & Protection</h3>
          <ul>
            <li>HTTPS/SSL encryption</li>
            <li>Secure servers</li>
            <li>Access-controlled databases</li>
            <li>Regular security monitoring</li>
          </ul>
          <p>Google data is not stored in plain text.</p>

          <h3>6.4 Data Retention & Deletion</h3>
          <ul>
            <li>Data is retained only as long as needed for services.</li>
            <li>If you delete your Focsera account, all linked Google data is permanently removed.</li>
          </ul>

          <h4>How to Request Deletion</h4>
          <p>Email: <a href="mailto:info.focsera@gmail.com" className="underline">info.focsera@gmail.com</a></p>
          <p>We process deletion requests within 7–14 business days.</p>

          <h2>7. User Rights</h2>
          <ul>
            <li>Request access to their data</li>
            <li>Request corrections</li>
            <li>Request deletion</li>
            <li>Withdraw Google permissions via: Google Account → Security → Third-Party App Access</li>
            <li>Opt out of non-essential communication</li>
          </ul>

          <h2>8. Contact Information</h2>
          <p>For privacy-related questions or data deletion requests:</p>
          <ul>
            <li>Email: <a href="mailto:info.focsera@gmail.com" className="underline">info.focsera@gmail.com</a></li>
            <li>Website: <a href="https://www.focsera.in" target="_blank" rel="noreferrer" className="underline">www.focsera.in</a></li>
          </ul>
        </div>

        <div className="mt-12 grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-neutral-300" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Contact</h3>
              <p className="text-neutral-300">info.focsera@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="mt-0.5 h-5 w-5 text-neutral-300" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Website</h3>
              <p className="text-neutral-300"><a href="https://www.focsera.in" target="_blank" rel="noreferrer" className="underline">www.focsera.in</a></p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-neutral-500">This Privacy Policy outlines how Focsera manages user data responsibly. By using our services, you agree to this policy. Updates may occur periodically without prior notice.</p>
      </section>
    </main>
  );
}
