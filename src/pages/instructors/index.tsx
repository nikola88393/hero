import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  courses: string[];
  joinDate: string;
  status: "active" | "on leave" | "retired";
}

interface Department {
  id: string;
  name: string;
}

const mockDepartments: Department[] = [
  { id: "1", name: "Computer Science" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Physics" },
  { id: "4", name: "Electrical Engineering" },
  { id: "5", name: "Business Administration" },
];

const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Alan Turing",
    email: "alan.turing@college.edu",
    department: "Computer Science",
    position: "Professor",
    courses: ["Introduction to Computer Science", "Algorithms"],
    joinDate: "2010-09-01",
    status: "active",
  },
  {
    id: "2",
    name: "Dr. Katherine Johnson",
    email: "katherine.johnson@college.edu",
    department: "Mathematics",
    position: "Associate Professor",
    courses: ["Calculus I", "Linear Algebra"],
    joinDate: "2012-01-15",
    status: "active",
  },
  {
    id: "3",
    name: "Dr. Richard Feynman",
    email: "richard.feynman@college.edu",
    department: "Physics",
    position: "Professor",
    courses: ["Quantum Mechanics", "Physics I"],
    joinDate: "2008-08-20",
    status: "active",
  },
  {
    id: "4",
    name: "Dr. Nikola Tesla",
    email: "nikola.tesla@college.edu",
    department: "Electrical Engineering",
    position: "Professor",
    courses: ["Electromagnetic Theory", "Circuit Design"],
    joinDate: "2009-05-10",
    status: "on leave",
  },
  {
    id: "5",
    name: "Dr. Peter Drucker",
    email: "peter.drucker@college.edu",
    department: "Business Administration",
    position: "Associate Professor",
    courses: ["Management Principles", "Business Ethics"],
    joinDate: "2015-03-22",
    status: "active",
  },
  {
    id: "6",
    name: "Dr. Grace Hopper",
    email: "grace.hopper@college.edu",
    department: "Computer Science",
    position: "Assistant Professor",
    courses: ["Programming Languages", "Compiler Design"],
    joinDate: "2018-09-01",
    status: "active",
  },
  {
    id: "7",
    name: "Dr. Marie Curie",
    email: "marie.curie@college.edu",
    department: "Physics",
    position: "Professor Emeritus",
    courses: ["Radiation Physics", "Chemistry Fundamentals"],
    joinDate: "2005-01-15",
    status: "retired",
  },
];

