import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function NewsPage() {
  const [search, setSearch] = useState("");
  const { newsItems } = useSiteContent();

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const text = `${item.title} ${item.summary}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <div>
      <PageHeader
        title="News"
        subtitle="A backend-free announcement page powered entirely by mock content."
        breadcrumbs={[{ label: "News", href: null }]}
      />

      <div className="container-shell py-14">
        <div className="mx-auto mb-10 max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search news..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 outline-none transition focus:border-teal-400"
          />
        </div>

        <div className="grid gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id}>
              <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px]">
                <div>
                  <div className="text-sm text-slate-500">{item.publishedAt}</div>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{item.summary}</p>
                  <Link to="/contact" className="mt-5 inline-block font-semibold text-primary">
                    Contact office for full notice
                  </Link>
                </div>
                <img src={item.image} alt={item.title} className="h-56 w-full rounded-2xl object-cover" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
