import { useState } from 'react';

const faqs = [
  {
    question: 'What is healthcare staffing?',
    answer:
      'Healthcare staffing involves the process of recruiting and placing qualified medical professionals—such as nurses, physicians, and technicians—into clinical roles on a temporary, per diem, or permanent basis to ensure healthcare facilities maintain optimal care standards.',
    defaultOpen: true,
  },
  {
    question: 'How fast can you provide staff?',
    answer:
      'For urgent requests, we can often match and confirm placement within 2 to 24 hours. Our nationwide network of pre-verified professionals allows us to respond much faster than traditional agencies.',
    defaultOpen: false,
  },
  {
    question: 'Are your professionals licensed and insured?',
    answer:
      'Yes, 100%. Every professional on HealLink goes through a rigorous vetting process that includes license verification with state boards, criminal background checks, and professional liability insurance confirmation.',
    defaultOpen: false,
  },
];

function FAQItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-6 cursor-pointer font-bold text-on-surface text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span
          className="material-symbols-outlined transition-transform duration-200 flex-shrink-0 ml-4"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-headline font-extrabold text-center mb-12 text-on-surface">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  );
}
