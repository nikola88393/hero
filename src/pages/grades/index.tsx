import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Tabs,
  Tab,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../../contexts/auth-context";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  grade: string;
  absences: number;
  lastUpdated: string;
}

interface Course {
  id: string;
  name: string;
}

const mockCourses: Course[] = [
  { id: "1", name: "Introduction to Computer Science" },
  { id: "2", name: "Database Management" },
  { id: "3", name: "Web Development" },
  { id: "4", name: "Data Structures and Algorithms" },
  { id: "5", name: "Software Engineering" },
];

const mockGrades: Grade[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Smith",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    grade: "A",
    absences: 2,
    lastUpdated: "2023-05-15",
  },
  {
    id: "2",
    studentId: "1",
    studentName: "John Smith",
    courseId: "2",
    courseName: "Database Management",
    grade: "B+",
    absences: 1,
    lastUpdated: "2023-05-18",
  },
  {
    id: "3",
    studentId: "2",
    studentName: "Emma Johnson",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    grade: "A-",
    absences: 0,
    lastUpdated: "2023-05-15",
  },
  {
    id: "4",
    studentId: "2",
    studentName: "Emma Johnson",
    courseId: "3",
    courseName: "Web Development",
    grade: "A",
    absences: 3,
    lastUpdated: "2023-05-20",
  },
  {
    id: "5",
    studentId: "3",
    studentName: "Michael Brown",
    courseId: "2",
    courseName: "Database Management",
    grade: "B",
    absences: 4,
    lastUpdated: "2023-05-18",
  },
  {
    id: "6",
    studentId: "3",
    studentName: "Michael Brown",
    courseId: "4",
    courseName: "Data Structures and Algorithms",
    grade: "C+",
    absences: 2,
    lastUpdated: "2023-05-22",
  },
  {
    id: "7",
    studentId: "4",
    studentName: "Sophia Davis",
    courseId: "3",
    courseName: "Web Development",
    grade: "A-",
    absences: 1,
    lastUpdated: "2023-05-20",
  },
  {
    id: "8",
    studentId: "4",
    studentName: "Sophia Davis",
    courseId: "5",
    courseName: "Software Engineering",
    grade: "B+",
    absences: 0,
    lastUpdated: "2023-05-25",
  },
  {
    id: "9",
    studentId: "5",
    studentName: "William Wilson",
    courseId: "4",
    courseName: "Data Structures and Algorithms",
    grade: "B-",
    absences: 3,
    lastUpdated: "2023-05-22",
  },
  {
    id: "10",
    studentId: "5",
    studentName: "William Wilson",
    courseId: "5",
    courseName: "Software Engineering",
    grade: "A",
    absences: 1,
    lastUpdated: "2023-05-25",
  },
];

