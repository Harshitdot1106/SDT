
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplet, Home, Map, LayoutDashboard, PenLine, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full p-2">
              <Droplet size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl text-blue-500">FixMyWater</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <Home size={18} />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/map">
              <Button 
                variant={location.pathname === "/map" ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <Map size={18} />
                <span>Map</span>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant={location.pathname === "/dashboard" ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Button>
            </Link>
            
            <Link to="/report-issue">
              <Button 
                variant={location.pathname === "/report-issue" ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <PenLine size={18} />
                <span>Report Issue</span>
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
              >
                <LogIn size={18} />
                <span>Sign in</span>
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                <UserPlus size={18} className="mr-2" />
                Sign up
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === "/" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/map" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === "/map" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Map size={18} />
              <span>Map</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/report-issue" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === "/report-issue" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <PenLine size={18} />
              <span>Report Issue</span>
            </Link>
            
            <div className="pt-4 border-t flex flex-col gap-2">
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Sign in</span>
              </Link>
              
              <Link 
                to="/register" 
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-purple-500 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
