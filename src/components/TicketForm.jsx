import { useState } from 'react';

const TICKET_PRICE = 55;

export default function TicketForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1,
    gradYear: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = formData.quantity * TICKET_PRICE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full name is required.';
    if (!formData.email.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.phone.trim()) return 'Phone number is required.';
    if (!/^[\d\s\-\(\)\+]{7,}$/.test(formData.phone)) return 'Please enter a valid phone number.';
    if (formData.quantity < 1 || formData.quantity > 10) return 'Please select between 1 and 10 tickets.';
    if (!formData.gradYear.trim()) return 'Graduation year is required.';
    if (!/^\d{4}$/.test(formData.gradYear.trim())) return 'Please enter a valid 4-digit graduation year.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Store form data in sessionStorage for the success page
      sessionStorage.setItem('purchaseData', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        quantity: formData.quantity,
        totalPrice,
      }));

      // Call backend to create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          quantity: formData.quantity,
          gradYear: formData.gradYear || 'Not specified',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to create checkout session.');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Unable to reach the payment server. Please make sure the server is running (npm run dev).');
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          className="input-field"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="input-field"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(401) 555-0123"
          className="input-field"
          required
        />
      </div>

      {/* Number of Tickets */}
      <div>
        <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-gray-700">
          Number of Tickets <span className="text-red-500">*</span>
        </label>
        <select
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field"
          required
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'ticket' : 'tickets'}
            </option>
          ))}
        </select>
      </div>

      {/* Graduation Year */}
      <div>
        <label htmlFor="gradYear" className="mb-1.5 block text-sm font-medium text-gray-700">
          Graduation Year <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="gradYear"
          name="gradYear"
          value={formData.gradYear}
          onChange={handleChange}
          placeholder="e.g., 1995"
          maxLength={4}
          className="input-field"
          required
        />
      </div>

      {/* Price Summary */}
      <div className="rounded-xl bg-gray-50 p-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            {formData.quantity} {formData.quantity === 1 ? 'ticket' : 'tickets'} &times; ${TICKET_PRICE}.00
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${totalPrice}.00
          </span>
        </div>
        {formData.quantity > 1 && (
          <p className="mt-1 text-sm text-gray-500">
            ${TICKET_PRICE}.00 per ticket
          </p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Redirecting to Payment...
          </span>
        ) : (
          `Proceed to Payment — $${totalPrice}.00`
        )}
      </button>

      {/* Secure payment note */}
      <p className="text-center text-xs text-gray-500">
        <svg className="mr-1 inline h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure payment powered by Stripe. Your card details are never stored on our servers.
      </p>
    </form>
  );
}
