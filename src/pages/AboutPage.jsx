import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function AboutPage() {
  const { aboutSections, heroSlides, quickStats, siteMeta } = useSiteContent();

  return (
    <div>
      <PageHeader
        title={`About ${siteMeta.villageName}`}
        subtitle={`Official overview, objectives, and statistics of ${siteMeta.name}.`}
        breadcrumbs={[{ label: "About", href: null }]}
      />

      <div className="container-shell py-14">
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="overflow-hidden rounded-2xl shadow-xl">
              <img src={slide.image} alt={slide.title} className="h-64 w-full object-cover transition hover:scale-110" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {aboutSections.map((section) => (
              <Card key={section.title}>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{section.body}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6 lg:col-span-4">
            {quickStats.map((item) => (
              <Card key={item.label}>
                <div className="p-6 text-center">
                  <div className="text-3xl font-black text-primary">{item.value}</div>
                  <div className="mt-2 text-slate-500">{item.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
