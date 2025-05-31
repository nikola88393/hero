import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../../contexts/auth-context";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567",
    department: "Computer Science",
    position: user?.role || "",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.",
  });

  const [passwordData, setPasswordData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handlePasswordChange = (key: string, value: string) => {
    setPasswordData({
      ...passwordData,
      [key]: value,
    });
  };

  const handleSaveProfile = () => {
    // Save profile data (would connect to API in real app)
    setIsEditing(false);
  };

  const handleSavePassword = () => {
    // Save password (would connect to API in real app)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "administrator":
        return "Administrator";
      case "rector":
        return "Rector";
      case "department_head":
        return "Department Head";
      case "instructor":
        return "Instructor";
      case "student":
        return "Student";
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-default-500">
          View and update your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardBody className="flex flex-col items-center py-8">
            <Avatar
              name={user?.name}
              className="w-24 h-24 text-large mb-4"
              showFallback
            />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-default-500">{getRoleLabel(user?.role || "")}</p>
            <Divider className="my-4 w-full" />
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:mail" className="text-default-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-default-500" />
                <span>555-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:briefcase" className="text-default-500" />
                <span>Computer Science Department</span>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              color="primary"
              variant="flat"
              startContent={<Icon icon="lucide:upload" />}
            >
              Upload Photo
            </Button>
          </CardBody>
        </Card>

        {/* Profile Details & Settings */}
        <div className="lg:col-span-2">
          <Tabs aria-label="Profile tabs">
            <Tab key="details" title="Profile Details">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  {!isEditing ? (
                    <Button
                      variant="flat"
                      color="primary"
                      onPress={() => setIsEditing(true)}
                      startContent={<Icon icon="lucide:edit" />}
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="flat"
                        onPress={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" onPress={handleSaveProfile}>
                        Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onValueChange={(value) =>
                          handleInputChange("name", value)
                        }
                        isDisabled={!isEditing}
                      />
                      <Input
                        label="Email"
                        value={formData.email}
                        onValueChange={(value) =>
                          handleInputChange("email", value)
                        }
                        isDisabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Phone"
                        value={formData.phone}
                        onValueChange={(value) =>
                          handleInputChange("phone", value)
                        }
                        isDisabled={!isEditing}
                      />
                      <Input
                        label="Department"
                        value={formData.department}
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                        isDisabled={!isEditing}
                      />
                    </div>
                    <Input
                      label="Position"
                      value={formData.position}
                      onValueChange={(value) =>
                        handleInputChange("position", value)
                      }
                      isDisabled={!isEditing}
                    />
                    <Input
                      label="Bio"
                      value={formData.bio}
                      onValueChange={(value) => handleInputChange("bio", value)}
                      isDisabled={!isEditing}
                      type="textarea"
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="password" title="Change Password">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Change Password</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <Input
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onValueChange={(value) =>
                        handlePasswordChange("currentPassword", value)
                      }
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onValueChange={(value) =>
                        handlePasswordChange("newPassword", value)
                      }
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onValueChange={(value) =>
                        handlePasswordChange("confirmPassword", value)
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        color="primary"
                        onPress={handleSavePassword}
                        isDisabled={
                          !passwordData.currentPassword ||
                          !passwordData.newPassword ||
                          passwordData.newPassword !==
                            passwordData.confirmPassword
                        }
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="notifications" title="Notifications">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    Notification Settings
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="p-4 text-center">
                    <p className="text-default-500">
                      Notification settings will be available here.
                    </p>
                    <p className="text-sm mt-2">This feature is coming soon.</p>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
