function Card({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
