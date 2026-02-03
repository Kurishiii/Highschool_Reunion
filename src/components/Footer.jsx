import falconsLogo from '/falcons.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={falconsLogo} alt="Falcons" className="h-10 rounded" />
              <div>
                <p className="font-semibold text-white">Feinstein High School</p>
                <p className="text-sm text-gray-500">Reunion 2026</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Celebrating decades of memories and the lasting bonds of the Feinstein Falcons community.
            </p>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Event Details</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Saturday, May 23, 2026 at 7:00 PM
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bar 101, 1478 Atwood Ave
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Johnston, RI 02919
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Questions?</h3>
            <p className="mb-3 text-sm">
              Have questions about the reunion or your ticket purchase? Reach out to us.
            </p>
            <a
              href="mailto:falconsreunioncommittee@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-teal-400 transition-colors hover:text-teal-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              falconsreunioncommittee@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Feinstein High School Reunion Committee. All rights reserved.</p>
          <p className="mt-1 text-gray-600">Go Falcons!</p>
        </div>
      </div>
    </footer>
  );
}
