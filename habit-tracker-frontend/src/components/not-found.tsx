import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold text-blue-400 leading-28">404</p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry, the page you're looking for doesn't exist or may have been
        moved.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button >
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}