import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import UserTypesSection from "@/components/landing/user-types-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CTASection from "@/components/landing/cta-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <div id="features" className="scroll-mt-16">
        <FeaturesSection />
      </div>
      <div id="solutions" className="scroll-mt-16">
        <UserTypesSection />
      </div>
      <div id="testimonials" className="scroll-mt-16">
        <TestimonialsSection />
      </div>
      <div id="contact" className="scroll-mt-16">
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
