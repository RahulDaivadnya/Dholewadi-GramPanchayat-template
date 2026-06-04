import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";

function Footer() {
  const { navItems, quickStats, siteMeta } = useSiteContent();

  return (
    <footer className="mt-16 bg-slate-900 text-white">
      <div className="container-shell py-14">
        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-3">
            <a href={`tel:${siteMeta.phone}`} className="rounded-2xl bg-slate-800 p-4 transition hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-amber-400" />
                <div>
                  <div className="font-semibold">{siteMeta.phone}</div>
                  <div className="text-sm text-slate-300">Helpline</div>
                </div>
              </div>
            </a>
            <a href={`mailto:${siteMeta.email}`} className="rounded-2xl bg-slate-800 p-4 transition hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-amber-400" />
                <div>
                  <div className="font-semibold">{siteMeta.email}</div>
                  <div className="text-sm text-slate-300">Email</div>
                </div>
              </div>
            </a>
            <div className="rounded-2xl bg-slate-800 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-amber-400" />
                <div>
                  <div className="font-semibold">{siteMeta.villageName}</div>
                  <div className="text-sm text-slate-300">{siteMeta.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">About {siteMeta.villageName}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Official portal of the Gram Panchayat, providing online civic services, notices, and village information.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link to={item.path} className="hover:text-white">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Village Stats</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {quickStats.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Social</h3>
            <div className="mt-4 flex gap-4 text-slate-300">
              <a href="#" className="rounded-full bg-slate-800 p-3 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-3 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-3 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 {siteMeta.name}. All Rights Reserved.</span>
          <Link to="/admin" className="font-semibold text-amber-400 transition hover:text-amber-300">
            Admin Area Control
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
