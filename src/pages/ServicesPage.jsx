import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { services } = useSiteContent();

  const categories = ["All", ...new Set(services.map((service) => service.category))];

  const filtered = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || service.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Search, filter, and reuse this service catalog in any future Panchayat website."
        breadcrumbs={[{ label: "Services", href: null }]}
      />

      <div className="container-shell py-14">
        <div className="glass-panel rounded-3xl p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 outline-none ring-0 transition focus:border-teal-400"
              />
            </div>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-teal-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((service) => (
            <Card key={service.id} className="transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-primary">
                    {service.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{service.fee}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <div className="mt-5 text-sm text-slate-500">{service.processingTime}</div>
                <Link to={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  Open detail
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
