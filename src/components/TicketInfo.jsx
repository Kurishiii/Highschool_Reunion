import { useState } from 'react';

const STRIPE_URL = 'https://buy.stripe.com/test_8x2cN7dt1avMgHU0log3600';

export default function TicketInfo() {
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            Ticket Information
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-teal-500" />
        </div>

        {/* Ticket card */}
        <div className="mx-auto max-w-lg">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Ticket header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-6 text-center text-white">
              <p className="text-sm font-medium uppercase tracking-wider text-teal-100">General Admission</p>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$55</span>
                <span className="text-lg text-teal-100">/ ticket</span>
              </div>
            </div>

            {/* Perforation effect */}
            <div className="relative">
              <div className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-50" />
              <div className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-50" />
              <div className="border-t-2 border-dashed border-gray-200" />
            </div>

            {/* Ticket body */}
            <div className="px-8 py-8">
              <h3 className="mb-4 font-semibold text-gray-900">Your ticket includes:</h3>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Full appetizer bar experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Multi-class reunion celebration</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">An evening of reconnecting with fellow Falcons</span>
                </li>
              </ul>

              <div className="mb-8 rounded-lg bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    Beverages available for purchase at the cash bar.
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center gap-0 rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 text-lg font-bold text-gray-900 bg-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <a
                href={`${STRIPE_URL}?quantity=${quantity}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Purchase {quantity} {quantity === 1 ? 'Ticket' : 'Tickets'} — ${quantity * 55}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
