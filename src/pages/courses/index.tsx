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
  Select,
  SelectItem,
  Card,
  CardBody,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  credits: number;
  capacity: number;
  enrolled: number;
  semester: string;
  status: "active" | "upcoming" | "completed" | "cancelled";
}

interface Department {
  id: string;
  name: string;
}

interface Instructor {
  id: string;
  name: string;
  department: string;
}

const mockDepartments: Department[] = [
  { id: "1", name: "Computer Science" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Physics" },
  { id: "4", name: "Electrical Engineering" },
  { id: "5", name: "Business Administration" },
];

const mockInstructors: Instructor[] = [
  { id: "1", name: "Dr. Alan Turing", department: "Computer Science" },
  { id: "2", name: "Dr. Katherine Johnson", department: "Mathematics" },
  { id: "3", name: "Dr. Richard Feynman", department: "Physics" },
  { id: "4", name: "Dr. Nikola Tesla", department: "Electrical Engineering" },
  { id: "5", name: "Dr. Peter Drucker", department: "Business Administration" },
  { id: "6", name: "Dr. Grace Hopper", department: "Computer Science" },
];

const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Dr. Alan Turing",
    credits: 3,
    capacity: 50,
    enrolled: 45,
    semester: "Fall 2023",
    status: "active",
  },
  {
    id: "2",
    code: "MATH201",
    name: "Calculus I",
    department: "Mathematics",
    instructor: "Dr. Katherine Johnson",
    credits: 4,
    capacity: 40,
    enrolled: 38,
    semester: "Fall 2023",
    status: "active",
  },
  {
    id: "3",
    code: "PHYS101",
    name: "Physics I",
    department: "Physics",
    instructor: "Dr. Richard Feynman",
    credits: 4,
    capacity: 45,
    enrolled: 42,
    semester: "Fall 2023",
    status: "active",
  },
  {
    id: "4",
    code: "EE201",
    name: "Circuit Design",
    department: "Electrical Engineering",
    instructor: "Dr. Nikola Tesla",
    credits: 3,
    capacity: 30,
    enrolled: 28,
    semester: "Fall 2023",
    status: "active",
  },
  {
    id: "5",
    code: "BUS101",
    name: "Introduction to Business",
    department: "Business Administration",
    instructor: "Dr. Peter Drucker",
    credits: 3,
    capacity: 60,
    enrolled: 55,
    semester: "Fall 2023",
    status: "active",
  },
  {
    id: "6",
    code: "CS201",
    name: "Data Structures",
    department: "Computer Science",
    instructor: "Dr. Grace Hopper",
    credits: 4,
    capacity: 35,
    enrolled: 0,
    semester: "Spring 2024",
    status: "upcoming",
  },
  {
    id: "7",
    code: "MATH101",
    name: "College Algebra",
    department: "Mathematics",
    instructor: "Dr. Katherine Johnson",
    credits: 3,
    capacity: 50,
    enrolled: 48,
    semester: "Summer 2023",
    status: "completed",
  },
  {
    id: "8",
    code: "CS301",
    name: "Advanced Programming",
    department: "Computer Science",
    instructor: "Dr. Alan Turing",
    credits: 4,
    capacity: 25,
    enrolled: 0,
    semester: "Fall 2023",
    status: "cancelled",
  },
];

