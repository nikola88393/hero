import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../contexts/auth-context";
import { Sidebar } from "../components/sidebar";
import { ThemeSwitcher } from "../components/theme-switch";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current page title from the path
  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];

    if (!path) return "Dashboard";

    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <Navbar maxWidth="full" className="border-b">
          <NavbarContent className="sm:hidden" justify="start">
            <Button isIconOnly variant="light" onPress={toggleSidebar}>
              <Icon icon="lucide:menu" width={24} />
            </Button>
          </NavbarContent>

          <NavbarBrand className="hidden sm:flex">
            <Button
              isIconOnly
              variant="light"
              onPress={toggleSidebar}
              className="mr-2"
            >
              <Icon
                icon={
                  isSidebarOpen
                    ? "lucide:panel-left-close"
                    : "lucide:panel-left"
                }
                width={20}
              />
            </Button>
            <p className="font-bold text-inherit">{getPageTitle()}</p>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" isIconOnly className="rounded-full">
                  <Avatar
                    name={user?.name}
                    size="sm"
                    className="transition-transform"
                    showFallback
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile" textValue="Profile">
                  <div className="flex flex-col gap-1">
                    <User
                      name={user?.name}
                      description={user?.role}
                      avatarProps={{
                        name: user?.name,
                        size: "sm",
                        showFallback: true,
                      }}
                    />
                  </div>
                </DropdownItem>
                <DropdownItem key="settings">
                  <RouterLink to="/profile">My Profile</RouterLink>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
