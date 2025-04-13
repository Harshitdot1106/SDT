
import { Droplet } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Droplet size={24} className="text-water-bright" />
              <span className="font-bold text-xl text-water-bright">FixMyWater</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              A community-driven platform for reporting and tracking water-related issues in your area.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-water-bright">Home</Link></li>
              <li><Link to="/reports" className="text-gray-600 hover:text-water-bright">View Reports</Link></li>
              <li><Link to="/map" className="text-gray-600 hover:text-water-bright">Issue Map</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-water-bright">About</Link></li>
              <li><Link to="/report-issue" className="text-gray-600 hover:text-water-bright">Report an Issue</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-water-bright">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-water-bright">Terms of Service</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-water-bright">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-water-bright">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-water-bright">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-water-bright">Instagram</a></li>
              <li><a href="mailto:contact@fixmywater.com" className="text-gray-600 hover:text-water-bright">contact@fixmywater.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FixMyWater. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700">Privacy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700">Terms</Link>
            <Link to="/support" className="text-xs text-gray-500 hover:text-gray-700">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
