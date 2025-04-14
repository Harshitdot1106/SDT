
import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { toast } = useToast();
  const userIsLoggedIn = isLoggedIn();
  const userIsAdmin = isAdmin();
  
  useEffect(() => {
    if (!userIsLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
    } else if (adminOnly && !userIsAdmin) {
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page",
        variant: "destructive"
      });
    }
  }, [userIsLoggedIn, userIsAdmin, adminOnly, toast]);
  
  if (!userIsLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !userIsAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