const Courses: React.FC = () => {
  const [courses, setCourses] = React.useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentCourse, setCurrentCourse] = React.useState<Course | null>(null);
  const [newCourse, setNewCourse] = React.useState<Partial<Course>>({
    code: "",
    name: "",
    department: "",
    instructor: "",
    credits: 3,
    capacity: 30,
    enrolled: 0,
    semester: "Fall 2023",
    status: "upcoming",
  });

  // Filter courses based on search query, department and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || course.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "all" || course.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination
  const pages = Math.ceil(filteredCourses.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredCourses.slice(start, end);
  }, [page, filteredCourses]);

  const handleAdd = () => {
    setCurrentCourse(null);
    setNewCourse({
      code: "",
      name: "",
      department: "",
      instructor: "",
      credits: 3,
      capacity: 30,
      enrolled: 0,
      semester: "Fall 2023",
      status: "upcoming",
    });
    onOpen();
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setNewCourse({
      code: course.code,
      name: course.name,
      department: course.department,
      instructor: course.instructor,
      credits: course.credits,
      capacity: course.capacity,
      enrolled: course.enrolled,
      semester: course.semester,
      status: course.status,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleSave = () => {
    if (currentCourse) {
      // Edit existing course
      setCourses(
        courses.map((course) =>
          course.id === currentCourse.id
            ? ({ ...course, ...newCourse } as Course)
            : course
        )
      );
    } else {
      // Add new course
      const newId = (
        Math.max(...courses.map((c) => parseInt(c.id))) + 1
      ).toString();
      setCourses([
        ...courses,
        {
          id: newId,
          code: newCourse.code || "",
          name: newCourse.name || "",
          department: newCourse.department || "",
          instructor: newCourse.instructor || "",
          credits: newCourse.credits || 3,
          capacity: newCourse.capacity || 30,
          enrolled: newCourse.enrolled || 0,
          semester: newCourse.semester || "Fall 2023",
          status: newCourse.status || "upcoming",
        },
      ]);
    }
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "primary";
      case "completed":
        return "default";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getEnrollmentColor = (enrolled: number, capacity: number) => {
    const ratio = enrolled / capacity;

    if (ratio >= 0.9) return "danger";
    if (ratio >= 0.7) return "warning";
    if (ratio > 0) return "success";

    return "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-default-500">Manage college courses</p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Course
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search courses..."
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
                <SelectItem key="upcoming" value="upcoming">
                  Upcoming
                </SelectItem>
                <SelectItem key="completed" value="completed">
                  Completed
                </SelectItem>
                <SelectItem key="cancelled" value="cancelled">
                  Cancelled
                </SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Course Management">
        <Tab key="list" title="Course List">
          <div className="bg-content1 rounded-lg overflow-hidden shadow-sm mt-4">
            <Table
              aria-label="Courses table"
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
                <TableColumn>CODE</TableColumn>
                <TableColumn>COURSE NAME</TableColumn>
                <TableColumn>DEPARTMENT</TableColumn>
                <TableColumn>INSTRUCTOR</TableColumn>
                <TableColumn>CREDITS</TableColumn>
                <TableColumn>ENROLLMENT</TableColumn>
                <TableColumn>SEMESTER</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No courses found">
                {items.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Chip
                        color={getEnrollmentColor(
                          course.enrolled,
                          course.capacity
                        )}
                        variant="flat"
                      >
                        {course.enrolled}/{course.capacity}
                      </Chip>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(course.status)}
                        variant="flat"
                      >
                        {getStatusText(course.status)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleEdit(course)}
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
                          onPress={() => handleDelete(course.id)}
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
        <Tab key="schedule" title="Course Schedule">
          <Card className="mt-4">
            <CardBody>
              <div className="p-4 text-center">
                <p className="text-default-500">
                  Course scheduling calendar will be available here.
                </p>
                <p className="text-sm mt-2">This feature is coming soon.</p>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Add/Edit Course Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentCourse ? "Edit Course" : "Add Course"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Course Code"
                    placeholder="Enter course code"
                    value={newCourse.code}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, code: value })
                    }
                  />
                  <Input
                    label="Course Name"
                    placeholder="Enter course name"
                    value={newCourse.name}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, name: value })
                    }
                  />
                  <Select
                    label="Department"
                    placeholder="Select department"
                    selectedKeys={
                      newCourse.department ? [newCourse.department] : []
                    }
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, department: e.target.value })
                    }
                  >
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.name} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Instructor"
                    placeholder="Select instructor"
                    selectedKeys={
                      newCourse.instructor ? [newCourse.instructor] : []
                    }
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, instructor: e.target.value })
                    }
                  >
                    {mockInstructors.map((instructor) => (
                      <SelectItem key={instructor.name} value={instructor.name}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Credits"
                    type="number"
                    min="1"
                    max="6"
                    placeholder="Enter credits"
                    value={newCourse.credits?.toString()}
                    onValueChange={(value) =>
                      setNewCourse({
                        ...newCourse,
                        credits: parseInt(value) || 3,
                      })
                    }
                  />
                  <Input
                    label="Capacity"
                    type="number"
                    min="1"
                    placeholder="Enter capacity"
                    value={newCourse.capacity?.toString()}
                    onValueChange={(value) =>
                      setNewCourse({
                        ...newCourse,
                        capacity: parseInt(value) || 30,
                      })
                    }
                  />
                  <Input
                    label="Enrolled"
                    type="number"
                    min="0"
                    placeholder="Enter enrolled students"
                    value={newCourse.enrolled?.toString()}
                    onValueChange={(value) =>
                      setNewCourse({
                        ...newCourse,
                        enrolled: parseInt(value) || 0,
                      })
                    }
                  />
                  <Input
                    label="Semester"
                    placeholder="Enter semester"
                    value={newCourse.semester}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, semester: value })
                    }
                  />
                  <Select
                    label="Status"
                    placeholder="Select status"
                    selectedKeys={newCourse.status ? [newCourse.status] : []}
                    className="md:col-span-2"
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        status: e.target.value as
                          | "active"
                          | "upcoming"
                          | "completed"
                          | "cancelled",
                      })
                    }
                  >
                    <SelectItem key="active" value="active">
                      Active
                    </SelectItem>
                    <SelectItem key="upcoming" value="upcoming">
                      Upcoming
                    </SelectItem>
                    <SelectItem key="completed" value="completed">
                      Completed
                    </SelectItem>
                    <SelectItem key="cancelled" value="cancelled">
                      Cancelled
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

export default Courses;
