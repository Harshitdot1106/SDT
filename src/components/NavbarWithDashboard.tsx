
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlignJustify, X, Droplet, UserCircle } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-water-bright">
            <Droplet className="h-6 w-6" />
            <span>FixMyWater</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive("/")
                  ? "text-water-bright"
                  : "text-gray-700 hover:text-water-bright transition-colors"
              }`}
            >
              Home
            </Link>
            <Link
              to="/reports"
              className={`text-sm font-medium ${
                isActive("/reports")
                  ? "text-water-bright"
                  : "text-gray-700 hover:text-water-bright transition-colors"
              }`}
            >
              Reports
            </Link>
            <Link
              to="/map"
              className={`text-sm font-medium ${
                isActive("/map")
                  ? "text-water-bright"
                  : "text-gray-700 hover:text-water-bright transition-colors"
              }`}
            >
              Map
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium ${
                isActive("/dashboard")
                  ? "text-water-bright"
                  : "text-gray-700 hover:text-water-bright transition-colors"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                isActive("/about")
                  ? "text-water-bright"
                  : "text-gray-700 hover:text-water-bright transition-colors"
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Report Button */}
            <Link to="/report-issue" className="hidden sm:block">
              <Button className="water-button">Report an Issue</Button>
            </Link>
            
            {/* Login Button */}
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <AlignJustify className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className={`text-sm font-medium px-2 py-1 ${
                  isActive("/") ? "text-water-bright" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/reports"
                className={`text-sm font-medium px-2 py-1 ${
                  isActive("/reports") ? "text-water-bright" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                to="/map"
                className={`text-sm font-medium px-2 py-1 ${
                  isActive("/map") ? "text-water-bright" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Map
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium px-2 py-1 ${
                  isActive("/dashboard") ? "text-water-bright" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium px-2 py-1 ${
                  isActive("/about") ? "text-water-bright" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/report-issue"
                className="text-sm font-medium px-2 py-1 text-status-urgent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Report an Issue
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
