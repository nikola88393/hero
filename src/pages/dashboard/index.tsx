import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../../contexts/auth-context";
import { DashboardMetrics } from "../../components/dashboard-metrics";
import { RecentActivity } from "../../components/recent-activity";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-default-500">
          {user?.role === "administrator" && "Administrator Dashboard"}
          {user?.role === "rector" && "Rector Dashboard"}
          {user?.role === "department_head" && "Department Head Dashboard"}
          {user?.role === "instructor" && "Instructor Dashboard"}
          {user?.role === "student" && "Student Dashboard"}
        </p>
      </div>

      <DashboardMetrics userRole={user?.role} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity userRole={user?.role} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {user?.role === "administrator" && (
                  <>
                    <Button
                      as={RouterLink}
                      to="/users"
                      variant="flat"
                      color="primary"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:user-plus" />}
                    >
                      Add New User
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/departments"
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:plus-circle" />}
                    >
                      Create Department
                    </Button>
                  </>
                )}

                {(user?.role === "administrator" ||
                  user?.role === "rector") && (
                  <Button
                    as={RouterLink}
                    to="/statistics"
                    variant="flat"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:bar-chart-2" />}
                  >
                    View Statistics
                  </Button>
                )}

                {(user?.role === "department_head" ||
                  user?.role === "instructor") && (
                  <Button
                    as={RouterLink}
                    to="/students"
                    variant="flat"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:users" />}
                  >
                    Manage Students
                  </Button>
                )}

                {user?.role === "instructor" && (
                  <Button
                    as={RouterLink}
                    to="/grades"
                    variant="flat"
                    color="primary"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:edit-3" />}
                  >
                    Enter Grades
                  </Button>
                )}

                {user?.role === "student" && (
                  <>
                    <Button
                      as={RouterLink}
                      to="/grades"
                      variant="flat"
                      color="primary"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:file-text" />}
                    >
                      View Grades
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/curriculum"
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:calendar" />}
                    >
                      View Schedule
                    </Button>
                  </>
                )}

                <Button
                  as={RouterLink}
                  to="/profile"
                  variant="flat"
                  className="w-full justify-start"
                  startContent={<Icon icon="lucide:settings" />}
                >
                  Profile Settings
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold mb-2">Help & Resources</h2>
              <p className="text-default-500 text-sm mb-4">
                Get help with using the College Management System
              </p>
              <div className="space-y-3">
                <Link href="#" className="flex items-center gap-2 text-primary">
                  <Icon icon="lucide:book" />
                  <span>User Guide</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-primary">
                  <Icon icon="lucide:help-circle" />
                  <span>FAQ</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-primary">
                  <Icon icon="lucide:video" />
                  <span>Video Tutorials</span>
                </Link>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="light"
                className="w-full"
                startContent={<Icon icon="lucide:message-circle" />}
              >
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
