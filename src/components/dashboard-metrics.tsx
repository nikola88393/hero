import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

import { UserRole } from "../contexts/auth-context";

interface DashboardMetricsProps {
  userRole?: UserRole;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-default-500 text-sm">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon icon={icon} width={24} height={24} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  userRole,
}) => {
  // Mock data based on user role
  const getMetrics = () => {
    switch (userRole) {
      case "administrator":
      case "rector":
        return [
          {
            title: "Total Students",
            value: 1250,
            icon: "lucide:users",
            color: "bg-primary-100 text-primary-500",
          },
          {
            title: "Total Instructors",
            value: 85,
            icon: "lucide:user-check",
            color: "bg-success-100 text-success-500",
          },
          {
            title: "Departments",
            value: 8,
            icon: "lucide:layout",
            color: "bg-warning-100 text-warning-500",
          },
          {
            title: "Courses",
            value: 120,
            icon: "lucide:book",
            color: "bg-secondary-100 text-secondary-500",
          },
        ];
      case "department_head":
        return [
          {
            title: "Department Students",
            value: 320,
            icon: "lucide:users",
            color: "bg-primary-100 text-primary-500",
          },
          {
            title: "Department Instructors",
            value: 18,
            icon: "lucide:user-check",
            color: "bg-success-100 text-success-500",
          },
          {
            title: "Department Courses",
            value: 24,
            icon: "lucide:book",
            color: "bg-warning-100 text-warning-500",
          },
          {
            title: "Avg. Grade",
            value: "B+",
            icon: "lucide:bar-chart-2",
            color: "bg-secondary-100 text-secondary-500",
          },
        ];
      case "instructor":
        return [
          {
            title: "My Courses",
            value: 5,
            icon: "lucide:book",
            color: "bg-primary-100 text-primary-500",
          },
          {
            title: "Total Students",
            value: 145,
            icon: "lucide:users",
            color: "bg-success-100 text-success-500",
          },
          {
            title: "Assignments",
            value: 28,
            icon: "lucide:file-text",
            color: "bg-warning-100 text-warning-500",
          },
          {
            title: "Avg. Grade",
            value: "B",
            icon: "lucide:bar-chart-2",
            color: "bg-secondary-100 text-secondary-500",
          },
        ];
      case "student":
        return [
          {
            title: "Enrolled Courses",
            value: 6,
            icon: "lucide:book",
            color: "bg-primary-100 text-primary-500",
          },
          {
            title: "Completed Credits",
            value: 48,
            icon: "lucide:check-circle",
            color: "bg-success-100 text-success-500",
          },
          {
            title: "Current GPA",
            value: "3.7",
            icon: "lucide:award",
            color: "bg-warning-100 text-warning-500",
          },
          {
            title: "Assignments Due",
            value: 5,
            icon: "lucide:calendar",
            color: "bg-secondary-100 text-secondary-500",
          },
        ];
      default:
        return [];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  );
};
