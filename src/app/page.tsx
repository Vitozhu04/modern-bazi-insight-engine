import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="features">
          <Features />
        </div>
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
