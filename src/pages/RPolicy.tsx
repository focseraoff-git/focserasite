// Focsera Refund & Cancellation Policy Page
// Framework: React + TypeScript (TSX)
// Usage: <RefundCancellationPolicyPage />
// Last Updated: 16 Nov 2025

import React from "react";

const RefundCancellationPolicyPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Focsera – Refund & Cancellation Policy
        </h1>

        <p className="text-sm text-neutral-400 mb-10">
          Last Updated: 16 November 2025
        </p>

        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            This Refund and Cancellation Policy outlines how you can cancel or
            seek a refund for a product or service that you have purchased
            through the Platform. Under this policy:
          </p>

          <p>
            Cancellations will only be considered if the request is made within{" "}
            <strong>1 day</strong> of placing the order. However, cancellation
            requests may not be entertained if the orders have been communicated
            to the sellers or merchant(s) listed on the Platform and they have
            initiated the process of shipping, or if the product is out for
            delivery. In such cases, you may choose to reject the product at the
            doorstep.
          </p>

          <p>
            <strong>LAGISHETTY UDAY KUMAR</strong> does not accept cancellation
            requests for perishable items such as flowers, eatables, or similar
            products. However, a refund or replacement may be considered if the
            user establishes that the quality of the product delivered is not
            satisfactory.
          </p>

          <p>
            In case of receipt of damaged or defective items, please report the
            issue to our customer service team. Such requests will be
            entertained only after the seller or merchant listed on the
            Platform has verified and confirmed the issue at their end. This
            must be reported within <strong>1 day</strong> of receipt of the
            product.
          </p>

          <p>
            If you believe that the product received is not as shown on the
            website or does not meet your expectations, you must notify our
            customer service team within <strong>1 day</strong> of receiving the
            product. After reviewing your complaint, the customer service team
            will take an appropriate decision.
          </p>

          <p>
            For products that come with a manufacturer’s warranty, any
            complaints or issues should be addressed directly to the respective
            manufacturer, in accordance with their warranty terms.
          </p>

          <p>
            In case any refunds are approved by{" "}
            <strong>LAGISHETTY UDAY KUMAR</strong>, the refund amount will be
            processed within <strong>3–5 business days</strong> to the original
            mode of payment.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RefundCancellationPolicyPage;
