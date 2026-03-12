import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background mesh-bg px-4">
      <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
        <Zap className="h-7 w-7 text-primary-foreground" />
      </div>
      <h1 className="text-8xl font-extrabold gradient-text mb-3">404</h1>
      <p className="text-xl font-semibold text-foreground mb-2">Page not found</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button size="lg" className="gradient-bg border-0 shadow-lg shadow-primary/20 hover:opacity-90" onClick={() => navigate("/home")}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
