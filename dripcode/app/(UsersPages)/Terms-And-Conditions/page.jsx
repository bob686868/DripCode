import React from 'react'

const page = () => {
  return (
<div className="max-w-3xl mx-auto px-6 py-12 bg-neutral-900 text-neutral-200">
      <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
      
      <p className="mb-6">
        Welcome to our Demo Store. These Terms and Conditions outline the rules and regulations for the use of this website. 
        <strong> Please note: This is a demonstration store. No actual orders will be fulfilled.</strong>
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Use of the Site</h2>
        <p className="leading-relaxed mb-4">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use the Demo Store if you do not agree to take all of the terms and conditions stated on this page.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property</h2>
        <p className="leading-relaxed mb-4">
          Unless otherwise stated, we or our licensors own the intellectual property rights for all material on the Demo Store. All intellectual property rights are reserved.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">3. Limitation of Liability</h2>
        <p className="leading-relaxed mb-4">
          In no event shall the Demo Store, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">4. Governing Law</h2>
        <p className="leading-relaxed mb-4">
          These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which the store operator resides, and you submit to the non-exclusive jurisdiction of the state and federal courts for the resolution of any disputes.
        </p>
      </section>

      <p className="text-sm text-neutral-500 mt-12 italic">
        Last updated: January 30, 2026
      </p>
    </div>
  )
}

export default page
