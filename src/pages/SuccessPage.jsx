import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState('sending');

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Call backend to verify the paid session and send confirmation email
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to verify session');
        return res.json();
      })
      .then((data) => {
        setPurchaseData(data);
        setEmailStatus('sent');
        setLoading(false);
        sessionStorage.removeItem('purchaseData');
      })
      .catch((err) => {
        console.error('Verify session error:', err);
        // Fall back to sessionStorage data
        const stored = sessionStorage.getItem('purchaseData');
        if (stored) {
          setPurchaseData(JSON.parse(stored));
          sessionStorage.removeItem('purchaseData');
        }
        setEmailStatus('failed');
        setLoading(false);
      });
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <div className="card text-center">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
            <svg className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 font-display text-3xl font-bold text-gray-900">
            Purchase Confirmed!
          </h1>
          <p className="mb-8 text-gray-500">
            Thank you for your purchase. A confirmation email is on its way.
          </p>

          {/* Loading state */}
          {loading && (
            <div className="mb-8 flex items-center justify-center gap-2 text-gray-500">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm">Confirming your order...</span>
            </div>
          )}

          {/* Order details */}
          {purchaseData && (
            <div className="mb-8 rounded-xl bg-gray-50 p-6 text-left">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="font-medium text-gray-900">{purchaseData.fullName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-gray-900">{purchaseData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tickets</dt>
                  <dd className="font-medium text-gray-900">{purchaseData.quantity}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <dt className="text-lg font-semibold text-gray-900">Total Paid</dt>
                  <dd className="text-lg font-bold text-teal-600">${purchaseData.totalPrice}.00</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Confirmation number */}
          {purchaseData?.confirmationId && (
            <div className="mb-8 rounded-lg bg-teal-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-teal-600">Confirmation Reference</p>
              <p className="mt-1 font-mono text-sm text-teal-800 break-all">{purchaseData.confirmationId}</p>
            </div>
          )}

          {/* Event reminder */}
          <div className="mb-8 rounded-xl border-2 border-dashed border-gray-200 p-6">
            <img src="/falcon.svg" alt="Falcons" className="mx-auto mb-4 h-16 w-16" />
            <h3 className="mb-3 font-display text-xl font-bold text-gray-900">
              Feinstein High School Reunion 2026
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Saturday, May 23, 2026 at 7:00 PM
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bar 101, 1478 Atwood Ave, Johnston, RI 02919
              </p>
              <p className="mt-3 text-xs text-gray-400">
                Includes full appetizer bar &bull; Beverages available at cash bar
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>

          {/* Email status */}
          {emailStatus === 'sent' && (
            <p className="mt-6 text-xs text-gray-400">
              A confirmation email has been sent to your email address.
              If you don't see it, please check your spam folder.
            </p>
          )}
          {emailStatus === 'failed' && (
            <p className="mt-6 text-xs text-gray-400">
              We couldn't send a confirmation email right now. Your purchase is still confirmed —
              contact{' '}
              <a href="mailto:falconsreunioncommittee@gmail.com" className="text-teal-500 underline">
                falconsreunioncommittee@gmail.com
              </a>{' '}
              if you need a copy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
