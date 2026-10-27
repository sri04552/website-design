import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = {
  title: "AI Automation & Chatbots | Sri Digital Studio",
  description: "Workflow automation and smart WhatsApp assistants.",
};

export default function AiAutomationPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "AI Automation", href: "/services/ai-automation" },
          ]}
        />
        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            AI Automation & Chatbots
          </h1>
          <p className="mt-4 text-[14px] sm:text-[15px] text-[#9BAAC2] leading-[1.7]">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
