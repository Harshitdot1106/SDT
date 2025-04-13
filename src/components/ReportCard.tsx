
import { Calendar, MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Report } from "@/types";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ReportCardProps {
  report: Report;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const {
    id,
    title,
    description,
    status,
    location,
    created_at,
    user,
    comments,
    issue_type
  } = report;

  const formattedDate = formatDistanceToNow(new Date(created_at), { addSuffix: true });
  
  return (
    <Card className="water-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/reports/${id}`}>
            <h3 className="font-medium text-lg hover:text-water-bright transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full">
            {issue_type.replace(/_/g, ' ')}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm line-clamp-2">
          {description}
        </p>
        {location.address && (
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <MapPin size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{location.address}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 text-xs border-t flex justify-between">
        <div className="text-gray-500">
          Reported by {user?.full_name || "Anonymous"}
        </div>
        {comments && comments.length > 0 && (
          <div className="flex items-center text-gray-500">
            <MessageSquare size={12} className="mr-1" />
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
