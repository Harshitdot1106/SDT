
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Droplet, CheckCircle2, AlertCircle, Clock4, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-water-soft to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="relative inline-block mb-6">
              <Droplet size={40} className="text-water-bright animate-float" />
              <span className="absolute animate-ping w-3 h-3 rounded-full bg-water-ocean/50 -top-1 right-0"></span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Clean Water, <span className="text-water-bright">Better Communities</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Report water issues instantly. Track progress in real-time. 
              Help improve water infrastructure in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/report-issue">
                <Button className="water-button text-base px-6 py-6 h-auto">
                  Report a Water Issue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" className="text-base px-6 py-6 h-auto">
                  View Issue Map
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
                  <AlertCircle size={28} className="text-water-bright" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
                <p className="text-gray-600">Submit water problems in your area through our easy-to-use form.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-light flex items-center justify-center">
                  <Clock4 size={28} className="text-purple-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Follow the status of reported issues and receive timely updates.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-resolved/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-status-resolved" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
                <p className="text-gray-600">Get notified when issues are resolved and rate the solution.</p>
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
