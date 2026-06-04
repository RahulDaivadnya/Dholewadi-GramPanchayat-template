export const defaultSiteMeta = {
  name: "Gram Panchayat Name",
  villageName: "Dholewadi",
  phone: "+91 93733 56931",
  email: "gpdholewadi415408@gmail.com",
  address: "Tal. Shirala, Dist. Sangli, Maharashtra 415408",
};

export const defaultNavItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "News", path: "/news" },
  { label: "Track Status", path: "/track-status" },
  { label: "Contact", path: "/contact" },
];

export const defaultHeroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    title: "Aapale Gav, Aapali Gram Panchayat",
    subtitle:
      "Official portal of the Gram Panchayat, providing online civic services and village information.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    title: "Public Services & Digital Governance",
    subtitle:
      "Access administrative services, apply for certificates, and track applications online.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    title: "Empowering Our Village Community",
    subtitle:
      "Stay updated with the latest notices, project developments, and local announcements.",
  },
];

export const defaultQuickStats = [
  { label: "Population", value: "965+" },
  { label: "Key Services", value: "9" },
  { label: "Active Notices", value: "6" },
  { label: "Response Window", value: "7 Days" },
];

export const defaultServices = [
  {
    id: 1,
    slug: "birth-certificate",
    name: "Birth Certificate",
    category: "Certificates",
    description: "Apply for an official birth registration certificate.",
    fullDescription:
      "This reusable detail layout demonstrates how service summaries, documents, eligibility, and actions can be displayed without depending on a backend.",
    processingTime: "7 working days",
    fee: "Rs. 20",
    isOnline: true,
    eligibility: ["Applicant or guardian can apply", "Basic identity proof required"],
    documents: [
      { name: "Applicant ID", description: "Aadhaar card or voter ID copy" },
      { name: "Hospital Note", description: "Birth proof or supporting record" },
    ],
    process: [
      { title: "Fill application", description: "Collect applicant details and attach proofs." },
      { title: "Verification", description: "Office checks records and validates documents." },
      { title: "Issue certificate", description: "Approved applications receive the final certificate." },
    ],
  },
  {
    id: 2,
    slug: "death-certificate",
    name: "Death Certificate",
    category: "Certificates",
    description: "Request a death certificate for legal and family records.",
    fullDescription:
      "Use this card-driven detail page to present requirements and timelines in a consistent way across services.",
    processingTime: "7 working days",
    fee: "Rs. 20",
    isOnline: true,
    eligibility: ["Immediate family can request", "Relevant event details must be available"],
    documents: [
      { name: "Identity proof", description: "Applicant identity and address proof" },
      { name: "Supporting note", description: "Medical or local record if available" },
    ],
    process: [
      { title: "Submit request", description: "Fill the form with deceased person details." },
      { title: "Office review", description: "Authorities cross-check the local register." },
      { title: "Certificate issue", description: "Download or collect the final certificate." },
    ],
  },
  {
    id: 3,
    slug: "property-tax",
    name: "Property Tax",
    category: "Tax",
    description: "Display a property tax payment UI without live payment integration.",
    fullDescription:
      "A reusable service pattern for taxes and utility payments, with a stronger emphasis on CTA, payment info, and quick support.",
    processingTime: "Immediate acknowledgement",
    fee: "As per assessment",
    isOnline: true,
    eligibility: ["Property holder or authorized representative"],
    documents: [
      { name: "Property number", description: "Unique property record identifier" },
      { name: "Contact details", description: "Mobile number for acknowledgement" },
    ],
    process: [
      { title: "Enter property details", description: "Use property number and contact details." },
      { title: "Review amount", description: "Confirm annual or pending tax amount." },
      { title: "Generate receipt", description: "Show a receipt UI after submission." },
    ],
  },
  {
    id: 4,
    slug: "water-tax",
    name: "Water Tax",
    category: "Utilities",
    description: "Template page for water tax payment and service tracking.",
    fullDescription:
      "This service model is helpful for any utility fee page and can be adapted to water connection, drainage, or other civic service flows.",
    processingTime: "3 working days",
    fee: "Rs. 1200 onwards",
    isOnline: false,
    eligibility: ["Active household connection record"],
    documents: [
      { name: "Connection ID", description: "Local water connection reference" },
      { name: "Address proof", description: "Proof tied to service location" },
    ],
    process: [
      { title: "Request initiated", description: "Office records the service request." },
      { title: "Status updated", description: "Operators review and mark pending items." },
      { title: "Final action", description: "Resolution is shared through the dashboard card." },
    ],
  },
];

export const defaultNewsItems = [
  {
    id: 1,
    title: "Village sanitation drive scheduled for next Sunday",
    summary:
      "This sample update shows how a Gram Panchayat notice list can be rendered with cards, dates, and route links only from mock data.",
    publishedAt: "2026-05-28",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Water supply maintenance block announced",
    summary:
      "A second example notice for demonstrating list layouts, image handling, and summary text on both home and full news pages.",
    publishedAt: "2026-05-24",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Gram Sabha meeting invitation for all residents",
    summary:
      "Use this dataset to prototype governance communication areas before wiring up any actual database.",
    publishedAt: "2026-05-18",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  },
];

export const defaultAboutSections = [
  {
    title: "Village Overview",
    body:
      "Dholewadi is represented here as a reusable Gram Panchayat web experience with a familiar civic visual style: strong header, image-led hero, service cards, public notices, and accessible contact actions.",
  },
  {
    title: "Why This Template Exists",
    body:
      "The goal is to let you copy structure and styling into future village websites while keeping content, routes, and mock datasets easy to swap out.",
  },
  {
    title: "What Stays Reusable",
    body:
      "Shared layout, cards, page headers, hero, statistics strips, list patterns, detail pages, and support panels are all designed to be reused across multiple Panchayat sites.",
  },
];

export const defaultTrackStatusItems = [
  {
    id: "GP-1021",
    mobile: "9876543210",
    service: "Birth Certificate",
    status: "approved",
    remarks: "Certificate ready for download",
  },
  {
    id: "GP-1034",
    mobile: "9876543210",
    service: "Property Tax",
    status: "pending",
    remarks: "Payment verification in progress",
  },
  {
    id: "GP-1102",
    mobile: "9999999999",
    service: "Water Tax",
    status: "needs-info",
    remarks: "Connection number mismatch",
  },
];

export const defaultSiteContent = {
  siteMeta: defaultSiteMeta,
  navItems: defaultNavItems,
  heroSlides: defaultHeroSlides,
  quickStats: defaultQuickStats,
  services: defaultServices,
  newsItems: defaultNewsItems,
  aboutSections: defaultAboutSections,
};
