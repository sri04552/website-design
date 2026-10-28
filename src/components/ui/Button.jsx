import Link from "next/link";

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  target,
  rel,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2";

  const sizeStyles = {
    sm: "text-sm px-4 py-2 gap-1.5 font-semibold min-h-[38px]",
    md: "text-base px-6 py-3.5 gap-2 font-semibold min-h-[48px]",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold min-h-[48px]",
  };

  const variantStyles = {
    primary:
      "bg-[#0D8C7D] text-white hover:bg-[#0B7568] active:bg-[#085E54] shadow-xs hover:shadow focus-visible:outline-[#00B8F0]",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-xs focus-visible:outline-slate-900",
    outline:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus-visible:outline-slate-900",
    whatsapp:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-xs hover:shadow focus-visible:outline-emerald-600",
    ghost:
      "text-slate-700 hover:text-slate-950 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-slate-700",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("https://wa.me") || href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <Link
        href={href}
        className={combinedClasses}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
