import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "Contact | Sri Digital Studio",
  description: "Get in touch for custom digital projects.",
};

export default function ContactPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-[14px] sm:text-[15px] text-[#9BAAC2] leading-[1.7]">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
