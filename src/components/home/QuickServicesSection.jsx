import { ArrowRight, FileText, IndianRupee, Landmark, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import SectionTitle from "../common/SectionTitle";
import { useSiteContent } from "../../context/SiteContentContext";

const iconMap = {
  Certificates: FileText,
  Tax: IndianRupee,
  Utilities: Wallet,
};

function QuickServicesSection() {
  const { services } = useSiteContent();

  return (
    <section className="py-20">
      <div className="container-shell">
        <SectionTitle
          eyebrow="Services"
          title="Quick Service Access"
          subtitle="Reusable card grid modeled after the original public-service portal layout."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.category] || Landmark;
            return (
              <Card key={service.id} className="group transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {service.isOnline ? "Online" : "Office Visit"}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <span>{service.processingTime}</span>
                    <span className="font-semibold text-slate-700">{service.fee}</span>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"
                  >
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickServicesSection;
