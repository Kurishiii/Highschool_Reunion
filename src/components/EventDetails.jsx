export default function EventDetails() {
  return (
    <section id="details" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            About the Event
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-teal-500" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Description */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              This multi-class reunion is more than a gathering — it's a celebration of our
              school's lasting impact across generations. Join fellow alumni to reconnect, share
              memories, and create new ones.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Whether you graduated last year or decades ago, the Feinstein Falcons spirit
              unites us all. Come celebrate the bonds that time can't break.
            </p>
          </div>

          {/* Event details cards */}
          <div className="space-y-4">
            {/* Date card */}
            <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Date & Time</h3>
                <p className="text-gray-600">Saturday, May 23, 2026</p>
                <p className="text-gray-600">7:00 PM</p>
              </div>
            </div>

            {/* Location card */}
            <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">Bar 101</p>
                <p className="text-gray-600">1478 Atwood Ave, Johnston, RI 02919</p>
              </div>
            </div>

            {/* Dress code card */}
            <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">All Classes Welcome</h3>
                <p className="text-gray-600">Multi-class reunion celebrating every generation of Feinstein Falcons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
