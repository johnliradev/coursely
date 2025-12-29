import { BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-foreground" />
            <span className="text-lg font-semibold text-foreground">
              Course<span className="text-orange-500">ly</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} Coursely. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

