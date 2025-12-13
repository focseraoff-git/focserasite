// Focsera Refund & Cancellation Policy Page
// Framework: React + TailwindCSS + lucide-react
// Usage: Drop into your routes as <RefundPolicyPage />
// Last Updated: 16 Nov 2025 (Asia/Kolkata)

import React from "react";
import { RotateCcw, CreditCard, AlertTriangle, Mail } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:py-20">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-neutral-800/60 p-3 ring-1 ring-neutral-700/60">
              <RotateCcw className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="text-sm tracking-wide text-neutral-400">Legal & Payments</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Focsera – Refund & Cancellation Policy
              </h1>
              <p className="mt-3 text-sm text-neutral-400">
                Last Updated:{" "}
                <time dateTime="2025-11-16">16 November 2025</time>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        {/* Intro */}
        <div className="prose prose-invert prose-neutral max-w-none">
          <p>
            This <strong>Refund & Cancellation Policy</strong> explains how
            payments, cancellations, and refunds are handled at{" "}
            <strong>Focsera</strong> (“we,” “our,” or “us”). By booking or
            purchasing any of our services, you agree to this policy in full.
          </p>
        </div>

        {/* Refund Policy */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-neutral-300" aria-hidden />
            <h2 className="text-2xl font-semibold">Refund Policy</h2>
          </div>

          <ol className="mt-6 space-y-8 [counter-reset:section]">
            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                1. Advance Payments
              </h3>
              <p className="text-neutral-300">
                All advance payments made to Focsera are{" "}
                <strong>non-refundable</strong>. Once a booking or project is
                confirmed, the advance amount secures time, resources, and
                creative effort.
              </p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                2. Project-Based Services
              </h3>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>
                  Payments for photography, videography, design, development,
                  and branding projects are non-refundable once work has begun.
                </li>
                <li>
                  Partial refunds are <strong>not applicable</strong> for
                  partially completed work.
                </li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                3. Cancellation by Client
              </h3>
              <p className="text-neutral-300">
                If a client cancels a service after confirmation:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>No refund will be issued for any payments made.</li>
                <li>
                  Any outstanding balance for completed or committed work must
                  still be cleared.
                </li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                4. Cancellation by Focsera
              </h3>
              <p className="text-neutral-300">
                In the rare event that Focsera cancels a project or service:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-neutral-300">
                <li>
                  A <strong>full refund</strong> of the amount paid will be
                  processed.
                </li>
                <li>
                  Refunds will be issued to the original payment method where
                  possible.
                </li>
              </ul>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                5. Digital Products & Deliverables
              </h3>
              <p className="text-neutral-300">
                Once digital assets, files, links, or deliverables are shared
                with the client, the service is considered fulfilled and{" "}
                <strong>no refunds</strong> will be provided.
              </p>
            </li>

            <li className="space-y-3">
              <h3 className="text-lg font-semibold before:mr-2 before:font-mono before:text-neutral-400 before:content-[counter(section)'.'] [counter-increment:section]">
                6. Payment Disputes & Chargebacks
              </h3>
              <p className="text-neutral-300">
                Initiating a chargeback or payment dispute without prior
                communication may result in immediate service suspension and
                permanent restriction from future services.
              </p>
            </li>
          </ol>
        </div>

        {/* Important Notes */}
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-neutral-300" aria-hidden />
            <h2 className="text-2xl font-semibold">Important Notes</h2>
          </div>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-neutral-300">
            <li>
              Refund timelines may vary depending on the payment gateway or bank
              (typically 5–10 business days).
            </li>
            <li>
              Prices, scope, and payment terms may differ per project and will
              be defined in official quotations or agreements.
            </li>
            <li>
              This policy applies alongside Focsera’s Terms & Conditions.
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-neutral-300" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Refund Queries</h3>
              <p className="text-neutral-300">
                For any questions regarding refunds or cancellations, contact us
                at{" "}
                <a
                  href="mailto:contact@focsera.in"
                  className="underline decoration-neutral-600 underline-offset-4"
                >
                  info.focsera@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-neutral-500">
          This Refund & Cancellation Policy may be updated periodically. Continued
          use of Focsera’s services indicates acceptance of the latest version.
        </p>
      </section>
    </main>
  );
}
