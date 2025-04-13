
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { Search, Layers, Droplet, AlertCircle } from "lucide-react";
import { Report } from "@/types";
import { Link } from "react-router-dom";

// Mock data - to be replaced with Supabase fetch
const mockReports: Report[] = [
  {
    id: "1",
    title: "Burst pipe on Main Street",
    description: "Water is flooding the road and causing traffic issues",
    issue_type: "leak",
    status: "urgent",
    location: {
      address: "123 Main St, Anytown",
      lat: 40.7128,
      lng: -74.006,
    },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    user_id: "user1"
  },
  {
    id: "2",
    title: "Brown water coming from tap",
    description: "The water from my kitchen tap has been brown for two days",
    issue_type: "contamination",
    status: "in_progress",
    location: {
      address: "456 Oak Ave, Anytown",
      lat: 40.7228,
      lng: -74.016,
    },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: "user2"
  },
  {
    id: "3",
    title: "No water pressure",
    description: "Extremely low water pressure throughout the house since this morning",
    issue_type: "pressure",
    status: "pending",
    location: {
      address: "789 Pine St, Anytown",
      lat: 40.7328,
      lng: -74.026,
    },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    user_id: "user3"
  },
  {
    id: "4",
    title: "Water meter reading incorrect",
    description: "My water bill shows unusually high usage that doesn't match our consumption",
    issue_type: "billing",
    status: "resolved",
    location: {
      address: "101 Elm St, Anytown",
      lat: 40.7428,
      lng: -74.036,
    },
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user_id: "user4"
  },
  {
    id: "5",
    title: "Flooding in basement",
    description: "After heavy rain, water is seeping into my basement",
    issue_type: "flooding",
    status: "urgent",
    location: {
      address: "202 Maple Dr, Anytown",
      lat: 40.7528,
      lng: -74.046,
    },
    created_at: new Date(Date.now() - 43200000).toISOString(),
    updated_at: new Date(Date.now() - 21600000).toISOString(),
    user_id: "user5"
  },
];

// For demonstration purposes, using a placeholder key
// In a real app, this should be stored in environment variables
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const MapPage = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const googleMapRef = useRef<HTMLDivElement>(null);
  const googleMap = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  
  const filteredReports = reports.filter((report) => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const initGoogleMap = useCallback(() => {
    if (!window.google || !googleMapRef.current) return;
    
    try {
      // Initialize the map
      googleMap.current = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: 40.7128, lng: -74.006 }, // Default to New York City
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      
      // Clear any existing markers
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
      
      // Add markers for each report
      reports.forEach((report) => {
        if (report.location.lat && report.location.lng) {
          const markerColor = getMarkerColor(report.status);
          
          // Create a custom marker
          const marker = new window.google.maps.Marker({
            position: { lat: report.location.lat, lng: report.location.lng },
            map: googleMap.current,
            title: report.title,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: markerColor,
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#ffffff',
              scale: 10,
            }
          });
          
          // Add click handler for the marker
          marker.addListener('click', () => {
            setSelectedReport(report);
          });
          
          markers.current.push(marker);
        }
      });
      
      setMapReady(true);
    } catch (error) {
      console.error("Error initializing Google Map:", error);
      setMapError("Failed to initialize map. Please check console for details.");
    }
  }, [reports]);
  
  // Get marker color based on report status
  const getMarkerColor = (status: string): string => {
    switch (status) {
      case "urgent": return "#f43f5e"; // status-urgent
      case "in_progress": return "#8b5cf6"; // status-progress 
      case "resolved": return "#10b981"; // status-resolved
      default: return "#94a3b8"; // gray-400
    }
  };
  
  useEffect(() => {
    // Load the Google Maps API script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.addEventListener('load', () => {
        initGoogleMap();
      });
      
      script.addEventListener('error', () => {
        console.error("Google Maps API failed to load");
        setMapError("Failed to load Google Maps API. Please check your API key.");
      });
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initGoogleMap();
    }
  }, [initGoogleMap]);
  
  // Center the map on the selected report
  useEffect(() => {
    if (selectedReport && googleMap.current && selectedReport.location.lat && selectedReport.location.lng) {
      googleMap.current.setCenter({ 
        lat: selectedReport.location.lat, 
        lng: selectedReport.location.lng 
      });
      googleMap.current.setZoom(15);
    }
  }, [selectedReport]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Water Issue Map</h1>
        <p className="text-gray-600 mb-8">
          View reported water issues in your community.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search for reports..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {filteredReports.length} Reports Found
                </h3>
                
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {filteredReports.map((report) => (
                    <div 
                      key={report.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedReport?.id === report.id 
                          ? 'border-water-bright bg-water-soft/30'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm line-clamp-1">{report.title}</h4>
                        <StatusBadge status={report.status} size="sm" />
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                        {report.location.address}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                  ))}
                  
                  {filteredReports.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No reports found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {selectedReport && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{selectedReport.title}</h3>
                    <StatusBadge status={selectedReport.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{selectedReport.description}</p>
                  <div className="text-xs text-gray-500 mb-2">
                    <strong>Location:</strong> {selectedReport.location.address}
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    <strong>Type:</strong> {selectedReport.issue_type.replace(/_/g, ' ')}
                  </div>
                  <Link 
                    to={`/reports/${selectedReport.id}`} 
                    className="text-sm text-water-bright hover:underline"
                  >
                    View full details
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <CardContent className="p-0 h-full relative">
                {!mapReady && !mapError && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <Droplet size={40} className="animate-bounce mx-auto text-water-bright mb-4" />
                      <p className="text-gray-500">Loading map...</p>
                    </div>
                  </div>
                )}
                
                {mapError && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center max-w-md p-4">
                      <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Map Error</h3>
                      <p className="text-gray-600 mb-4">{mapError}</p>
                      <p className="text-sm text-gray-500">
                        Note: For this demo, you need to replace "YOUR_GOOGLE_MAPS_API_KEY" with a valid Google Maps API key.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Google Maps container */}
                <div 
                  ref={googleMapRef}
                  className="h-full w-full"
                  style={{ display: mapReady && !mapError ? 'block' : 'none' }}
                >
                  {/* Map will be rendered here */}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md">
                  <Layers size={20} className="text-gray-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MapPage;
