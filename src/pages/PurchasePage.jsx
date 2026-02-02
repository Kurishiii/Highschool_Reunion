import { Link } from 'react-router-dom';
import TicketForm from '../components/TicketForm';

export default function PurchasePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-teal-600 transition-colors hover:text-teal-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Event Details
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form section */}
          <div className="lg:col-span-3">
            <div className="card">
              <h1 className="mb-2 font-display text-3xl font-bold text-gray-900">
                Purchase Tickets
              </h1>
              <p className="mb-8 text-gray-500">
                Fill out the form below and you'll be redirected to our secure payment page.
              </p>
              <TicketForm />
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="card bg-gradient-to-br from-teal-600 to-teal-700 text-white">
                <div className="mb-6 flex items-center gap-3">
                  <img src="/falcon.svg" alt="Falcons" className="h-12 w-12" />
                  <div>
                    <h2 className="font-display text-xl font-bold">Feinstein Reunion</h2>
                    <p className="text-sm text-teal-200">Class of Every Year</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-teal-500/30 pt-5">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Saturday, May 23, 2026</p>
                      <p className="text-sm text-teal-200">7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Bar 101</p>
                      <p className="text-sm text-teal-200">1478 Atwood Ave, Johnston, RI 02919</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <div>
                      <p className="font-medium">$55.00 per ticket</p>
                      <p className="text-sm text-teal-200">Includes full appetizer bar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-center text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Powered by Stripe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
