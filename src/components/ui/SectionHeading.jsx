import { Badge } from "./Badge";

export function SectionHeading({
  badge,
  badgeVariant = "primary",
  title,
  subtitle,
  align = "left",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {badge && (
        <div className={`mb-3.5 ${isCenter ? "flex justify-center" : ""}`}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-bold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
