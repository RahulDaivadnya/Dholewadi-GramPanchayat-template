import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Clock3,
  FileText,
  IndianRupee,
  Info,
  Mail,
  Phone,
  X,
  Upload,
  User,
  Copy,
  Download,
  AlertCircle,
  FileCheck,
  Check
} from "lucide-react";
import Card from "../components/ui/Card";
import PageHeader from "../components/common/PageHeader";
import { useSiteContent } from "../context/SiteContentContext";

function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Modal for offline
  
  // Application Form States
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formStep, setFormStep] = useState(1); // 1: Personal Info, 2: Uploads, 3: Success
  const [generatedId, setGeneratedId] = useState("");
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [customFieldVal, setCustomFieldVal] = useState("");
  
  // Upload States
  const [uploadProgress, setUploadProgress] = useState({}); // { docName: progressValue }
  const [uploadedFiles, setUploadedFiles] = useState({}); // { docName: fileName }

  // Errors
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { services, submitTrackingApplication } = useSiteContent();

  const service = useMemo(() => services.find((item) => item.slug === slug), [services, slug]);

  if (!service) {
    return (
      <div className="container-shell py-20">
        <Card>
          <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-red-600">Service not found</h1>
            <Link to="/services" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
              <ArrowRight className="h-4 w-4" />
              Back to services
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Determine Custom Input Field Label based on Category
  const customFieldLabel = useMemo(() => {
    if (service.category === "Tax" || service.category === "Utilities") {
      return "Property Number / Connection ID";
    }
    return "Event Date / Date of Birth";
  }, [service.category]);

  const customFieldPlaceholder = useMemo(() => {
    if (service.category === "Tax" || service.category === "Utilities") {
      return "e.g., PROP-93821 / WATER-4819";
    }
    return "e.g., 2026-06-04";
  }, [service.category]);

  // Handle Form Page 1 Submission (Validation)
  const handleNextStep = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!mobileNum.trim()) {
      newErrors.mobileNum = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobileNum.replace(/\s+/g, ""))) {
      newErrors.mobileNum = "Please enter a valid 10-digit mobile number";
    }
    if (!addressVal.trim()) newErrors.addressVal = "Address is required";
    if (!customFieldVal.trim()) newErrors.customFieldVal = `${customFieldLabel} is required`;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // If service requires no documents, skip to completion, else proceed to uploads
    if (!service.documents || service.documents.length === 0) {
      submitApplication();
    } else {
      setFormStep(2);
    }
  };

  // Trigger Mock File Upload
  const handleFileUpload = (docName, file) => {
    if (!file) return;

    // Start progress mock
    setUploadProgress((prev) => ({ ...prev, [docName]: 10 }));
    
    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 30;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress((prev) => ({ ...prev, [docName]: 100 }));
        setUploadedFiles((prev) => ({ ...prev, [docName]: file.name }));
      } else {
        setUploadProgress((prev) => ({ ...prev, [docName]: currentProgress }));
      }
    }, 200);
  };

  // Submit Application
  const submitApplication = async () => {
    setSubmitError("");
    setIsSubmitting(true);
    const newTrackingId = `GP-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await submitTrackingApplication({
        id: newTrackingId,
        mobile: mobileNum.trim(),
        service: service.name,
        status: "pending",
        remarks: "Application received online. Documents under verification.",
        fullName: fullName.trim(),
        email: emailAddr.trim(),
        address: addressVal.trim(),
        referenceValue: customFieldVal.trim(),
        uploadedFiles,
      });
      setGeneratedId(newTrackingId);
      setFormStep(3);
    } catch (applicationError) {
      setSubmitError(applicationError.message || "Failed to submit the application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all required documents are uploaded
  const allDocsUploaded = useMemo(() => {
    if (!service.documents) return true;
    return service.documents.every((doc) => uploadedFiles[doc.name]);
  }, [service.documents, uploadedFiles]);

  // Copy tracking ID helper
  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock Form Download Handler
  const handleDownloadForm = () => {
    const docListText = service.documents
      ? service.documents.map((doc, i) => `   [ ] ${i + 1}. ${doc.name} (${doc.description})`).join("\n")
      : "   None required";

    const content = `==========================================================
OFFICIAL APPLICATION FORM - GRAM PANCHAYAT DHOLEWADI
==========================================================
SERVICE: ${service.name.toUpperCase()}
CATEGORY: ${service.category}
FEE RATE: ${service.fee}
TIMELINE: ${service.processingTime}

----------------------------------------------------------
I. MANDATORY DOCUMENTS CHECKLIST (Attach Photocopies):
----------------------------------------------------------
${docListText}

----------------------------------------------------------
II. APPLICANT REGISTRATION:
----------------------------------------------------------
1. Applicant Full Name: ___________________________________
2. Mobile Number (10 digits): _____________________________
3. Email ID (Optional): __________________________________
4. Present Residential Address:
   _______________________________________________________
   _______________________________________________________
5. ${customFieldLabel}: _____________________________________

----------------------------------------------------------
III. DECLARATION AND SIGNATURE:
----------------------------------------------------------
I hereby declare that the particulars given above are true and correct to the best of my knowledge.

Place: Dholewadi
Date: ____/____/2026

Signature of Applicant: ___________________________
==========================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${service.slug}-official-form.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title={service.name}
        subtitle={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name, href: null },
        ]}
      />

      <div className="container-shell py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Overview Card */}
            <Card className="border-t-4 border-t-teal-500">
              <div className="p-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <CheckCircle className="h-6 w-6" />
                  Overview
                </h2>
                <p className="mt-4 border-b border-slate-100 pb-6 leading-8 text-slate-600">
                  {service.fullDescription}
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-teal-50 p-5">
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold text-slate-900">Processing Time</div>
                        <div className="text-slate-600">{service.processingTime}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-teal-50 p-5">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold text-slate-900">Fee</div>
                        <div className="text-slate-600">{service.fee}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Eligibility Card */}
            <Card>
              <div className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
                  <Info className="h-5 w-5" />
                  Eligibility
                </h2>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {service.eligibility.map((item) => (
                    <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Required Documents Card */}
            <Card>
              <div className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {service.documents && service.documents.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Process Card */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-primary">Application Process</h2>
                <div className="mt-6 space-y-5">
                  {service.process.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{step.title}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-teal-500">
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  {service.isOnline ? (
                    <button
                      onClick={() => {
                        setShowApplyForm(true);
                        setFormStep(1);
                      }}
                      className="w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-teal-700 shadow-md shadow-teal-700/10"
                    >
                      Apply Online
                    </button>
                  ) : (
                    <button
                      className="w-full rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600 shadow-md"
                      onClick={() => setShowModal(true)}
                    >
                      Visit Office
                    </button>
                  )}
                  <button
                    onClick={handleDownloadForm}
                    className="w-full rounded-2xl border border-teal-500 px-4 py-3 font-semibold text-primary hover:bg-teal-50/50 transition flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Form
                  </button>
                  <Link
                    to="/track-status"
                    className="block w-full rounded-2xl px-4 py-3 text-center font-semibold text-blue-700 hover:bg-blue-50 transition"
                  >
                    Track Status
                  </Link>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary">Help And Support</h3>
                <div className="mt-4 space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-slate-900">Helpline</div>
                      <div>+91 93733 56931</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-slate-900">Email</div>
                      <div>gpdholewadi415408@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* MODAL: OFFLINE VISIT DETAILS */}
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Office Visit Required</h3>
              <button type="button" className="rounded-full p-2 hover:bg-slate-200 transition" onClick={() => setShowModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 text-slate-600 space-y-4">
              <p className="leading-relaxed">
                This service (<strong>{service.name}</strong>) must be processed offline. Please follow the instructions below:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <li>Download the application form using the <span className="font-semibold">Download Form</span> button.</li>
                <li>Fill out all details and attach hardcopies of the required documents.</li>
                <li>Visit the Dholewadi Gram Panchayat office during operating hours (Mon-Sat, 10 AM to 5 PM).</li>
                <li>Submit your physical application envelope to Desk #3.</li>
              </ol>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* DYNAMIC APPLICATION FORM STEPPER WIZARD MODAL */}
      {showApplyForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-8">
            {/* Modal Header & Progress */}
            <div className="border-b border-slate-100 p-6 bg-slate-50 relative">
              <button
                type="button"
                className="absolute top-6 right-6 rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
                onClick={() => setShowApplyForm(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Apply Online</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{service.name} Application</h3>
              
              {/* Stepper bar */}
              <div className="mt-6 flex items-center justify-between gap-2 max-w-md">
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${formStep >= 1 ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
                  <span className={`text-xs font-bold ${formStep === 1 ? "text-primary" : "text-slate-400"}`}>Details</span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${formStep >= 2 ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
                  <span className={`text-xs font-bold ${formStep === 2 ? "text-primary" : "text-slate-400"}`}>Documents</span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${formStep === 3 ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>3</span>
                  <span className={`text-xs font-bold ${formStep === 3 ? "text-primary" : "text-slate-400"}`}>Receipt</span>
                </div>
              </div>
            </div>

            {/* STEP 1: Personal details form */}
            {formStep === 1 && (
              <form onSubmit={handleNextStep}>
                <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name of Applicant</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                        />
                      </div>
                      {errors.fullName && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={mobileNum}
                        onChange={(e) => setMobileNum(e.target.value)}
                        placeholder="e.g., 9876543210"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                      />
                      {errors.mobileNum && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.mobileNum}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email ID (Optional)</label>
                    <input
                      type="email"
                      value={emailAddr}
                      onChange={(e) => setEmailAddr(e.target.value)}
                      placeholder="e.g., applicant@gmail.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{customFieldLabel}</label>
                    <input
                      type="text"
                      value={customFieldVal}
                      onChange={(e) => setCustomFieldVal(e.target.value)}
                      placeholder={customFieldPlaceholder}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                    {errors.customFieldVal && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.customFieldVal}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Residential Address</label>
                    <textarea
                      rows={3}
                      value={addressVal}
                      onChange={(e) => setAddressVal(e.target.value)}
                      placeholder="Enter house details and locality in Dholewadi"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition resize-none"
                    />
                    {errors.addressVal && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.addressVal}</p>}
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 border-t border-slate-100">
                  <span className="text-xs text-slate-500">All data processed client-side.</span>
                  <button
                    type="submit"
                    className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm px-6 py-3 transition"
                  >
                    Next: Attach Documents
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Document uploads */}
            {formStep === 2 && (
              <div>
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800 flex items-start gap-3">
                    <Info className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Required Document Uploads</div>
                      <div className="mt-1 text-xs">Please upload a dummy file for each requirement below to submit your application.</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {service.documents.map((doc) => {
                      const uploadedName = uploadedFiles[doc.name];
                      const progress = uploadProgress[doc.name];

                      return (
                        <div key={doc.name} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{doc.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{doc.description}</div>
                            
                            {progress > 0 && progress < 100 && (
                              <div className="mt-2 w-32 bg-slate-200 h-1 rounded-full overflow-hidden">
                                <div className="bg-teal-600 h-1" style={{ width: `${progress}%` }}></div>
                              </div>
                            )}

                            {uploadedName && (
                              <div className="mt-2 text-xs text-green-700 flex items-center gap-1 font-semibold">
                                <FileCheck className="h-4 w-4" /> {uploadedName}
                              </div>
                            )}
                          </div>

                          <label className={`cursor-pointer rounded-xl text-xs font-bold px-4 py-2.5 border transition flex items-center gap-1.5 shrink-0 justify-center ${
                            uploadedName 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}>
                            <Upload className="h-3.5 w-3.5" />
                            {uploadedName ? "Replace File" : "Select File"}
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(doc.name, e.target.files[0])}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-semibold text-sm px-5 py-2.5 transition"
                  >
                    Back
                  </button>
                  <div className="flex flex-col items-end gap-2">
                    {submitError ? (
                      <div className="text-right text-xs text-rose-600">{submitError}</div>
                    ) : null}
                    <button
                      type="button"
                      onClick={submitApplication}
                      disabled={!allDocsUploaded || isSubmitting}
                      className="rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 transition flex items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Success and Tracking Receipt */}
            {formStep === 3 && (
              <div className="p-6 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 shadow-md">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                
                <div>
                  <h4 className="text-2xl font-black text-slate-900">Application Submitted!</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Your request for <strong>{service.name}</strong> has been successfully registered.
                  </p>
                </div>

                {/* Generated Tracking ID Box */}
                <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-inner">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application ID</span>
                  <div className="text-2xl font-mono font-black text-slate-800 tracking-wider mt-1">{generatedId}</div>
                  
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" /> Copy ID
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-amber-50/50 p-4 text-xs leading-relaxed text-amber-800 max-w-md mx-auto">
                  <strong>Save this ID!</strong> You can search using this ID or your mobile number (<strong>{mobileNum}</strong>) on the <strong>Track Status</strong> page to view review comments.
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-semibold text-sm px-6 py-2.5 transition"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyForm(false);
                      // Navigate to status page with state containing the mobile number
                      navigate(`/track-status?mobile=${mobileNum}`);
                    }}
                    className="w-full sm:w-auto rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm px-6 py-2.5 transition flex items-center justify-center gap-1"
                  >
                    Track Status <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ServiceDetailPage;
