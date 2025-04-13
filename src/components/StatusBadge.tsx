
import { Circle, CircleAlert, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "urgent" | "in_progress" | "resolved" | "pending";

interface StatusBadgeProps {
  status: Status;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const StatusBadge = ({ status, className, showIcon = true, size = "md" }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "urgent":
        return {
          icon: CircleAlert,
          label: "Urgent",
          className: "bg-status-urgent/20 text-status-urgent border border-status-urgent/30"
        };
      case "in_progress":
        return {
          icon: Clock,
          label: "In Progress",
          className: "bg-status-progress/20 text-status-progress border border-status-progress/30"
        };
      case "resolved":
        return {
          icon: CheckCircle,
          label: "Resolved",
          className: "bg-status-resolved/20 text-status-resolved border border-status-resolved/30"
        };
      case "pending":
      default:
        return {
          icon: Circle,
          label: "Pending",
          className: "bg-gray-100 text-gray-600 border border-gray-300"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "text-xs py-0.5 px-2 rounded",
    md: "text-xs py-1 px-2.5 rounded-md",
    lg: "text-sm py-1.5 px-3 rounded-md"
  };
  
  return (
    <span className={cn("status-badge inline-flex items-center font-medium", config.className, sizeClasses[size], className)}>
      {showIcon && <Icon className="mr-1 h-3 w-3" />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
