import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { CatalogDownload } from "@/components/sections/CatalogDownload";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <CatalogDownload />
      <Testimonials />
    </main>
  );
}
