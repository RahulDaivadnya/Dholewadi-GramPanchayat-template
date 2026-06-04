import { useState } from "react";
import { Mail, MapPin, Phone, Check, AlertCircle } from "lucide-react";
import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function ContactPage() {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { siteMeta, submitContactMessage } = useSiteContent();
  
  // Validation errors
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (submitMessageError) {
      setSubmitError(submitMessageError.message || "Failed to submit your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact"
        subtitle="Submit your civic inquiries, suggestions, or grievance notices directly to the Gram Panchayat."
        breadcrumbs={[{ label: "Contact", href: null }]}
      />

      <div className="container-shell py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="hover:-translate-y-1 transition-transform border-b-4 border-b-teal-600">
            <div className="p-6">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">Phone</h2>
              <p className="mt-2 text-slate-600 font-semibold">{siteMeta.phone}</p>
            </div>
          </Card>
          <Card className="hover:-translate-y-1 transition-transform border-b-4 border-b-teal-600">
            <div className="p-6">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">Email</h2>
              <p className="mt-2 text-slate-600 font-semibold">{siteMeta.email}</p>
            </div>
          </Card>
          <Card className="hover:-translate-y-1 transition-transform border-b-4 border-b-teal-600">
            <div className="p-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">Address</h2>
              <p className="mt-2 text-slate-600 font-semibold">{siteMeta.address}</p>
            </div>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Contact Office</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Have a question about a local service, water taxation, or notice timeline?
                Fill out the contact form. All queries are forwarded to the Gram Panchayat administration panel inbox.
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-1">
                <div>🏢 <strong>Office hours:</strong> Mon - Sat, 10:00 AM - 5:00 PM</div>
                <div>📍 <strong>Location:</strong> Gram Panchayat Bhawan, Dholewadi</div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-3xl border border-teal-200 bg-teal-50/50 p-8 text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Submitted!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you. Your message has been received by the Gram Panchayat office. We will review your inquiry shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 rounded-xl border border-teal-600 px-4 py-2 text-xs font-bold text-primary hover:bg-teal-50 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {submitError ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {submitError}
                    </div>
                  ) : null}
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      placeholder="Your Full Name"
                    />
                    {errors.name && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      placeholder="Your Email Address"
                    />
                    {errors.email && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
                  </div>

                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full min-h-36 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition resize-none"
                      placeholder="Write your inquiry or feedback message..."
                    />
                    {errors.message && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-2xl bg-primary px-5 py-3 font-bold text-white text-sm hover:bg-teal-800 transition shadow-md shadow-teal-700/10"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ContactPage;
