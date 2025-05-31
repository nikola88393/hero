import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, Link, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../contexts/auth-context";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "lucide:layout-dashboard",
      roles: [
        "administrator",
        "rector",
        "department_head",
        "instructor",
        "student",
      ],
    },
    {
      label: "College Info",
      path: "/college",
      icon: "lucide:building",
      roles: ["administrator", "rector"],
    },
    {
      label: "Departments",
      path: "/departments",
      icon: "lucide:components",
      roles: ["administrator", "rector"],
    },
    {
      label: "Faculties",
      path: "/faculties",
      icon: "lucide:briefcase",
      roles: ["administrator", "rector"],
    },
    {
      label: "Instructors",
      path: "/instructors",
      icon: "lucide:users",
      roles: ["administrator", "rector", "department_head"],
    },
    {
      label: "Students",
      path: "/students",
      icon: "lucide:graduation-cap",
      roles: ["administrator", "rector", "department_head", "instructor"],
    },
    {
      label: "Courses",
      path: "/courses",
      icon: "lucide:book-open",
      roles: ["administrator", "rector", "department_head"],
    },
    {
      label: "Curriculum",
      path: "/curriculum",
      icon: "lucide:calendar",
      roles: ["administrator", "rector", "department_head"],
    },
    {
      label: "Grades",
      path: "/grades",
      icon: "lucide:bar-chart",
      roles: ["instructor", "student"],
    },
    {
      label: "Statistics",
      path: "/statistics",
      icon: "lucide:pie-chart",
      roles: ["administrator", "rector"],
    },
    {
      label: "User Management",
      path: "/users",
      icon: "lucide:users-2",
      roles: ["administrator"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div
      className={`bg-content1 border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col h-full`}
    >
      {/* Logo */}
      <div
        className={`p-4 flex items-center ${isOpen ? "justify-start" : "justify-center"}`}
      >
        <Link
          as={RouterLink}
          to="/dashboard"
          className="flex items-center gap-2"
        >
          <Icon
            icon="lucide:graduation-cap"
            width={24}
            height={24}
            className="text-primary"
          />
          {isOpen && <span className="font-bold text-lg">CMS</span>}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;

            return isOpen ? (
              <Button
                key={item.path}
                as={RouterLink}
                to={item.path}
                variant={isActive ? "flat" : "light"}
                color={isActive ? "primary" : "default"}
                className="justify-start w-full mb-1"
                startContent={<Icon icon={item.icon} width={20} />}
              >
                {item.label}
              </Button>
            ) : (
              <Tooltip key={item.path} content={item.label} placement="right">
                <Button
                  as={RouterLink}
                  to={item.path}
                  isIconOnly
                  variant={isActive ? "flat" : "light"}
                  color={isActive ? "primary" : "default"}
                  className="w-full mb-1"
                >
                  <Icon icon={item.icon} width={20} />
                </Button>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
