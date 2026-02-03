import falconsLogo from '/falcons.png';

export default function Hero() {
  return (
    <section className="hero-gradient relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Falcon mascot */}
        <div className="float-animation mb-8 inline-block">
          <img src={falconsLogo} alt="Feinstein Falcons" className="mx-auto h-32 rounded-2xl shadow-2xl shadow-black/40 sm:h-40" />
        </div>

        {/* School name */}
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300 sm:text-base">
          Feinstein High School
        </h2>

        {/* Event name */}
        <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          Reunion
          <span className="block text-teal-400">2026</span>
        </h1>

        {/* Tagline */}
        <p className="mb-10 text-xl font-light text-teal-100/80 sm:text-2xl">
          Celebrating Decades of Memories
        </p>

        {/* Divider */}
        <div className="mx-auto mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-teal-400/60" />
          <div className="h-2 w-2 rotate-45 bg-teal-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-teal-400/60" />
        </div>

        {/* Date and location */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-lg text-white sm:text-xl">
            <svg className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Saturday, May 23, 2026</span>
            <span className="text-teal-400">|</span>
            <span>7:00 PM</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-base text-teal-100/70 sm:text-lg">
            <svg className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Bar 101, 1478 Atwood Ave, Johnston, RI 02919</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://buy.stripe.com/test_8x2cN7dt1avMgHU0log3600"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-lg shadow-teal-500/25"
        >
          Purchase Tickets — $55
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
