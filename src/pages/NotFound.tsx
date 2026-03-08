import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Zap className="h-10 w-10 text-primary mb-4" />
      <h1 className="text-7xl font-extrabold text-primary mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-6">Page not found</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button size="lg" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
};

export default NotFound;
