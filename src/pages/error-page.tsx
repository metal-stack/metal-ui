import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <div className="flex-col space-x-4 md:flex-row">
        <Button asChild variant="outline">
          <Link to="/login">Zurück zum Login</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/">Zurück zum Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
