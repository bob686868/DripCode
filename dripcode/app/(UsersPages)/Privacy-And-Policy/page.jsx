export default function PrivacyPage() {
  return (
    <div className="max-w-3xl bg-neutral-900 mx-auto px-6 py-12 text-neutral-200">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Data Collection</h2>
        <p className="leading-relaxed mb-4">
          We collect information from you when you visit our demo site, including IP addresses and browsing behavior, to improve the user experience of our demonstration.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
        <p className="leading-relaxed">
          Any information collected is used solely for the purpose of demonstrating the capabilities of this e-commerce template. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
        </p>
      </section>
      
      <p className="text-sm text-neutral-500 mt-12 italic">Last updated: January 2026</p>
    </div>
  );
}