import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

function Logo() {
  const { siteMeta } = useSiteContent();

  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-lg">
        <Building2 className="h-7 w-7" />
      </div>
      <div>
        <div className="text-lg font-extrabold text-slate-900">{siteMeta.name}</div>
        <div className="text-sm font-medium text-slate-500">Gram Panchayat Portal</div>
      </div>
    </Link>
  );
}

export default Logo;
