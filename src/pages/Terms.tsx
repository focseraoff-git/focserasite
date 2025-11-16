// Focsera Terms & Conditions + Community Guidelines Page
// Framework: React + TailwindCSS + shadcn/ui (optional) + lucide-react (optional)
// Usage: Drop into your routes as <TermsPage />
// Last Updated: 16 Nov 2025 (Asia/Kolkata)

import React from "react";
import { ShieldCheck, Scale, Users, Link as LinkIcon, Mail } from "lucide-react";

// If you're using Next.js, swap <a> for <Link> where needed.
// Tailwind classes assume you have a base theme configured.

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:py-20">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-neutral-800/60 p-3 ring-1 ring-neutral-700/60">
              <ShieldCheck className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="text-sm tracking-wide text-neutral-400">Legal & Community</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Focsera – Terms & Conditions & Community Guidelines</h1>
              <p className="mt-3 text-sm text-neutral-400">Last Updated: <time dateTime="2025-11-16">16 November 2025</time></p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        {/* Intro */}
        <div className="prose prose-invert prose-neutral max-w-none">
          <p>
            Welcome to <strong>Focsera</strong> (“we,” “our,” or “us”). By accessing or using <strong>www.focsera.in</strong>, you agree to comply with and be bound by the following <strong>Terms & Conditions</strong> and <strong>Community Guidelines</strong>. Please read them carefully before using our services.
          </p>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-neutral-300" aria-hidden />
            <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
          </div>

          <ol className="mt-6 space-y-8 [counter-reset:section]"><li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                1. Acceptance of Terms
              </h3>
              <p className="text-neutral-300">
                By accessing or using Focsera’s website, services, or communication channels, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue using our website and services immediately.
              </p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                2. Services Provided
              </h3>
              <p className="text-neutral-300">Focsera offers a range of creative and digital solutions, including but not limited to:</p>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>Photography &amp; Videography Services</li>
                <li>Website Design &amp; Development</li>
                <li>Branding, Digital Media &amp; Creative Solutions</li>
                <li>Social Media Management</li>
              </ul>
              <p className="text-neutral-300">Each project or service engagement will follow its own quotation, contract, or invoice terms as communicated directly with the client.</p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                3. Intellectual Property
              </h3>
              <p className="text-neutral-300">
                All content available on <strong>Focsera.in</strong>—including but not limited to images, videos, text, logos, designs, and code—is the exclusive property of Focsera, unless otherwise stated. You may not copy, reproduce, distribute, or modify any material without prior written permission from Focsera.
              </p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                4. Payments &amp; Refund Policy
              </h3>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>Advance payments are <strong>non-refundable</strong> once a project or booking is confirmed.</li>
                <li>Refunds are made only if Focsera cancels the project.</li>
                <li>Late payments may incur additional fees.</li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                5. User Responsibilities
              </h3>
              <p className="text-neutral-300">Users agree <span className="underline decoration-neutral-600 underline-offset-4">not</span> to:</p>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>Upload illegal, abusive, harmful, or misleading content.</li>
                <li>Violate copyrights or privacy rights.</li>
                <li>Impersonate individuals or provide false information.</li>
                <li>Disrupt, hack, or misuse the website.</li>
                <li>Engage in fraud or malicious activity.</li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                6. Limitation of Liability
              </h3>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>Focsera is not responsible for indirect or consequential damages.</li>
                <li>We are not liable for loss of data or unauthorized access caused by external factors.</li>
                <li>We do not guarantee uninterrupted website availability and are not liable for downtime or technical errors.</li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                7. External Links Disclaimer
              </h3>
              <p className="text-neutral-300">
                Our website may include links to third-party websites. We are not responsible for their content, security, or privacy practices.
              </p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(section)'.'] [counter-increment:section]">
                8. Termination of Access
              </h3>
              <p className="text-neutral-300">
                We may restrict or terminate access to users who violate our Terms, policies, or harm our platform or community.
              </p>
            </li>
          </ol>
        </div>

        {/* Community Guidelines */}
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-neutral-300" aria-hidden />
            <h2 className="text-2xl font-semibold">Community Guidelines</h2>
          </div>

          <ol className="mt-6 space-y-8 [counter-reset:cg]"><li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">1. Respect &amp; Conduct</h3>
              <p className="text-neutral-300">All community members must behave respectfully. No bullying, harassment, hate speech, or discrimination.</p>
            </li>
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">2. Ethical Sharing</h3>
              <p className="text-neutral-300">Share only content you own or have explicit permission to use.</p>
            </li>
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">3. Professionalism</h3>
              <p className="text-neutral-300">Keep communication polite, constructive, and focused on creative collaboration.</p>
            </li>
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">4. Privacy Protection</h3>
              <p className="text-neutral-300">Do not share private information (yours or others’) without consent.</p>
            </li>
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">5. No Spam or Misuse</h3>
              <p className="text-neutral-300">No spam, unwanted promotions, fake engagement, or harmful links.</p>
            </li>
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content_[counter(cg)'.'] [counter-increment:cg]">6. Enforcement</h3>
              <p className="text-neutral-300">Focsera may remove content or restrict users who violate these guidelines.</p>
            </li>
          </ol>
        </div>

        {/* Contact */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-neutral-300" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Contact</h3>
              <p className="text-neutral-300">Email: <a href="mailto:contact@focsera.in" className="underline decoration-neutral-600 underline-offset-4">contact@focsera.in</a></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LinkIcon className="mt-0.5 h-5 w-5 text-neutral-300" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Website</h3>
              <p className="text-neutral-300"> <a href="https://www.focsera.in" target="_blank" rel="noreferrer" className="underline decoration-neutral-600 underline-offset-4">www.focsera.in</a></p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-neutral-500">
          These Terms & Conditions and Community Guidelines apply to all users of Focsera’s website and services. They may be updated from time to time. Continued use of our services constitutes acceptance of the revised terms.
        </p>
      </section>
    </main>
  );
}
