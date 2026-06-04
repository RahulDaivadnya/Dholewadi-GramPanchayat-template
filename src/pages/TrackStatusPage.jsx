import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { BadgeCheck, Clock3, Search, XCircle, AlertTriangle, FileText, Check, ShieldAlert } from "lucide-react";
import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function StatusBadge({ status }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-bold text-green-700">
        <BadgeCheck className="h-4 w-4" />
        Approved
      </span>
    );
  }

  if (status === "needs-info") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold text-amber-700">
        <AlertTriangle className="h-4 w-4" />
        Needs Info
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3.5 py-1.5 text-xs font-bold text-rose-700">
        <XCircle className="h-4 w-4" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-blue-700 animate-pulse">
      <Clock3 className="h-4 w-4" />
      Pending Review
    </span>
  );
}

// Visual Application Progress Tracker
function ApplicationTimeline({ status }) {
  const steps = [
    { label: "Submitted", desc: "Received online" },
    { label: "Verification", desc: "Desk review" },
    { label: "Decision", desc: "Final notice" },
  ];

  const getStepStatus = (index) => {
    if (status === "approved") return "completed";
    if (status === "rejected" && index === 2) return "failed";
    
    if (index === 0) return "completed";
    if (index === 1) {
      if (status === "needs-info") return "warning";
      if (status === "pending") return "current";
      return "completed";
    }
    return "upcoming";
  };

  return (
    <div className="mt-8 border-t border-slate-100 pt-6">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Application Progress</div>
      <div className="grid grid-cols-3 gap-2 relative">
        {steps.map((step, idx) => {
          const stepState = getStepStatus(idx);
          
          return (
            <div key={idx} className="flex flex-col items-center text-center relative">
              {/* Connecting line */}
              {idx < 2 && (
                <div className="absolute left-[50%] right-[-50%] top-4 h-0.5 bg-slate-200 -z-10">
                  <div className={`h-full transition-all duration-500 ${
                    (idx === 0 && (status === "approved" || status === "needs-info" || status === "pending")) 
                      ? "bg-teal-500" 
                      : ""
                  }`}></div>
                </div>
              )}
              
              {/* Dot */}
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                stepState === "completed" 
                  ? "bg-teal-600 border-teal-600 text-white" 
                  : stepState === "current" 
                  ? "bg-blue-50 border-blue-600 text-blue-600 ring-4 ring-blue-100" 
                  : stepState === "warning"
                  ? "bg-amber-50 border-amber-500 text-amber-600 ring-4 ring-amber-100"
                  : stepState === "failed"
                  ? "bg-rose-600 border-rose-600 text-white"
                  : "bg-white border-slate-200 text-slate-400"
              }`}>
                {stepState === "completed" ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : stepState === "failed" ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  idx + 1
                )}
              </div>
              
              <div className="mt-2">
                <div className="text-xs font-bold text-slate-800">{step.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrackStatusPage() {
  const location = useLocation();
  const [queryVal, setQueryVal] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { trackingItems, isLoading } = useSiteContent();

  // Auto-fill from URL parameters on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mobileParam = params.get("mobile");
    const idParam = params.get("id");

    if (mobileParam) {
      setQueryVal(mobileParam);
      setHasSearched(true);
    } else if (idParam) {
      setQueryVal(idParam);
      setHasSearched(true);
    }
  }, [location]);

  // Execute dynamic search against the latest Supabase-backed records
  const results = useMemo(() => {
    if (!hasSearched) return [];
    const cleanQuery = queryVal.trim().toLowerCase();

    if (!cleanQuery) return [];

    return trackingItems.filter(
      (item) =>
        (item.mobile ? String(item.mobile) : "").includes(cleanQuery) ||
        (item.id || "").toLowerCase().includes(cleanQuery) ||
        (item.service || "").toLowerCase().includes(cleanQuery)
    );
  }, [hasSearched, queryVal, trackingItems]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div>
      <PageHeader
        title="Track Status"
        subtitle="Search and check review comments for birth certificates, tax bills, and utility applications."
        breadcrumbs={[{ label: "Track Status", href: null }]}
      />

      <div className="container-shell py-14">
        <div className="mx-auto max-w-3xl">
          {/* Search Card */}
          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <div className="p-6">
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Search Application
                </label>
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm md:flex-row md:items-center focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <div className="flex flex-1 items-center gap-3 px-2">
                    <Search className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={queryVal}
                      onChange={(e) => setQueryVal(e.target.value)}
                      placeholder="Enter Mobile Number or Tracking ID (e.g., GP-1021)"
                      className="w-full bg-transparent py-1.5 text-slate-800 outline-none text-sm font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 transition shadow-sm"
                  >
                    Search Database
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block px-1">
                  💡 *Tip: Search using your 10-digit mobile number or the generated application reference number.*
                </span>
              </form>
            </div>
          </Card>

          {/* Results Area */}
          <div className="mt-8 space-y-6">
            {isLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                Loading application records...
              </div>
            ) : null}
            {results.map((item) => (
              <Card key={item.id} className="border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">{item.service}</span>
                      <h4 className="text-xl font-black text-slate-900 mt-1">Application Record</h4>
                      <div className="text-xs text-slate-400 mt-0.5">Reference ID: <span className="font-mono font-bold text-slate-600">{item.id}</span></div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>

                  {/* Remarks Panel */}
                  <div className="mt-5 rounded-2xl bg-amber-50/50 border border-amber-100 px-5 py-4 text-sm text-slate-700">
                    <div className="flex gap-2 items-start">
                      <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-amber-900">Gram Panchayat Remarks</div>
                        <div className="mt-1 leading-relaxed text-amber-800">{item.remarks}</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps Timeline */}
                  <ApplicationTimeline status={item.status} />
                </div>
              </Card>
            ))}

            {hasSearched && results.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-inner">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <FileText className="h-6 w-6" />
                </div>
                <h5 className="mt-4 text-base font-bold text-slate-800">No Records Found</h5>
                <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any pending or approved applications for query "<strong>{queryVal}</strong>". Double check the tracking ID or mobile number.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackStatusPage;
