import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "AI Video Generation | Sri Digital Studio",
  description: "Social media video reels and bilingual narration.",
};

export default function AiVideoPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "AI Video", href: "/services/ai-video" },
          ]}
        />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            AI Video Generation
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#9BAAC2] leading-[1.75]">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
