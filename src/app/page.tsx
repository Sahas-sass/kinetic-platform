import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import Simulator from "@/components/Simulator";
import TargetAudience from "@/components/TargetAudience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-kinetic-bg font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Simulator />
      <TargetAudience />
      <Footer />
    </main>
  );
}