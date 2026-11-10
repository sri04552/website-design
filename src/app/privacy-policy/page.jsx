import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Privacy Policy | Amogha Digital",
  description: "Privacy commitments and data handling.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24 sm:py-32 bg-[#0B1220] min-h-[60vh]">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F7FC] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[16px] sm:text-[15px] text-[#9BAAC2] leading-[1.75] font-normal font-sans">
            This section will be built systematically phase by phase.
          </p>
        </div>
      </Container>
    </div>
  );
}
