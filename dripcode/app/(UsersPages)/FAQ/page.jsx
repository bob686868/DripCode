export default function FAQPage() {
  const faqs = [
    {
      q: "Is this a real store?",
      a: "No, this is a demonstration of the Vercel Commerce template. No actual transactions take place."
    },
    {
      q: "Can I use this template for my own project?",
      a: "Yes! This template is open-source and available for anyone to use as a starting point for their Next.js projects."
    },
    {
      q: "What technologies are used?",
      a: "This demo is built using Next.js, Tailwind CSS, and is designed to be deployed on Vercel."
    }
  ];

  return (
    <div className="max-w-3xl bg-neutral-900 mx-auto px-6 py-12 text-neutral-200">
      <h1 className="text-4xl font-bold text-white mb-8">FAQ</h1>
      
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-neutral-800 pb-6">
            <h2 className="text-xl font-medium text-white mb-2">{faq.q}</h2>
            <p className="text-neutral-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}