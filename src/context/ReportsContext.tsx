
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Report, IssueType, Status } from "@/types";

// Initial reports data - same as our mock data from before
const initialReports: Report[] = [
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

interface ReportsContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "created_at" | "updated_at" | "comments">) => void;
  updateReportStatus: (reportId: string, newStatus: Status) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const addReport = (newReport: Omit<Report, "id" | "created_at" | "updated_at" | "comments">) => {
    const now = new Date().toISOString();
    const report: Report = {
      ...newReport,
      id: `report-${Date.now()}`, // Generate a unique ID
      created_at: now,
      updated_at: now,
      comments: [],
    };

    setReports((prevReports) => [report, ...prevReports]);
  };

  const updateReportStatus = (reportId: string, newStatus: Status) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, status: newStatus, updated_at: new Date().toISOString() }
          : report
      )
    );
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReportStatus }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};
