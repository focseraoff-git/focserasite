import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "Is the event open to non-residents?",
    answer: "No. ArenaX is exclusively for the gated community residents. Security teams will verify resident access at entry points.",
  },
  {
    question: "Are there medals, trophies, or certificates?",
    answer: "No. ArenaX focuses purely on fun and participation. Winners receive redeemable prizes instead.",
  },
  {
    question: "Do I need to register online?",
    answer: "No online registration is required. Just visit the game zone, pay the entry price, and participate. However, residents can optionally book Game Cards in advance for convenience.",
  },
  {
    question: "Can I join multiple games?",
    answer: "Yes, you can experience any number of games as long as you pay the respective entry fee for each game.",
  },
  {
    question: "Are the games suitable for children?",
    answer: "Yes. Most games are child-friendly, and volunteers will guide participants accordingly. Children should be supervised by parents during age-sensitive activities.",
  },
  {
    question: "What do I need to bring?",
    answer: "Just bring yourself and your enthusiasm! Each game has its own entry price, payable on the spot. Comfortable clothing and shoes are recommended.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Everything you need to know about ArenaX
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card/30 backdrop-blur-sm data-[state=open]:border-gold/30 data-[state=open]:shadow-[0_0_30px_hsl(45_70%_47%/0.1)] transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-heading text-lg hover:text-gold transition-colors py-6 [&[data-state=open]]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
