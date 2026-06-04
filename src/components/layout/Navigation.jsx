import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";

function Navigation({ mobile = false, onNavigate }) {
  const location = useLocation();
  const { navItems } = useSiteContent();

  return (
    <nav className={mobile ? "flex flex-col gap-2" : "hidden lg:block"}>
      <ul className={mobile ? "space-y-2" : "flex items-center gap-2"}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onNavigate}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-teal-50 text-primary ring-1 ring-teal-200"
                    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
