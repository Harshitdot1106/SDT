
export type Status = "urgent" | "in_progress" | "resolved" | "pending";

export type IssueType = 
  | "leak" 
  | "contamination" 
  | "pressure" 
  | "outage" 
  | "billing" 
  | "flooding"
  | "other";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: "user" | "admin";
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  issue_type: IssueType;
  status: Status;
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  images?: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
  user?: {
    full_name: string;
    email: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  report_id: string;
  user_id: string;
  created_at: string;
  user?: {
    full_name: string;
    role: "user" | "admin";
  };
}

export interface NotificationType {
  id: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  user_id: string;
  report_id?: string;
}
