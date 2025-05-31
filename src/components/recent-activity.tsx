import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

import { UserRole } from "../contexts/auth-context";

interface RecentActivityProps {
  userRole?: UserRole;
}

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "course" | "grade" | "user" | "department" | "attendance";
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ userRole }) => {
  // Mock data based on user role
  const getActivities = (): ActivityItem[] => {
    switch (userRole) {
      case "administrator":
      case "rector":
        return [
          {
            id: 1,
            user: "Dr. Sarah Johnson",
            action: "added a new course",
            target: "Advanced Database Systems",
            time: "10 minutes ago",
            type: "course",
          },
          {
            id: 2,
            user: "Admin",
            action: "created a new department",
            target: "Data Science",
            time: "2 hours ago",
            type: "department",
          },
          {
            id: 3,
            user: "Prof. Michael Chen",
            action: "submitted grades for",
            target: "Introduction to AI",
            time: "3 hours ago",
            type: "grade",
          },
          {
            id: 4,
            user: "Admin",
            action: "added a new instructor",
            target: "Dr. Emily Rodriguez",
            time: "5 hours ago",
            type: "user",
          },
          {
            id: 5,
            user: "Dr. James Wilson",
            action: "marked attendance for",
            target: "Software Engineering",
            time: "1 day ago",
            type: "attendance",
          },
        ];
      case "department_head":
        return [
          {
            id: 1,
            user: "Dr. Sarah Johnson",
            action: "added a new course",
            target: "Advanced Database Systems",
            time: "10 minutes ago",
            type: "course",
          },
          {
            id: 2,
            user: "Prof. Michael Chen",
            action: "submitted grades for",
            target: "Introduction to AI",
            time: "3 hours ago",
            type: "grade",
          },
          {
            id: 3,
            user: "You",
            action: "approved curriculum for",
            target: "Fall Semester",
            time: "4 hours ago",
            type: "course",
          },
          {
            id: 4,
            user: "Dr. Emily Rodriguez",
            action: "requested leave for",
            target: "Next Monday",
            time: "1 day ago",
            type: "user",
          },
          {
            id: 5,
            user: "Dr. James Wilson",
            action: "marked attendance for",
            target: "Software Engineering",
            time: "1 day ago",
            type: "attendance",
          },
        ];
      case "instructor":
        return [
          {
            id: 1,
            user: "You",
            action: "submitted grades for",
            target: "Database Management",
            time: "1 hour ago",
            type: "grade",
          },
          {
            id: 2,
            user: "You",
            action: "marked attendance for",
            target: "Web Development",
            time: "3 hours ago",
            type: "attendance",
          },
          {
            id: 3,
            user: "Student John Smith",
            action: "submitted assignment for",
            target: "Database Management",
            time: "5 hours ago",
            type: "course",
          },
          {
            id: 4,
            user: "Department Head",
            action: "assigned you to teach",
            target: "Advanced Programming",
            time: "1 day ago",
            type: "course",
          },
          {
            id: 5,
            user: "You",
            action: "created a new assignment for",
            target: "Web Development",
            time: "2 days ago",
            type: "course",
          },
        ];
      case "student":
        return [
          {
            id: 1,
            user: "Prof. Michael Chen",
            action: "graded your assignment in",
            target: "Introduction to AI",
            time: "2 hours ago",
            type: "grade",
          },
          {
            id: 2,
            user: "Dr. Sarah Johnson",
            action: "posted new materials for",
            target: "Advanced Database Systems",
            time: "5 hours ago",
            type: "course",
          },
          {
            id: 3,
            user: "You",
            action: "submitted assignment for",
            target: "Web Development",
            time: "1 day ago",
            type: "course",
          },
          {
            id: 4,
            user: "Prof. James Wilson",
            action: "marked you present in",
            target: "Software Engineering",
            time: "2 days ago",
            type: "attendance",
          },
          {
            id: 5,
            user: "Dr. Emily Rodriguez",
            action: "posted announcement in",
            target: "Data Structures",
            time: "3 days ago",
            type: "course",
          },
        ];
      default:
        return [];
    }
  };

  const activities = getActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return "lucide:book-open";
      case "grade":
        return "lucide:check-square";
      case "user":
        return "lucide:user";
      case "department":
        return "lucide:briefcase";
      case "attendance":
        return "lucide:calendar";
      default:
        return "lucide:activity";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-primary-100 text-primary-500";
      case "grade":
        return "bg-success-100 text-success-500";
      case "user":
        return "bg-secondary-100 text-secondary-500";
      case "department":
        return "bg-warning-100 text-warning-500";
      case "attendance":
        return "bg-danger-100 text-danger-500";
      default:
        return "bg-default-100 text-default-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Chip color="primary" variant="flat" size="sm">
          Last 7 days
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div
                className={`p-2 rounded-full h-10 w-10 flex items-center justify-center ${getActivityColor(activity.type)}`}
              >
                <Icon icon={getActivityIcon(activity.type)} width={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-default-500">{activity.action}</span>
                  <span className="font-medium">{activity.target}</span>
                </div>
                <p className="text-xs text-default-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
