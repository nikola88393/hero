import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface CurriculumCourse {
  id: string;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  room: string;
  credits: number;
  required: boolean;
}

interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
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

const mockSemesters: Semester[] = [
  {
    id: "1",
    name: "Fall 2023",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    active: true,
  },
  {
    id: "2",
    name: "Spring 2024",
    startDate: "2024-01-15",
    endDate: "2024-05-10",
    active: false,
  },
  {
    id: "3",
    name: "Summer 2024",
    startDate: "2024-06-01",
    endDate: "2024-08-15",
    active: false,
  },
];

const mockCurriculumCourses: Record<string, CurriculumCourse[]> = {
  "Computer Science": [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Dr. Alan Turing",
      schedule: "Mon/Wed 10:00-11:30",
      room: "Tech 101",
      credits: 3,
      required: true,
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures",
      instructor: "Dr. Grace Hopper",
      schedule: "Tue/Thu 13:00-14:30",
      room: "Tech 203",
      credits: 4,
      required: true,
    },
    {
      id: "3",
      code: "CS301",
      name: "Algorithms",
      instructor: "Dr. Alan Turing",
      schedule: "Mon/Wed 14:00-15:30",
      room: "Tech 105",
      credits: 4,
      required: true,
    },
    {
      id: "4",
      code: "CS350",
      name: "Database Systems",
      instructor: "Dr. Grace Hopper",
      schedule: "Tue/Thu 10:00-11:30",
      room: "Tech 202",
      credits: 3,
      required: true,
    },
    {
      id: "5",
      code: "CS401",
      name: "Artificial Intelligence",
      instructor: "Dr. Alan Turing",
      schedule: "Fri 09:00-12:00",
      room: "Tech 301",
      credits: 3,
      required: false,
    },
  ],
  Mathematics: [
    {
      id: "1",
      code: "MATH101",
      name: "College Algebra",
      instructor: "Dr. Katherine Johnson",
      schedule: "Mon/Wed 09:00-10:30",
      room: "Science 101",
      credits: 3,
      required: true,
    },
    {
      id: "2",
      code: "MATH201",
      name: "Calculus I",
      instructor: "Dr. Katherine Johnson",
      schedule: "Tue/Thu 11:00-12:30",
      room: "Science 203",
      credits: 4,
      required: true,
    },
    {
      id: "3",
      code: "MATH301",
      name: "Linear Algebra",
      instructor: "Dr. Katherine Johnson",
      schedule: "Mon/Wed 13:00-14:30",
      room: "Science 105",
      credits: 3,
      required: true,
    },
  ],
  Physics: [
    {
      id: "1",
      code: "PHYS101",
      name: "Physics I",
      instructor: "Dr. Richard Feynman",
      schedule: "Mon/Wed 11:00-12:30",
      room: "Science 201",
      credits: 4,
      required: true,
    },
    {
      id: "2",
      code: "PHYS201",
      name: "Physics II",
      instructor: "Dr. Richard Feynman",
      schedule: "Tue/Thu 09:00-10:30",
      room: "Science 202",
      credits: 4,
      required: true,
    },
    {
      id: "3",
      code: "PHYS301",
      name: "Quantum Mechanics",
      instructor: "Dr. Richard Feynman",
      schedule: "Fri 13:00-16:00",
      room: "Science 301",
      credits: 3,
      required: false,
    },
  ],
};

