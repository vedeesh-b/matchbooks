import BookCarousel from "@/components/features/BookCarousel";
import { Button } from "@/components/ui/button";
import { Heart, Telescope, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pt-14 pb-16 w-full scroll-m-20 text-center text-balance">
        <h1 className="text-7xl/20 font-extrabold tracking-tight mb-8">
          Find books that make you feel.
        </h1>
        <p className="text-gray-600 inline-flex items-baseline">
          Matchbooks helps you discover your next read, with some{" "}
          <Heart size={16} className="mx-1.5 mt-0.5" /> from the{" "}
          <Link to="https://openlibrary.org">OpenLibrary API</Link>.
        </p>
      </div>
      <div className="flex flex-row gap-3 pb-24">
        <Button size="lg" variant="default" asChild className="p-6 text-md">
          <Link to="/path-generator" className="gap-3">
            <Telescope />
            Find my path
          </Link>
        </Button>
        <Button size="lg" variant="secondary" asChild className="p-6 text-md">
          <Link to="/top-paths" className="gap-3">
            <Trophy />
            Explore top paths
          </Link>
        </Button>
      </div>
      <BookCarousel />
    </div>
  );
}
