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
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  enrollmentYear: string;
  gpa: number;
  credits: number;
  status: "active" | "on leave" | "graduated" | "suspended";
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

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@college.edu",
    department: "Computer Science",
    enrollmentYear: "2020",
    gpa: 3.8,
    credits: 75,
    status: "active",
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.johnson@college.edu",
    department: "Mathematics",
    enrollmentYear: "2019",
    gpa: 3.9,
    credits: 90,
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@college.edu",
    department: "Physics",
    enrollmentYear: "2021",
    gpa: 3.5,
    credits: 45,
    status: "active",
  },
  {
    id: "4",
    name: "Sophia Davis",
    email: "sophia.davis@college.edu",
    department: "Electrical Engineering",
    enrollmentYear: "2020",
    gpa: 3.7,
    credits: 60,
    status: "on leave",
  },
  {
    id: "5",
    name: "William Wilson",
    email: "william.wilson@college.edu",
    department: "Business Administration",
    enrollmentYear: "2018",
    gpa: 3.6,
    credits: 120,
    status: "graduated",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia.martinez@college.edu",
    department: "Computer Science",
    enrollmentYear: "2021",
    gpa: 3.4,
    credits: 30,
    status: "active",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james.taylor@college.edu",
    department: "Mathematics",
    enrollmentYear: "2019",
    gpa: 2.8,
    credits: 75,
    status: "suspended",
  },
  {
    id: "8",
    name: "Ava Anderson",
    email: "ava.anderson@college.edu",
    department: "Physics",
    enrollmentYear: "2020",
    gpa: 3.2,
    credits: 60,
    status: "active",
  },
];

