import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-5">
          <span className="text-5xl sm:text-6xl font-black text-blue-600">404</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The link you clicked may be outdated or the page has moved. Use the buttons below to return to our services or homepage.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/" variant="primary" size="md">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Button>
            <Button href="/services" variant="outline" size="md">
              <span>View All Services</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
