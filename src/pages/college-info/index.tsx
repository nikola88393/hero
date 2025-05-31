import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface CollegeInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  foundedYear: string;
  accreditation: string;
  mission: string;
  vision: string;
}

interface RectorInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  education: string[];
  appointmentDate: string;
}

const CollegeInfoPage: React.FC = () => {
  const [isEditingCollege, setIsEditingCollege] = React.useState(false);
  const [isEditingRector, setIsEditingRector] = React.useState(false);

  const [collegeInfo, setCollegeInfo] = React.useState<CollegeInfo>({
    name: "University of Technology",
    address: "123 University Avenue",
    city: "Techville",
    state: "California",
    zipCode: "90210",
    country: "United States",
    phone: "(555) 123-4567",
    email: "info@universityoftech.edu",
    website: "www.universityoftech.edu",
    foundedYear: "1965",
    accreditation: "National Association of Universities and Colleges",
    mission:
      "To provide high-quality education and research opportunities that transform students into leaders who make a difference in the world.",
    vision:
      "To be a leading institution of higher education, recognized globally for excellence in teaching, research, and innovation.",
  });

  const [rectorInfo, setRectorInfo] = React.useState<RectorInfo>({
    name: "Dr. Jonathan Smith",
    title: "Rector and Professor of Computer Science",
    email: "rector@universityoftech.edu",
    phone: "(555) 123-4568",
    office: "Administration Building, Room 101",
    bio: "Dr. Jonathan Smith is a distinguished scholar with over 25 years of experience in higher education administration and computer science research. Prior to his appointment as Rector, he served as Dean of the Faculty of Engineering and as Department Head of Computer Science.",
    education: [
      "Ph.D. in Computer Science, Stanford University",
      "M.S. in Computer Engineering, MIT",
      "B.S. in Electrical Engineering, Caltech",
    ],
    appointmentDate: "2018-09-01",
  });

  const handleCollegeInfoChange = (key: keyof CollegeInfo, value: string) => {
    setCollegeInfo({
      ...collegeInfo,
      [key]: value,
    });
  };

  const handleRectorInfoChange = (
    key: keyof RectorInfo,
    value: string | string[]
  ) => {
    setRectorInfo({
      ...rectorInfo,
      [key]: value,
    });
  };

  const handleRectorEducationChange = (index: number, value: string) => {
    const newEducation = [...rectorInfo.education];

    newEducation[index] = value;
    handleRectorInfoChange("education", newEducation);
  };

  const addEducationField = () => {
    handleRectorInfoChange("education", [...rectorInfo.education, ""]);
  };

  const removeEducationField = (index: number) => {
    const newEducation = [...rectorInfo.education];

    newEducation.splice(index, 1);
    handleRectorInfoChange("education", newEducation);
  };

  const handleSaveCollege = () => {
    // Save college info (would connect to API in real app)
    setIsEditingCollege(false);
  };

  const handleSaveRector = () => {
    // Save rector info (would connect to API in real app)
    setIsEditingRector(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">College Information</h1>
        <p className="text-default-500">
          Manage college details and rector information
        </p>
      </div>

      <Tabs aria-label="College Information">
        <Tab key="college" title="College Details">
          <Card className="mt-4">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">College Information</h2>
              {!isEditingCollege ? (
                <Button
                  variant="flat"
                  color="primary"
                  onPress={() => setIsEditingCollege(true)}
                  startContent={<Icon icon="lucide:edit" />}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="flat"
                    onPress={() => setIsEditingCollege(false)}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleSaveCollege}>
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="College Name"
                    value={collegeInfo.name}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("name", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                  <Input
                    label="Founded Year"
                    value={collegeInfo.foundedYear}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("foundedYear", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                </div>

                <Input
                  label="Address"
                  value={collegeInfo.address}
                  onValueChange={(value) =>
                    handleCollegeInfoChange("address", value)
                  }
                  isDisabled={!isEditingCollege}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={collegeInfo.city}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("city", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                  <Input
                    label="State/Province"
                    value={collegeInfo.state}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("state", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                  <Input
                    label="Zip/Postal Code"
                    value={collegeInfo.zipCode}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("zipCode", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                </div>

                <Input
                  label="Country"
                  value={collegeInfo.country}
                  onValueChange={(value) =>
                    handleCollegeInfoChange("country", value)
                  }
                  isDisabled={!isEditingCollege}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Phone"
                    value={collegeInfo.phone}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("phone", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                  <Input
                    label="Email"
                    value={collegeInfo.email}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("email", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                  <Input
                    label="Website"
                    value={collegeInfo.website}
                    onValueChange={(value) =>
                      handleCollegeInfoChange("website", value)
                    }
                    isDisabled={!isEditingCollege}
                  />
                </div>

                <Input
                  label="Accreditation"
                  value={collegeInfo.accreditation}
                  onValueChange={(value) =>
                    handleCollegeInfoChange("accreditation", value)
                  }
                  isDisabled={!isEditingCollege}
                />

                <Input
                  label="Mission"
                  value={collegeInfo.mission}
                  onValueChange={(value) =>
                    handleCollegeInfoChange("mission", value)
                  }
                  isDisabled={!isEditingCollege}
                  type="textarea"
                />

                <Input
                  label="Vision"
                  value={collegeInfo.vision}
                  onValueChange={(value) =>
                    handleCollegeInfoChange("vision", value)
                  }
                  isDisabled={!isEditingCollege}
                  type="textarea"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="rector" title="Rector Information">
          <Card className="mt-4">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Rector Information</h2>
              {!isEditingRector ? (
                <Button
                  variant="flat"
                  color="primary"
                  onPress={() => setIsEditingRector(true)}
                  startContent={<Icon icon="lucide:edit" />}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="flat"
                    onPress={() => setIsEditingRector(false)}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleSaveRector}>
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <Avatar
                    name={rectorInfo.name}
                    className="w-40 h-40 text-large mb-4"
                    showFallback
                  />
                  {isEditingRector && (
                    <Button
                      variant="flat"
                      color="primary"
                      className="mt-2"
                      startContent={<Icon icon="lucide:upload" />}
                    >
                      Upload Photo
                    </Button>
                  )}
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:mail" className="text-default-500" />
                      <span>{rectorInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:phone" className="text-default-500" />
                      <span>{rectorInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:map-pin"
                        className="text-default-500"
                      />
                      <span>{rectorInfo.office}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:calendar"
                        className="text-default-500"
                      />
                      <span>Appointed: {rectorInfo.appointmentDate}</span>
                    </div>
                  </div>
                </div>

                <Divider orientation="vertical" className="hidden md:block" />

                <div className="md:w-2/3 space-y-4">
                  <Input
                    label="Full Name"
                    value={rectorInfo.name}
                    onValueChange={(value) =>
                      handleRectorInfoChange("name", value)
                    }
                    isDisabled={!isEditingRector}
                  />

                  <Input
                    label="Title"
                    value={rectorInfo.title}
                    onValueChange={(value) =>
                      handleRectorInfoChange("title", value)
                    }
                    isDisabled={!isEditingRector}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      value={rectorInfo.email}
                      onValueChange={(value) =>
                        handleRectorInfoChange("email", value)
                      }
                      isDisabled={!isEditingRector}
                    />
                    <Input
                      label="Phone"
                      value={rectorInfo.phone}
                      onValueChange={(value) =>
                        handleRectorInfoChange("phone", value)
                      }
                      isDisabled={!isEditingRector}
                    />
                  </div>

                  <Input
                    label="Office"
                    value={rectorInfo.office}
                    onValueChange={(value) =>
                      handleRectorInfoChange("office", value)
                    }
                    isDisabled={!isEditingRector}
                  />

                  <Input
                    label="Appointment Date"
                    type="date"
                    value={rectorInfo.appointmentDate}
                    onValueChange={(value) =>
                      handleRectorInfoChange("appointmentDate", value)
                    }
                    isDisabled={!isEditingRector}
                  />

                  <Input
                    label="Biography"
                    value={rectorInfo.bio}
                    onValueChange={(value) =>
                      handleRectorInfoChange("bio", value)
                    }
                    isDisabled={!isEditingRector}
                    type="textarea"
                  />

                  <div>
                    <span className="block text-sm font-medium mb-1">
                      Education
                    </span>
                    <div className="space-y-2">
                      {rectorInfo.education.map((edu, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={edu}
                            onValueChange={(value) =>
                              handleRectorEducationChange(index, value)
                            }
                            isDisabled={!isEditingRector}
                            placeholder={`Education #${index + 1}`}
                            className="flex-1"
                          />
                          {isEditingRector && (
                            <Button
                              isIconOnly
                              color="danger"
                              variant="light"
                              onPress={() => removeEducationField(index)}
                            >
                              <Icon icon="lucide:trash-2" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {isEditingRector && (
                        <Button
                          variant="flat"
                          size="sm"
                          onPress={addEducationField}
                          startContent={<Icon icon="lucide:plus" />}
                        >
                          Add Education
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CollegeInfoPage;
