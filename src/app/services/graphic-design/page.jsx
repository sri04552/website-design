import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "Graphic Design & Brand Identity | Sri Digital Studio",
  description: "Brand identities, packaging, and marketing creatives.",
};

export default function GraphicDesignPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "Graphic Design", href: "/services/graphic-design" },
          ]}
        />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            Graphic Design & Brand Identity
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#9BAAC2] leading-[1.75]">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
