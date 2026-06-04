function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

export default SectionTitle;
