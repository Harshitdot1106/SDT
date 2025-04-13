
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Report, IssueType, Status } from "@/types";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - to be replaced with Supabase fetch
const mockReports: Report[] = [
  {
    id: "1",
    title: "Burst pipe on Main Street",
    description: "Water is flooding the road and causing traffic issues. The water has been flowing for over an hour and is starting to create a sinkhole. City workers have been notified but have not yet arrived.",
    issue_type: "leak",
    status: "urgent",
    location: {
      address: "123 Main St, Anytown",
      lat: 40.7128,
      lng: -74.006,
    },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    user_id: "user1",
    user: {
      full_name: "John Doe",
      email: "john@example.com",
    },
    comments: [
      {
        id: "c1",
        content: "We've dispatched a maintenance crew to address this issue.",
        report_id: "1",
        user_id: "admin1",
        created_at: new Date(Date.now() - 2700000).toISOString(),
        user: {
          full_name: "Water Dept Admin",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "2",
    title: "Brown water coming from tap",
    description: "The water from my kitchen tap has been brown for two days. It has a metallic smell and leaves stains in the sink. This started after the construction work on our street.",
    issue_type: "contamination",
    status: "in_progress",
    location: {
      address: "456 Oak Ave, Anytown",
      lat: 40.7228,
      lng: -74.016,
    },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: "user2",
    user: {
      full_name: "Jane Smith",
      email: "jane@example.com",
    },
    comments: [
      {
        id: "c2",
        content: "This may be due to rust in the pipes. We'll send someone to check.",
        report_id: "2",
        user_id: "admin1",
        created_at: new Date(Date.now() - 129600000).toISOString(),
        user: {
          full_name: "Water Dept Admin",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "3",
    title: "No water pressure",
    description: "Extremely low water pressure throughout the house since this morning. All faucets are affected, and the shower is barely usable.",
    issue_type: "pressure",
    status: "pending",
    location: {
      address: "789 Pine St, Anytown",
      lat: 40.7328,
      lng: -74.026,
    },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    user_id: "user3",
    user: {
      full_name: "Bob Johnson",
      email: "bob@example.com",
    },
    comments: [],
  },
  {
    id: "4",
    title: "Water meter reading incorrect",
    description: "My water bill shows unusually high usage that doesn't match our consumption. The bill is nearly triple our average amount with no change in usage.",
    issue_type: "billing",
    status: "resolved",
    location: {
      address: "101 Elm St, Anytown",
      lat: 40.7428,
      lng: -74.036,
    },
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user_id: "user4",
    user: {
      full_name: "Alice Brown",
      email: "alice@example.com",
    },
    comments: [
      {
        id: "c3",
        content: "We've recalculated your bill and issued a credit.",
        report_id: "4",
        user_id: "admin2",
        created_at: new Date(Date.now() - 432000000).toISOString(),
        user: {
          full_name: "Billing Department",
          role: "admin",
        },
      },
      {
        id: "c4",
        content: "Thank you for resolving this so quickly!",
        report_id: "4",
        user_id: "user4",
        created_at: new Date(Date.now() - 345600000).toISOString(),
        user: {
          full_name: "Alice Brown",
          role: "user",
        },
      },
    ],
  },
  {
    id: "5",
    title: "Flooding in basement",
    description: "After heavy rain, water is seeping into my basement through the foundation. The carpet is soaked and there's about an inch of standing water.",
    issue_type: "flooding",
    status: "urgent",
    location: {
      address: "202 Maple Dr, Anytown",
      lat: 40.7528,
      lng: -74.046,
    },
    created_at: new Date(Date.now() - 43200000).toISOString(),
    updated_at: new Date(Date.now() - 21600000).toISOString(),
    user_id: "user5",
    user: {
      full_name: "Sam Wilson",
      email: "sam@example.com",
    },
    comments: [],
  },
];

const ReportsPage = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");

  const filteredAndSortedReports = reports
    .filter((report) => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || report.status === statusFilter;
      const matchesType = typeFilter === "all" || report.issue_type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      
      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Water Issue Reports</h1>
            <p className="text-gray-600">
              Browse all reported water issues in your community.
            </p>
          </div>
          
          <Link to="/report-issue">
            <Button className="water-button">
              <PlusCircle className="mr-2 h-4 w-4" />
              Report New Issue
            </Button>
          </Link>
        </div>
        
        <div className="bg-white p-4 rounded-lg border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search reports..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Issue Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="leak">Leaks</SelectItem>
                    <SelectItem value="contamination">Contamination</SelectItem>
                    <SelectItem value="pressure">Pressure Issues</SelectItem>
                    <SelectItem value="outage">Outages</SelectItem>
                    <SelectItem value="billing">Billing Issues</SelectItem>
                    <SelectItem value="flooding">Flooding</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select
                  value={sortOrder}
                  onValueChange={setSortOrder}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {filteredAndSortedReports.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-6">
              No water issues matching your criteria were found.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