const Instructors: React.FC = () => {
  const [instructors, setInstructors] =
    React.useState<Instructor[]>(mockInstructors);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentInstructor, setCurrentInstructor] =
    React.useState<Instructor | null>(null);
  const [newInstructor, setNewInstructor] = React.useState<Partial<Instructor>>(
    {
      name: "",
      email: "",
      department: "",
      position: "",
      courses: [],
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    }
  );

  // Filter instructors based on search query and department
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      instructor.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Pagination
  const pages = Math.ceil(filteredInstructors.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredInstructors.slice(start, end);
  }, [page, filteredInstructors]);

  const handleAdd = () => {
    setCurrentInstructor(null);
    setNewInstructor({
      name: "",
      email: "",
      department: "",
      position: "",
      courses: [],
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    });
    onOpen();
  };

  const handleEdit = (instructor: Instructor) => {
    setCurrentInstructor(instructor);
    setNewInstructor({
      name: instructor.name,
      email: instructor.email,
      department: instructor.department,
      position: instructor.position,
      courses: instructor.courses,
      joinDate: instructor.joinDate,
      status: instructor.status,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setInstructors(instructors.filter((instructor) => instructor.id !== id));
  };

  const handleSave = () => {
    if (currentInstructor) {
      // Edit existing instructor
      setInstructors(
        instructors.map((instructor) =>
          instructor.id === currentInstructor.id
            ? ({ ...instructor, ...newInstructor } as Instructor)
            : instructor
        )
      );
    } else {
      // Add new instructor
      const newId = (
        Math.max(...instructors.map((i) => parseInt(i.id))) + 1
      ).toString();

      setInstructors([
        ...instructors,
        {
          id: newId,
          name: newInstructor.name || "",
          email: newInstructor.email || "",
          department: newInstructor.department || "",
          position: newInstructor.position || "",
          courses: newInstructor.courses || [],
          joinDate:
            newInstructor.joinDate || new Date().toISOString().split("T")[0],
          status: newInstructor.status || "active",
        },
      ]);
    }
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "on leave":
        return "warning";
      case "retired":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "on leave":
        return "On Leave";
      case "retired":
        return "Retired";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Instructors</h1>
          <p className="text-default-500">Manage college instructors</p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Instructor
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search instructors..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full max-w-xs"
            />

            <Select
              label="Filter by Department"
              placeholder="Select a department"
              selectedKeys={[selectedDepartment]}
              className="w-full max-w-xs"
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {[
                <SelectItem key="all">All Departments</SelectItem>,
                ...mockDepartments.map((dept) => (
                  <SelectItem key={dept.id}>{dept.name}</SelectItem>
                )),
              ]}
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="bg-content1 rounded-lg overflow-hidden shadow-sm">
        <Table
          aria-label="Instructors table"
          selectionMode="none"
          bottomContent={
            pages > 0 ? (
              <div className="flex justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={setPage}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn>INSTRUCTOR</TableColumn>
            <TableColumn>DEPARTMENT</TableColumn>
            <TableColumn>POSITION</TableColumn>
            <TableColumn>COURSES</TableColumn>
            <TableColumn>JOIN DATE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No instructors found">
            {items.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={instructor.name} size="sm" />
                    <div>
                      <p className="font-medium">{instructor.name}</p>
                      <p className="text-default-500 text-xs">
                        {instructor.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{instructor.department}</TableCell>
                <TableCell>{instructor.position}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {instructor.courses.map((course, index) => (
                      <Chip
                        key={index}
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        {course}
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{instructor.joinDate}</TableCell>
                <TableCell>
                  <Chip
                    color={getStatusColor(instructor.status)}
                    variant="flat"
                  >
                    {getStatusText(instructor.status)}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleEdit(instructor)}
                    >
                      <Icon icon="lucide:edit" className="text-default-500" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(instructor.id)}
                    >
                      <Icon icon="lucide:trash" className="text-danger" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Instructor Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentInstructor ? "Edit Instructor" : "Add Instructor"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter instructor name"
                    value={newInstructor.name}
                    onValueChange={(value) =>
                      setNewInstructor({ ...newInstructor, name: value })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    value={newInstructor.email}
                    onValueChange={(value) =>
                      setNewInstructor({ ...newInstructor, email: value })
                    }
                  />
                  <Select
                    label="Department"
                    placeholder="Select department"
                    selectedKeys={
                      newInstructor.department ? [newInstructor.department] : []
                    }
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        department: e.target.value,
                      })
                    }
                  >
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Position"
                    placeholder="Enter position"
                    value={newInstructor.position}
                    onValueChange={(value) =>
                      setNewInstructor({ ...newInstructor, position: value })
                    }
                  />
                  <Input
                    label="Join Date"
                    type="date"
                    value={newInstructor.joinDate}
                    onValueChange={(value) =>
                      setNewInstructor({ ...newInstructor, joinDate: value })
                    }
                  />
                  <Select
                    label="Status"
                    placeholder="Select status"
                    selectedKeys={
                      newInstructor.status ? [newInstructor.status] : []
                    }
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        status: e.target.value as
                          | "active"
                          | "on leave"
                          | "retired",
                      })
                    }
                  >
                    <SelectItem key="active">Active</SelectItem>
                    <SelectItem key="on leave">On Leave</SelectItem>
                    <SelectItem key="retired">Retired</SelectItem>
                  </Select>
                </div>
                <div className="mt-4">
                  <Input
                    label="Courses (comma separated)"
                    placeholder="Enter courses"
                    value={newInstructor.courses?.join(", ")}
                    onValueChange={(value) =>
                      setNewInstructor({
                        ...newInstructor,
                        courses: value
                          .split(",")
                          .map((course) => course.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Instructors;
