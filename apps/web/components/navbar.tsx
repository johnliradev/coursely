import { BookOpen, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./toggle-theme";

export const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-foreground" />
            <span className="text-xl font-semibold text-foreground">
              Course<span className="text-orange-500">ly</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Login Button */}
            <Button variant="ghost" className="gap-2">
              <User className="w-4 h-4" />
              Login
            </Button>
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
      <Separator />
    </nav>
  );
};
