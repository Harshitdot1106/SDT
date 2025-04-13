
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Users, 
  BarChart2, 
  MessageSquare, 
  Share2,
  CheckCircle2,
  Shield
} from "lucide-react";

const teamMembers = [
  {
    name: "Akhil Varanasi",
    role: "Founder & CEO",
    bio: "Water infrastructure expert with 7+ years experience in municipal water systems."
  },
  {
    name: "Aditya Bansali",
    role: "Lead Developer",
    bio: "Full-stack engineer specializing in geospatial applications and real-time reporting systems."
  },
  {
    name: "Aryan Ranpura",
    role: "UX/UI Designer",
    bio: "Human-centered designer focused on creating accessible interfaces for community-driven applications."
  },
  {
    name: "Saurabh Sharma",
    role: "Data Scientist",
    bio: "Analytics expert specializing in water quality metrics and infrastructure optimization."
  }
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-b from-water-soft to-white py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-6">About FixMyWater</h1>
            <p className="text-lg text-gray-700 mb-8">
              FixMyWater is a community-driven platform empowering citizens to report and track water-related issues. 
              We bridge the gap between communities and local water authorities, improving response times and infrastructure management.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/report-issue">
                <Button className="water-button">Report an Issue</Button>
              </Link>
              <Link to="/map">
                <Button variant="outline">View Issue Map</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe in creating transparency and accountability in water infrastructure management.
                Our mission is to facilitate community participation in identifying and addressing water-related problems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-water-soft flex items-center justify-center mx-auto mb-4">
                    <Users className="text-water-bright" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Community Empowerment</h3>
                  <p className="text-gray-600 text-sm">
                    Giving citizens a voice and platform to report water issues affecting their daily lives.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-water-soft flex items-center justify-center mx-auto mb-4">
                    <BarChart2 className="text-water-bright" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Data-Driven Solutions</h3>
                  <p className="text-gray-600 text-sm">
                    Providing authorities with valuable data to prioritize infrastructure improvements.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-water-soft flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-water-bright" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Transparent Communication</h3>
                  <p className="text-gray-600 text-sm">
                    Creating open channels between citizens and water authorities to address concerns.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">How FixMyWater Works</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-xl font-semibold mb-4">1. Report Water Issues</h3>
                  <p className="text-gray-600 mb-4">
                    Anyone can easily submit reports about water-related problems, from burst pipes to contamination concerns.
                    Simply fill out our user-friendly form with issue details, location, and optional photos.
                  </p>
                  <Link to="/report-issue" className="text-water-bright hover:underline">
                    Submit a report →
                  </Link>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Report Form Illustration</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map View Illustration</p>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold mb-4">2. Visualize on Interactive Maps</h3>
                  <p className="text-gray-600 mb-4">
                    All reports are displayed on our interactive map, allowing residents and authorities to see the
                    distribution and concentration of water issues in the community.
                  </p>
                  <Link to="/map" className="text-water-bright hover:underline">
                    Explore the map →
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-xl font-semibold mb-4">3. Track Progress and Resolution</h3>
                  <p className="text-gray-600 mb-4">
                    Follow the status of reported issues from submission to resolution. Get notified when authorities
                    respond to or resolve your reports.
                  </p>
                  <Link to="/reports" className="text-water-bright hover:underline">
                    View report statuses →
                  </Link>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Status Tracking Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Using FixMyWater</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Faster Issue Resolution</h3>
                  <p className="text-gray-600 text-sm">
                    Direct reporting and clear communication channels lead to quicker response times for water issues.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community Awareness</h3>
                  <p className="text-gray-600 text-sm">
                    Stay informed about water issues in your neighborhood and surrounding areas.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Transparent Tracking</h3>
                  <p className="text-gray-600 text-sm">
                    Follow the progress of your reports from submission to resolution with real-time updates.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data for Better Infrastructure</h3>
                  <p className="text-gray-600 text-sm">
                    Reports help authorities identify recurring problems and prioritize infrastructure improvements.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Simplified Reporting</h3>
                  <p className="text-gray-600 text-sm">
                    Easy-to-use forms and interfaces make reporting water issues quick and straightforward.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-water-soft flex items-center justify-center">
                    <CheckCircle2 className="text-water-bright h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Historical Data Access</h3>
                  <p className="text-gray-600 text-sm">
                    Access past reports and track the history of water issues in your area over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Members */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              FixMyWater was created by a team of environmentalists, civic technologists, and water infrastructure experts
              passionate about improving community water systems through collaboration and transparency.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="pt-6 text-center h-full flex flex-col">
                    <div className="w-24 h-24 bg-water-soft rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl text-water-bright font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-water-bright mb-2">{member.role}</p>
                    <p className="text-xs text-gray-600 mt-auto">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-water-bright text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the FixMyWater Community</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Be part of the solution by reporting water issues and helping to improve water infrastructure in your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-white text-water-bright hover:bg-gray-100">
                  Create an Account
                </Button>
              </Link>
              <Link to="/report-issue">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Report an Issue
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
