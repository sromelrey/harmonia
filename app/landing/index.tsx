"use client";
import { useState } from "react";
import TopNav from "@/components/landing/TopNav";
import HeroSection from "./hero-section";
import WhyHarmoniaSection from "./why-harmonia";
import HowItWorksSection from "./how-it-works";
import TrustSection from "./trust";
import { ComponentExplorerModal } from "@/components/component-explorer-modal";

export default function DocsSPA() {
  const [isComponentExplorerOpen, setIsComponentExplorerOpen] = useState(false);

  return (
    <div className='min-h-dvh bg-background text-foreground'>
      <TopNav />
      <HeroSection
        onOpenComponentExplorer={() => setIsComponentExplorerOpen(true)}
      />
      <WhyHarmoniaSection />
      <HowItWorksSection />
      <TrustSection />
      <ComponentExplorerModal
        isOpen={isComponentExplorerOpen}
        onClose={() => setIsComponentExplorerOpen(false)}
      />
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes grid-drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 30s linear infinite reverse;
        }
      `}</style>
    </div>
  );
}
