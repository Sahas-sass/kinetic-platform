import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-kinetic-bg font-sans">
      <Navbar />
      <Hero />
    </main>
  );
}