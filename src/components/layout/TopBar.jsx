import { Mail, MapPin, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";

function TopBar() {
  const { siteMeta } = useSiteContent();

  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="container-shell flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-amber-400" />
            {siteMeta.phone}
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-amber-400" />
            {siteMeta.email}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            {siteMeta.address}
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Shield className="h-4 w-4" />
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
