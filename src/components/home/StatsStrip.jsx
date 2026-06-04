import { useSiteContent } from "../../context/SiteContentContext";

function StatsStrip() {
  const { quickStats } = useSiteContent();

  return (
    <section className="py-8">
      <div className="container-shell">
        <div className="grid gap-4 rounded-3xl bg-gradient-to-r from-teal-700 to-cyan-700 p-6 text-white shadow-2xl md:grid-cols-4">
          {quickStats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
              <div className="text-3xl font-black">{item.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/80">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;
