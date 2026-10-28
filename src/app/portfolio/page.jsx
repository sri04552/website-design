import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "Portfolio | AMOGHA Digital",
  description: "Demonstration projects and client architectures.",
};

export default function PortfolioPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <Breadcrumbs items={[{ label: "Portfolio", href: "/portfolio" }]} />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            Portfolio
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#9BAAC2] leading-[1.75]">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