const Curriculum: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("Computer Science");
  const [selectedSemester, setSelectedSemester] =
    React.useState<string>("Fall 2023");
  const [curriculumCourses, setCurriculumCourses] = React.useState<
    CurriculumCourse[]
  >(mockCurriculumCourses[selectedDepartment] || []);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentCourse, setCurrentCourse] =
    React.useState<CurriculumCourse | null>(null);
  const [newCourse, setNewCourse] = React.useState<Partial<CurriculumCourse>>({
    code: "",
    name: "",
    instructor: "",
    schedule: "",
    room: "",
    credits: 3,
    required: true,
  });

  // Update courses when department changes
  React.useEffect(() => {
    setCurriculumCourses(mockCurriculumCourses[selectedDepartment] || []);
  }, [selectedDepartment]);

  const handleAdd = () => {
    setCurrentCourse(null);
    setNewCourse({
      code: "",
      name: "",
      instructor: "",
      schedule: "",
      room: "",
      credits: 3,
      required: true,
    });
    onOpen();
  };

  const handleEdit = (course: CurriculumCourse) => {
    setCurrentCourse(course);
    setNewCourse({
      code: course.code,
      name: course.name,
      instructor: course.instructor,
      schedule: course.schedule,
      room: course.room,
      credits: course.credits,
      required: course.required,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setCurriculumCourses(
      curriculumCourses.filter((course) => course.id !== id)
    );
  };

  const handleSave = () => {
    if (currentCourse) {
      // Edit existing course
      setCurriculumCourses(
        curriculumCourses.map((course) =>
          course.id === currentCourse.id
            ? ({ ...course, ...newCourse } as CurriculumCourse)
            : course
        )
      );
    } else {
      // Add new course
      const newId = (
        Math.max(...curriculumCourses.map((c) => parseInt(c.id))) + 1
      ).toString();

      setCurriculumCourses([
        ...curriculumCourses,
        {
          id: newId,
          code: newCourse.code || "",
          name: newCourse.name || "",
          instructor: newCourse.instructor || "",
          schedule: newCourse.schedule || "",
          room: newCourse.room || "",
          credits: newCourse.credits || 3,
          required: newCourse.required || false,
        },
      ]);
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Curriculum Management</h1>
          <p className="text-default-500">
            Manage semester curriculum and course schedules
          </p>
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
            <Select
              label="Department"
              placeholder="Select department"
              selectedKeys={[selectedDepartment]}
              className="w-full max-w-xs"
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {mockDepartments.map((dept) => (
                <SelectItem key={dept.name} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Semester"
              placeholder="Select semester"
              selectedKeys={[selectedSemester]}
              className="w-full max-w-xs"
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {mockSemesters.map((semester) => (
                <SelectItem key={semester.name} value={semester.name}>
                  {semester.name} {semester.active && "(Active)"}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Curriculum Management">
        <Tab key="courses" title="Course Schedule">
          <Card className="mt-4">
            <CardHeader>
              <h2 className="text-lg font-semibold">
                {selectedDepartment} - {selectedSemester} Curriculum
              </h2>
            </CardHeader>
            <CardBody>
              <Table aria-label="Curriculum courses" selectionMode="none">
                <TableHeader>
                  <TableColumn>CODE</TableColumn>
                  <TableColumn>COURSE NAME</TableColumn>
                  <TableColumn>INSTRUCTOR</TableColumn>
                  <TableColumn>SCHEDULE</TableColumn>
                  <TableColumn>ROOM</TableColumn>
                  <TableColumn>CREDITS</TableColumn>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No courses found for this curriculum">
                  {curriculumCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.schedule}</TableCell>
                      <TableCell>{course.room}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        <Chip
                          color={course.required ? "primary" : "default"}
                          variant="flat"
                        >
                          {course.required ? "Required" : "Elective"}
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
            </CardBody>
          </Card>
        </Tab>
        <Tab key="calendar" title="Calendar View">
          <Card className="mt-4">
            <CardBody>
              <div className="p-4 text-center">
                <p className="text-default-500">
                  Calendar view of course schedules will be available here.
                </p>
                <p className="text-sm mt-2">This feature is coming soon.</p>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="requirements" title="Degree Requirements">
          <Card className="mt-4">
            <CardBody>
              <div className="p-4 text-center">
                <p className="text-default-500">
                  Degree requirements and curriculum planning will be available
                  here.
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
                {currentCourse ? "Edit Course" : "Add Course to Curriculum"}
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
                  <Input
                    label="Instructor"
                    placeholder="Enter instructor name"
                    value={newCourse.instructor}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, instructor: value })
                    }
                  />
                  <Input
                    label="Schedule"
                    placeholder="E.g., Mon/Wed 10:00-11:30"
                    value={newCourse.schedule}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, schedule: value })
                    }
                  />
                  <Input
                    label="Room"
                    placeholder="Enter room number"
                    value={newCourse.room}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, room: value })
                    }
                  />
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
                  <Select
                    label="Course Type"
                    placeholder="Select course type"
                    selectedKeys={[
                      newCourse.required ? "required" : "elective",
                    ]}
                    className="md:col-span-2"
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        required: e.target.value === "required",
                      })
                    }
                  >
                    <SelectItem key="required" value="required">
                      Required
                    </SelectItem>
                    <SelectItem key="elective" value="elective">
                      Elective
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

export default Curriculum;
