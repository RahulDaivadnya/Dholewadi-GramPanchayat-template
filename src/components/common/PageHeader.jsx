import { Link } from "react-router-dom";

function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 text-white">
      <div className="container-shell py-14">
        {breadcrumbs.length > 0 && (
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                <span>/</span>
                {item.href ? (
                  <Link to={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg text-white/90">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHeader;
