
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropletIcon,
  UserIcon,
  ClipboardCheckIcon,
  AlertCircleIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpDown,
} from "lucide-react";
import { Report, Status } from "@/types";
import { formatDistanceToNow } from "date-fns";

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
    user_id: "user1",
    user: {
      full_name: "John Doe",
      email: "john@example.com",
    },
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
    user_id: "user2",
    user: {
      full_name: "Jane Smith",
      email: "jane@example.com",
    },
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
    user_id: "user3",
    user: {
      full_name: "Bob Johnson",
      email: "bob@example.com",
    },
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
    user_id: "user4",
    user: {
      full_name: "Alice Brown",
      email: "alice@example.com",
    },
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
    user_id: "user5",
    user: {
      full_name: "Sam Wilson",
      email: "sam@example.com",
    },
  },
];

const AdminDashboard = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.user?.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const updateReportStatus = (reportId: string, newStatus: Status) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus, updated_at: new Date().toISOString() } 
        : report
    ));
  };
  
  const getMetrics = () => {
    const urgent = reports.filter(r => r.status === "urgent").length;
    const inProgress = reports.filter(r => r.status === "in_progress").length;
    const resolved = reports.filter(r => r.status === "resolved").length;
    const pending = reports.filter(r => r.status === "pending").length;
    
    return { urgent, inProgress, resolved, pending };
  };
  
  const metrics = getMetrics();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage and update water issue reports.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-status-urgent/10">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Urgent Issues</p>
                <p className="text-3xl font-bold">{metrics.urgent}</p>
              </div>
              <AlertCircleIcon className="h-8 w-8 text-status-urgent" />
            </CardContent>
          </Card>
          
          <Card className="bg-status-progress/10">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-3xl font-bold">{metrics.inProgress}</p>
              </div>
              <ClipboardCheckIcon className="h-8 w-8 text-status-progress" />
            </CardContent>
          </Card>
          
          <Card className="bg-status-resolved/10">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-3xl font-bold">{metrics.resolved}</p>
              </div>
              <DropletIcon className="h-8 w-8 text-status-resolved" />
            </CardContent>
          </Card>
          
          <Card className="bg-gray-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-3xl font-bold">{metrics.pending}</p>
              </div>
              <UserIcon className="h-8 w-8 text-gray-500" />
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Issue Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search by title, description, location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FilterIcon size={16} className="text-gray-500" />
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
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
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        Title
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No reports found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.user?.full_name}</TableCell>
                        <TableCell className="truncate max-w-xs">{report.location.address}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={report.status} />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={report.status}
                            onValueChange={(value) => updateReportStatus(report.id, value as Status)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
