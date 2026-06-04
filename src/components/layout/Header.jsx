import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-shell flex min-h-20 items-center justify-between gap-6 py-3">
          <Logo />
          <Navigation />
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/track-status"
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Track Application
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              <FileText className="h-4 w-4" />
              View Services
            </Link>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="border-b border-slate-200 bg-white lg:hidden">
          <div className="container-shell py-4">
            <Navigation mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;
