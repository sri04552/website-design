export function Badge({ children, variant = "neutral", className = "" }) {
  const variantStyles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    dark: "bg-slate-900 text-slate-100 border-slate-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        variantStyles[variant] || variantStyles.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}
