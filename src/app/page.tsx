import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-kinetic-bg font-sans">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}