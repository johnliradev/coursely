import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground text-center">
          Learn something new today
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-foreground/80 text-center">
          High-quality courses and ebooks to develop your skills
        </p>

        {/* Search Bar */}
        <div className="w-full relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Courses"
            className="w-full pl-10 h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
};
