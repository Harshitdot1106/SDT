
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Map, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Report and track water issues in your community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Help improve water infrastructure by reporting leaks, contamination, and other issues.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/map">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-base px-6 py-6 h-auto flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  View Issues Map
                </Button>
              </Link>
              <Link to="/report-issue">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-base px-6 py-6 h-auto flex items-center gap-2">
                  <PenLine className="h-5 w-5" />
                  Report an Issue
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How FixMyWater Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-water-soft flex items-center justify-center">
                  <PenLine size={28} className="text-water-bright" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
                <p className="text-gray-600">Submit water problems in your area through our easy-to-use form.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-light flex items-center justify-center">
                  <Map size={28} className="text-purple-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">View on Map</h3>
                <p className="text-gray-600">See all reported issues in your community on our interactive map.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-resolved/20 flex items-center justify-center">
                  <svg className="h-7 w-7 text-status-resolved" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Resolution</h3>
                <p className="text-gray-600">Follow the progress of your reports and get notified when issues are resolved.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Making an Impact Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-water-bright">570+</p>
                <p className="text-gray-600 mt-2">Issues Reported</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-water-bright">89%</p>
                <p className="text-gray-600 mt-2">Resolution Rate</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-water-bright">48hrs</p>
                <p className="text-gray-600 mt-2">Average Response</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-water-bright">12</p>
                <p className="text-gray-600 mt-2">Communities</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-water-bright text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Community's Water?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of citizens making a difference. Your reports help prioritize water infrastructure improvements.
            </p>
            <Link to="/report-issue">
              <Button className="bg-white text-water-bright hover:bg-gray-100 text-base px-6 py-6 h-auto">
                Report a Water Issue Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