const Students: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentStudent, setCurrentStudent] = React.useState<Student | null>(
    null
  );
  const [newStudent, setNewStudent] = React.useState<Partial<Student>>({
    name: "",
    email: "",
    department: "",
    enrollmentYear: new Date().getFullYear().toString(),
    gpa: 0,
    credits: 0,
    status: "active",
  });

  // Filter students based on search query, department and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination
  const pages = Math.ceil(filteredStudents.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredStudents.slice(start, end);
  }, [page, filteredStudents]);

  const handleAdd = () => {
    setCurrentStudent(null);
    setNewStudent({
      name: "",
      email: "",
      department: "",
      enrollmentYear: new Date().getFullYear().toString(),
      gpa: 0,
      credits: 0,
      status: "active",
    });
    onOpen();
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent(student);
    setNewStudent({
      name: student.name,
      email: student.email,
      department: student.department,
      enrollmentYear: student.enrollmentYear,
      gpa: student.gpa,
      credits: student.credits,
      status: student.status,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleSave = () => {
    if (currentStudent) {
      // Edit existing student
      setStudents(
        students.map((student) =>
          student.id === currentStudent.id
            ? ({ ...student, ...newStudent } as Student)
            : student
        )
      );
    } else {
      // Add new student
      const newId = (
        Math.max(...students.map((s) => parseInt(s.id))) + 1
      ).toString();

      setStudents([
        ...students,
        {
          id: newId,
          name: newStudent.name || "",
          email: newStudent.email || "",
          department: newStudent.department || "",
          enrollmentYear:
            newStudent.enrollmentYear || new Date().getFullYear().toString(),
          gpa: newStudent.gpa || 0,
          credits: newStudent.credits || 0,
          status: newStudent.status || "active",
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
      case "graduated":
        return "primary";
      case "suspended":
        return "danger";
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
      case "graduated":
        return "Graduated";
      case "suspended":
        return "Suspended";
      default:
        return status;
    }
  };

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "success";
    if (gpa >= 3.0) return "primary";
    if (gpa >= 2.0) return "warning";

    return "danger";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-default-500">Manage college students</p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Student
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full max-w-xs"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                label="Department"
                placeholder="Select department"
                selectedKeys={[selectedDepartment]}
                className="w-full sm:w-40"
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <SelectItem key="all" value="all">
                  All Departments
                </SelectItem>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Status"
                placeholder="Select status"
                selectedKeys={[selectedStatus]}
                className="w-full sm:w-40"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <SelectItem key="all" value="all">
                  All Statuses
                </SelectItem>
                <SelectItem key="active" value="active">
                  Active
                </SelectItem>
                <SelectItem key="on leave" value="on leave">
                  On Leave
                </SelectItem>
                <SelectItem key="graduated" value="graduated">
                  Graduated
                </SelectItem>
                <SelectItem key="suspended" value="suspended">
                  Suspended
                </SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Student Management">
        <Tab key="list" title="Student List">
          <div className="bg-content1 rounded-lg overflow-hidden shadow-sm mt-4">
            <Table
              aria-label="Students table"
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
                <TableColumn>STUDENT</TableColumn>
                <TableColumn>DEPARTMENT</TableColumn>
                <TableColumn>ENROLLMENT</TableColumn>
                <TableColumn>GPA</TableColumn>
                <TableColumn>CREDITS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No students found">
                {items.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-default-500 text-xs">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.enrollmentYear}</TableCell>
                    <TableCell>
                      <Chip color={getGpaColor(student.gpa)} variant="flat">
                        {student.gpa.toFixed(1)}
                      </Chip>
                    </TableCell>
                    <TableCell>{student.credits}</TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(student.status)}
                        variant="flat"
                      >
                        {getStatusText(student.status)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleEdit(student)}
                        >
                          <Icon
                            icon="lucide:edit"
                            className="text-default-500"
                          />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleDelete(student.id)}
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
        </Tab>
        <Tab key="statistics" title="Statistics">
          <Card className="mt-4">
            <CardBody>
              <div className="p-4 text-center">
                <p className="text-default-500">
                  Student statistics and analytics will be available here.
                </p>
                <p className="text-sm mt-2">This feature is coming soon.</p>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Add/Edit Student Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentStudent ? "Edit Student" : "Add Student"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onValueChange={(value) =>
                      setNewStudent({ ...newStudent, name: value })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    value={newStudent.email}
                    onValueChange={(value) =>
                      setNewStudent({ ...newStudent, email: value })
                    }
                  />
                  <Select
                    label="Department"
                    placeholder="Select department"
                    selectedKeys={
                      newStudent.department ? [newStudent.department] : []
                    }
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        department: e.target.value,
                      })
                    }
                  >
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.name} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Enrollment Year"
                    placeholder="Enter enrollment year"
                    value={newStudent.enrollmentYear}
                    onValueChange={(value) =>
                      setNewStudent({ ...newStudent, enrollmentYear: value })
                    }
                  />
                  <Input
                    label="GPA"
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.1"
                    placeholder="Enter GPA"
                    value={newStudent.gpa?.toString()}
                    onValueChange={(value) =>
                      setNewStudent({
                        ...newStudent,
                        gpa: parseFloat(value) || 0,
                      })
                    }
                  />
                  <Input
                    label="Credits"
                    type="number"
                    min="0"
                    placeholder="Enter credits"
                    value={newStudent.credits?.toString()}
                    onValueChange={(value) =>
                      setNewStudent({
                        ...newStudent,
                        credits: parseInt(value) || 0,
                      })
                    }
                  />
                  <Select
                    label="Status"
                    placeholder="Select status"
                    selectedKeys={newStudent.status ? [newStudent.status] : []}
                    className="md:col-span-2"
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        status: e.target.value as
                          | "active"
                          | "on leave"
                          | "graduated"
                          | "suspended",
                      })
                    }
                  >
                    <SelectItem key="active" value="active">
                      Active
                    </SelectItem>
                    <SelectItem key="on leave" value="on leave">
                      On Leave
                    </SelectItem>
                    <SelectItem key="graduated" value="graduated">
                      Graduated
                    </SelectItem>
                    <SelectItem key="suspended" value="suspended">
                      Suspended
                    </SelectItem>
                  </Select>
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

export default Students;
