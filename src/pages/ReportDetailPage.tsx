
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useReports } from "@/context/ReportsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft, MapPin, Calendar, MessageSquare, User } from "lucide-react";

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports } = useReports();
  const [report, setReport] = useState(reports.find(r => r.id === id));

  useEffect(() => {
    if (!report) {
      const foundReport = reports.find(r => r.id === id);
      if (foundReport) {
        setReport(foundReport);
      }
    }
  }, [id, reports, report]);

  if (!report) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
          <p className="text-gray-600 mb-6">The report you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline" onClick={() => navigate("/reports")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/reports")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold">{report.title}</h1>
            <StatusBadge status={report.status} />
          </div>
          
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
            </span>
            {report.location.address && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {report.location.address}
              </span>
            )}
            <span className="flex items-center gap-1">
              <User size={14} />
              {report.user?.full_name || "Anonymous"}
            </span>
            <span className="capitalize bg-gray-100 px-2 py-0.5 rounded-full">
              {report.issue_type.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
              </CardContent>
            </Card>
            
            {report.comments && report.comments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Comments ({report.comments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {report.comments.map((comment) => (
                      <div key={comment.id} className="p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">
                            {comment.user?.full_name || "Anonymous"}
                            {comment.user?.role === "admin" && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Staff
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                    <StatusBadge status={report.status} />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Issue Type</div>
                    <div className="capitalize">{report.issue_type.replace(/_/g, ' ')}</div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Submitted By</div>
                    <div>{report.user?.full_name || "Anonymous"}</div>
                    {report.user?.email && (
                      <div className="text-sm text-gray-500">{report.user.email}</div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Submitted On</div>
                    <div>{format(new Date(report.created_at), 'PPP')}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(report.created_at), 'p')}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Last Updated</div>
                    <div>{format(new Date(report.updated_at), 'PPP')}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(report.updated_at), 'p')}
                    </div>
                  </div>
                  
                  {report.location.lat && report.location.lng && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Coordinates</div>
                        <div className="text-sm font-mono">
                          {report.location.lat}, {report.location.lng}
                        </div>
                      </div>
                    </>
                  )}
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

export default ReportDetailPage;
