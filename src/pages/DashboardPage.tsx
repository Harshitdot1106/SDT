
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { 
  BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from "recharts";
import { 
  DropletIcon, 
  CircleAlertIcon, 
  ClipboardCheckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  MapPinIcon,
  CalendarIcon
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const statusData = [
  { name: "Urgent", value: 24, color: "#f43f5e" },
  { name: "In Progress", value: 38, color: "#8b5cf6" },
  { name: "Resolved", value: 65, color: "#10b981" },
  { name: "Pending", value: 18, color: "#94a3b8" }
];

const typeData = [
  { name: "Leak", value: 35, color: "#3b82f6" },
  { name: "Contamination", value: 22, color: "#ef4444" },
  { name: "Pressure", value: 18, color: "#f59e0b" },
  { name: "Outage", value: 15, color: "#6b7280" },
  { name: "Billing", value: 12, color: "#8b5cf6" },
  { name: "Flooding", value: 25, color: "#06b6d4" },
  { name: "Other", value: 8, color: "#d1d5db" }
];

const monthlyData = [
  { name: "Jan", issues: 42, resolved: 35 },
  { name: "Feb", issues: 38, resolved: 30 },
  { name: "Mar", issues: 55, resolved: 45 },
  { name: "Apr", issues: 47, resolved: 40 },
  { name: "May", issues: 60, resolved: 48 },
  { name: "Jun", issues: 65, resolved: 52 },
  { name: "Jul", issues: 75, resolved: 58 },
  { name: "Aug", issues: 80, resolved: 65 },
  { name: "Sep", issues: 65, resolved: 55 },
  { name: "Oct", issues: 70, resolved: 60 },
  { name: "Nov", issues: 45, resolved: 38 },
  { name: "Dec", issues: 50, resolved: 42 }
];

const recentReports = [
  {
    id: "1",
    title: "Burst pipe on Main Street",
    location: "123 Main St, Anytown",
    status: "urgent",
    date: "12 hours ago"
  },
  {
    id: "2",
    title: "Brown water coming from tap",
    location: "456 Oak Ave, Anytown",
    status: "in_progress",
    date: "2 days ago"
  },
  {
    id: "3",
    title: "No water pressure",
    location: "789 Pine St, Anytown",
    status: "pending",
    date: "3 days ago"
  },
  {
    id: "4",
    title: "Water meter reading incorrect",
    location: "101 Elm St, Anytown",
    status: "resolved",
    date: "1 week ago"
  },
  {
    id: "5",
    title: "Flooding in basement",
    location: "202 Maple Dr, Anytown",
    status: "urgent",
    date: "12 hours ago"
  }
];

const resolvedThisMonth = 42;
const totalReportsThisMonth = 58;
const percentResolved = Math.round((resolvedThisMonth / totalReportsThisMonth) * 100);

const DashboardPage = () => {
  const [timeframe, setTimeframe] = useState("all");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Water Issues Dashboard</h1>
              <p className="text-gray-600">
                Public data on water issues reported in your community.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/report-issue">
                <Button className="water-button">
                  Report New Issue
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline">
                  View Issue Map
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-status-urgent/10 border-status-urgent/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Urgent Issues</p>
                  <p className="text-3xl font-bold">{statusData[0].value}</p>
                </div>
                <CircleAlertIcon className="h-8 w-8 text-status-urgent" />
              </CardContent>
            </Card>
            
            <Card className="bg-status-progress/10 border-status-progress/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-3xl font-bold">{statusData[1].value}</p>
                </div>
                <ClipboardCheckIcon className="h-8 w-8 text-status-progress" />
              </CardContent>
            </Card>
            
            <Card className="bg-status-resolved/10 border-status-resolved/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Resolved</p>
                  <p className="text-3xl font-bold">{statusData[2].value}</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-status-resolved" />
              </CardContent>
            </Card>
            
            <Card className="bg-gray-100">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Pending Review</p>
                  <p className="text-3xl font-bold">{statusData[3].value}</p>
                </div>
                <ClockIcon className="h-8 w-8 text-gray-500" />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Charts */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reports</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="issues" name="Issues Reported" fill="#1EAEDB" />
                        <Bar dataKey="resolved" name="Issues Resolved" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Issue Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Issue Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={typeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {typeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right column - Recent reports and Resolution rate */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-status-resolved mb-2">{percentResolved}%</div>
                    <p className="text-sm text-gray-500 mb-4">Issues resolved this month</p>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-status-resolved"
                        style={{ width: `${percentResolved}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full text-sm text-gray-500 mt-2">
                      <span>{resolvedThisMonth} resolved</span>
                      <span>{totalReportsThisMonth} total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/reports/${report.id}`} className="font-medium hover:text-water-bright transition-colors">
                            {report.title}
                          </Link>
                          <StatusBadge status={report.status} size="sm" />
                        </div>
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{report.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/reports" className="block text-center text-sm text-water-bright hover:underline mt-4">
                    View all reports
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
