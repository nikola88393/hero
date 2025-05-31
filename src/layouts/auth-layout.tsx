import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Image } from "@heroui/react";
import { Icon } from "@iconify/react";

import { ThemeSwitcher } from "../components/theme-switch";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-100 dark:bg-primary-900 relative">
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary">
              <Icon icon="lucide:graduation-cap" width={32} height={32} />
              <span className="font-bold text-xl">
                College Management System
              </span>
            </Link>
          </div>
          <div className="relative h-3/4">
            <Image
              removeWrapper
              src="https://img.heroui.chat/ai?w=800&h=1000&u=college-campus"
              alt="College Campus"
              className="object-cover rounded-lg shadow-lg w-full h-full"
            />
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-300">
            © {new Date().getFullYear()} College Management System. All rights
            reserved.
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex lg:hidden items-center gap-2 text-primary"
            >
              <Icon icon="lucide:graduation-cap" width={24} height={24} />
              <span className="font-bold text-lg">CMS</span>
            </Link>
            <ThemeSwitcher />
          </div>

          <Card className="shadow-md">
            <CardBody className="p-6">{children}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