const Grades: React.FC = () => {
  const { user } = useAuth();
  const isInstructor = user?.role === "instructor";
  const [selectedCourse, setSelectedCourse] = React.useState<string>("all");
  const [grades, setGrades] = React.useState<Grade[]>(mockGrades);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState<string>("grades");
  const [editingGrade, setEditingGrade] = React.useState<{
    [key: string]: string;
  }>({});
  const [editingAbsence, setEditingAbsence] = React.useState<{
    [key: string]: number;
  }>({});

  // Filter grades based on user role and search query
  const filteredGrades = React.useMemo(() => {
    let filtered = grades;

    // For students, only show their own grades
    if (user?.role === "student") {
      filtered = filtered.filter((grade) => grade.studentId === user.id);
    }

    // Filter by selected course
    if (selectedCourse !== "all") {
      filtered = filtered.filter((grade) => grade.courseId === selectedCourse);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (grade) =>
          grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          grade.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [grades, user, selectedCourse, searchQuery]);

  const handleGradeChange = (id: string, value: string) => {
    setEditingGrade({ ...editingGrade, [id]: value });
  };

  const handleAbsenceChange = (id: string, value: number) => {
    setEditingAbsence({ ...editingAbsence, [id]: value });
  };

  const saveChanges = (id: string) => {
    setGrades(
      grades.map((grade) => {
        if (grade.id === id) {
          return {
            ...grade,
            grade: editingGrade[id] || grade.grade,
            absences:
              editingAbsence[id] !== undefined
                ? editingAbsence[id]
                : grade.absences,
            lastUpdated: new Date().toISOString().split("T")[0],
          };
        }

        return grade;
      })
    );

    // Clear editing state
    const newEditingGrade = { ...editingGrade };

    delete newEditingGrade[id];
    setEditingGrade(newEditingGrade);

    const newEditingAbsence = { ...editingAbsence };

    delete newEditingAbsence[id];
    setEditingAbsence(newEditingAbsence);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "success";
    if (grade.startsWith("B")) return "primary";
    if (grade.startsWith("C")) return "warning";

    return "danger";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Grades & Attendance</h1>
        <p className="text-default-500">
          {isInstructor
            ? "Manage student grades and attendance records"
            : "View your course grades and attendance records"}
        </p>
      </div>

      <Tabs
        aria-label="Grades and Attendance"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab as any}
      >
        <Tab key="grades" title="Grades">
          <Card>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <Input
                  placeholder={
                    isInstructor ? "Search students..." : "Search courses..."
                  }
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={
                    <Icon icon="lucide:search" className="text-default-400" />
                  }
                  className="w-full max-w-xs"
                />

                <Select
                  label="Filter by Course"
                  placeholder="Select a course"
                  selectedKeys={[selectedCourse]}
                  className="w-full max-w-xs"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <SelectItem key="all" value="all">
                    All Courses
                  </SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Table aria-label="Grades table" selectionMode="none">
                <TableHeader>
                  <TableColumn>STUDENT</TableColumn>
                  <TableColumn>COURSE</TableColumn>
                  <TableColumn>GRADE</TableColumn>
                  <TableColumn>ABSENCES</TableColumn>
                  <TableColumn>LAST UPDATED</TableColumn>
                  {isInstructor && <TableColumn>ACTIONS</TableColumn>}
                </TableHeader>
                <TableBody emptyContent="No grades found">
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell>{grade.courseName}</TableCell>
                      <TableCell>
                        {editingGrade[grade.id] !== undefined ? (
                          <Input
                            size="sm"
                            value={editingGrade[grade.id]}
                            onValueChange={(value) =>
                              handleGradeChange(grade.id, value)
                            }
                            className="w-20"
                          />
                        ) : (
                          <Chip
                            color={getGradeColor(grade.grade)}
                            variant="flat"
                          >
                            {grade.grade}
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingAbsence[grade.id] !== undefined ? (
                          <Input
                            type="number"
                            size="sm"
                            value={editingAbsence[grade.id].toString()}
                            onValueChange={(value) =>
                              handleAbsenceChange(
                                grade.id,
                                parseInt(value) || 0
                              )
                            }
                            className="w-20"
                          />
                        ) : (
                          <Chip
                            color={grade.absences > 3 ? "danger" : "default"}
                            variant="flat"
                          >
                            {grade.absences}
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell>{grade.lastUpdated}</TableCell>
                      {isInstructor && (
                        <TableCell>
                          {editingGrade[grade.id] !== undefined ||
                          editingAbsence[grade.id] !== undefined ? (
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              onPress={() => saveChanges(grade.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="light"
                              onPress={() => {
                                setEditingGrade({
                                  ...editingGrade,
                                  [grade.id]: grade.grade,
                                });
                                setEditingAbsence({
                                  ...editingAbsence,
                                  [grade.id]: grade.absences,
                                });
                              }}
                            >
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="attendance" title="Attendance Records">
          <Card>
            <CardBody>
              <div className="p-4 text-center">
                <p className="text-default-500">
                  Detailed attendance records will be available here.
                </p>
                <p className="text-sm mt-2">This feature is coming soon.</p>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Grades;
