import { ArrowRight, Clock3, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import SectionTitle from "../common/SectionTitle";
import { useSiteContent } from "../../context/SiteContentContext";

function NewsHighlightsSection() {
  const { newsItems } = useSiteContent();

  return (
    <section className="bg-white py-20">
      <div className="container-shell">
        <SectionTitle
          eyebrow="Latest Updates"
          title="News And Announcements"
          subtitle="Mock-data-driven notice cards that replace the original backend-powered news feed."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <Card key={item.id} className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-2xl">
              <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span>{item.publishedAt}</span>
                  {index === 0 ? (
                    <span className="ml-auto rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      New
                    </span>
                  ) : null}
                </div>
                <div className="flex items-start gap-3">
                  <Newspaper className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                  </div>
                </div>
                <Link to="/news" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  Read more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsHighlightsSection;
