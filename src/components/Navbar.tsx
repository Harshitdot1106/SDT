
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Menu, X, User, BarChart3 } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Droplet size={28} className="text-water-bright" />
                <span className="absolute animate-ping w-2 h-2 rounded-full bg-water-ocean/50 -top-1 right-0"></span>
              </div>
              <span className="font-bold text-xl text-water-bright">FixMyWater</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/reports" className="text-gray-600 hover:text-water-bright transition-colors">
              View Reports
            </Link>
            <Link to="/map" className="text-gray-600 hover:text-water-bright transition-colors">
              Issue Map
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-water-bright transition-colors">
              About
            </Link>
            <Link to="/report-issue">
              <Button className="water-button">Report an Issue</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="icon">
                <User size={18} />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="icon">
                <BarChart3 size={18} />
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
              to="/reports" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              View Reports
            </Link>
            <Link 
              to="/map" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Issue Map
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/report-issue" 
              className="block px-3 py-2 rounded-md bg-water-bright text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Report an Issue
            </Link>
            <div className="flex space-x-2 pt-2 border-t">
              <Link 
                to="/login" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>Login / Register</span>
              </Link>
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 size={18} />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
