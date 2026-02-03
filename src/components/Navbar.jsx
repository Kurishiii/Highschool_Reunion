import { Link, useLocation, useNavigate } from 'react-router-dom';
import falconsLogo from '/falcons.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-teal-500/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Home link */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <img src={falconsLogo} alt="Falcons" className="h-10 rounded transition-transform group-hover:scale-110" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-teal-400 leading-tight">Feinstein High School</p>
              <p className="text-xs text-gray-400">Reunion 2026</p>
            </div>
          </Link>

          {/* CTA */}
          {isHome ? (
            <a
              href="https://buy.stripe.com/test_8x2cN7dt1avMgHU0log3600"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white
                         shadow-lg shadow-teal-500/25 transition-all duration-200
                         hover:bg-teal-400 hover:shadow-teal-400/30"
            >
              Buy Tickets
            </a>
          ) : (
            <Link
              to="/"
              className="rounded-lg border border-teal-500/50 px-5 py-2.5 text-sm font-semibold text-teal-400
                         transition-all duration-200 hover:bg-teal-500/10"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
