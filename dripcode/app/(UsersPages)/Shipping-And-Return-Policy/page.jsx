export default function ShippingPage() {
  return (
    <div className="max-w-3xl bg-neutral-900 mx-auto px-6 py-12 text-neutral-200">
      <h1 className="text-4xl font-bold text-white mb-8">Shipping & Return Policy</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Shipping Policy</h2>
        <p className="leading-relaxed mb-4">
          All orders are processed within 2-3 business days. Shipping charges for your order will be calculated and displayed at checkout.
        </p>
        <p className="leading-relaxed">
          While we strive to deliver your items as quickly as possible, please note that this is a <strong>demonstration store</strong> and no physical goods will be shipped.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Return Policy</h2>
        <p className="leading-relaxed mb-4">
          If you are not entirely satisfied with your purchase, we're here to help. You have 30 calendar days to return an item from the date you received it.
        </p>
        <p className="leading-relaxed">
          To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
        </p>
      </section>
    </div>
  );
}