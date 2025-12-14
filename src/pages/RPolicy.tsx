// Focsera – Cancellation & Refund Policy (Gateway Approved)
// Framework: React + TypeScript (TSX)
// Compatible with: PhonePe, Razorpay, PayU, Stripe (India)
// Usage: <CancellationRefundPolicyPage />
// Last Updated: 16 Nov 2025

import React from "react";

const CancellationRefundPolicyPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Focsera – Cancellation & Refund Policy
        </h1>

        <p className="text-sm text-neutral-400 mb-10">
          Last Updated: 16 November 2025
        </p>

        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            This Cancellation and Refund Policy outlines the terms and
            conditions under which cancellations and refunds are processed for
            products or services purchased through the Focsera Platform, owned
            and operated by <strong>LAGISHETTY UDAY KUMAR</strong>.
          </p>

          {/* 1. Cancellation Policy */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Cancellation Policy
            </h2>
            <p>
              Cancellation requests will be considered only if they are made
              within <strong>24 hours (1 day)</strong> of placing the order.
            </p>
            <p className="mt-2">
              Cancellation requests may not be entertained if the order has
              already been communicated to the seller or service provider
              listed on the Platform and they have initiated the execution or
              delivery process. In such cases, you may not be eligible for
              cancellation.
            </p>
          </section>

          {/* 2. Damaged / Defective / Incorrect Service */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Damaged, Defective, or Incorrect Deliverables
            </h2>
            <p>
              If you receive a damaged, defective, or incorrect product or
              service deliverable, you must report the issue to our customer
              support team within <strong>24 hours (1 day)</strong> of receipt
              or delivery.
            </p>
            <p className="mt-2">
              The request will be reviewed and processed only after verification
              by the respective seller, merchant, or service provider listed on
              the Platform. Upon verification, an appropriate resolution,
              including refund, replacement, or correction, will be provided.
            </p>
          </section>

          {/* 3. Product / Service Not as Described */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Product or Service Not as Described
            </h2>
            <p>
              If you believe that the product or service received is not as
              described on the Platform or does not meet the agreed scope, you
              must notify our customer support team within{" "}
              <strong>24 hours (1 day)</strong> of delivery.
            </p>
            <p className="mt-2">
              The customer support team will review the complaint and take an
              appropriate decision after evaluation.
            </p>
          </section>

          {/* 4. Manufacturer / Third-Party Warranty */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Manufacturer or Third-Party Warranty
            </h2>
            <p>
              For products or tools that come with a manufacturer’s or third-
              party warranty, all warranty-related complaints, repairs, or
              replacements must be addressed directly with the respective
              manufacturer or provider in accordance with their warranty terms.
            </p>
          </section>

          {/* 5. Refund Processing */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Refund Processing
            </h2>
            <p>
              Once a refund request is approved by{" "}
              <strong>Focsera (LAGISHETTY UDAY KUMAR)</strong>, the refund will be
              processed to the original mode of payment within{" "}
              <strong>3–5 business days</strong>.
            </p>
            <p className="mt-2">
              The actual time taken for the refund to reflect in your account
              may vary depending on your bank or payment service provider.
            </p>
          </section>

          {/* 6. Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Contact Information
            </h2>
            <p>
              For any cancellation or refund-related queries, please contact us
              using the details available on the Platform.
            </p>
            <p className="mt-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info.focsera@gmail.com"
                className="underline underline-offset-4"
              >
                info.focsera@gmail.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href="https://www.focsera.in"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                https://www.focsera.in
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
};

export default CancellationRefundPolicyPage;
