import { useState, useMemo } from "react";
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
import { Status } from "@/types";
import { useReports } from "@/context/ReportsContext";
import { formatDistanceToNow } from "date-fns";

const DashboardPage = () => {
  const { reports } = useReports();
  const [timeframe, setTimeframe] = useState("all");
  
  // Compute stats from the reports
  const stats = useMemo(() => {
    // Count reports by status
    const statusData = [
      { name: "Urgent", value: reports.filter(r => r.status === "urgent").length, color: "#f43f5e" },
      { name: "In Progress", value: reports.filter(r => r.status === "in_progress").length, color: "#8b5cf6" },
      { name: "Resolved", value: reports.filter(r => r.status === "resolved").length, color: "#10b981" },
      { name: "Pending", value: reports.filter(r => r.status === "pending").length, color: "#94a3b8" }
    ];

    // Count reports by type
    const typeData = [
      { name: "Leak", value: reports.filter(r => r.issue_type === "leak").length, color: "#3b82f6" },
      { name: "Contamination", value: reports.filter(r => r.issue_type === "contamination").length, color: "#ef4444" },
      { name: "Pressure", value: reports.filter(r => r.issue_type === "pressure").length, color: "#f59e0b" },
      { name: "Outage", value: reports.filter(r => r.issue_type === "outage").length, color: "#6b7280" },
      { name: "Billing", value: reports.filter(r => r.issue_type === "billing").length, color: "#8b5cf6" },
      { name: "Flooding", value: reports.filter(r => r.issue_type === "flooding").length, color: "#06b6d4" },
      { name: "Other", value: reports.filter(r => r.issue_type === "other").length, color: "#d1d5db" }
    ];

    // Get recent reports
    const recentReports = reports
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map(report => ({
        id: report.id,
        title: report.title,
        location: report.location.address,
        status: report.status,
        date: formatDistanceToNow(new Date(report.created_at), { addSuffix: true })
      }));

    // Calculate resolution rate
    const currentMonth = new Date().getMonth();
    const reportsThisMonth = reports.filter(report => {
      const reportMonth = new Date(report.created_at).getMonth();
      return reportMonth === currentMonth;
    });

    const resolvedThisMonth = reportsThisMonth.filter(
      report => report.status === "resolved"
    ).length;

    const totalReportsThisMonth = reportsThisMonth.length;
    const percentResolved = totalReportsThisMonth > 0 
      ? Math.round((resolvedThisMonth / totalReportsThisMonth) * 100)
      : 0;

    return {
      statusData,
      typeData,
      recentReports,
      resolvedThisMonth,
      totalReportsThisMonth,
      percentResolved
    };
  }, [reports]);

  // We'll keep using the mock data for monthly data since we don't have real historical data
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
                  <p className="text-3xl font-bold">{stats.statusData[0].value}</p>
                </div>
                <CircleAlertIcon className="h-8 w-8 text-status-urgent" />
              </CardContent>
            </Card>
            
            <Card className="bg-status-progress/10 border-status-progress/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-3xl font-bold">{stats.statusData[1].value}</p>
                </div>
                <ClipboardCheckIcon className="h-8 w-8 text-status-progress" />
              </CardContent>
            </Card>
            
            <Card className="bg-status-resolved/10 border-status-resolved/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Resolved</p>
                  <p className="text-3xl font-bold">{stats.statusData[2].value}</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-status-resolved" />
              </CardContent>
            </Card>
            
            <Card className="bg-gray-100">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Pending Review</p>
                  <p className="text-3xl font-bold">{stats.statusData[3].value}</p>
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
                            data={stats.statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {stats.statusData.map((entry, index) => (
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
                            data={stats.typeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {stats.typeData.map((entry, index) => (
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
                    <div className="text-5xl font-bold text-status-resolved mb-2">{stats.percentResolved}%</div>
                    <p className="text-sm text-gray-500 mb-4">Issues resolved this month</p>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-status-resolved"
                        style={{ width: `${stats.percentResolved}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full text-sm text-gray-500 mt-2">
                      <span>{stats.resolvedThisMonth} resolved</span>
                      <span>{stats.totalReportsThisMonth} total</span>
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
                    {stats.recentReports.map((report) => (
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
