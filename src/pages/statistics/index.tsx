import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";

interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

interface DepartmentStatistics {
  department: string;
  students: number;
  instructors: number;
  courses: number;
  averageGpa: number;
  gradeDistribution: GradeDistribution[];
}

interface InstructorStatistics {
  instructor: string;
  department: string;
  courses: number;
  students: number;
  averageGrade: string;
  gradeDistribution: GradeDistribution[];
}

interface CourseStatistics {
  course: string;
  department: string;
  instructor: string;
  students: number;
  averageGrade: string;
  passRate: number;
  gradeDistribution: GradeDistribution[];
}

const mockDepartmentStats: DepartmentStatistics[] = [
  {
    department: "Computer Science",
    students: 320,
    instructors: 15,
    courses: 24,
    averageGpa: 3.4,
    gradeDistribution: [
      { grade: "A", count: 95, percentage: 30 },
      { grade: "B", count: 128, percentage: 40 },
      { grade: "C", count: 64, percentage: 20 },
      { grade: "D", count: 22, percentage: 7 },
      { grade: "F", count: 11, percentage: 3 },
    ],
  },
  {
    department: "Mathematics",
    students: 280,
    instructors: 12,
    courses: 18,
    averageGpa: 3.2,
    gradeDistribution: [
      { grade: "A", count: 70, percentage: 25 },
      { grade: "B", count: 112, percentage: 40 },
      { grade: "C", count: 70, percentage: 25 },
      { grade: "D", count: 22, percentage: 8 },
      { grade: "F", count: 6, percentage: 2 },
    ],
  },
  {
    department: "Physics",
    students: 220,
    instructors: 10,
    courses: 16,
    averageGpa: 3.1,
    gradeDistribution: [
      { grade: "A", count: 44, percentage: 20 },
      { grade: "B", count: 88, percentage: 40 },
      { grade: "C", count: 66, percentage: 30 },
      { grade: "D", count: 15, percentage: 7 },
      { grade: "F", count: 7, percentage: 3 },
    ],
  },
];

const mockInstructorStats: InstructorStatistics[] = [
  {
    instructor: "Dr. Alan Turing",
    department: "Computer Science",
    courses: 3,
    students: 120,
    averageGrade: "B+",
    gradeDistribution: [
      { grade: "A", count: 42, percentage: 35 },
      { grade: "B", count: 48, percentage: 40 },
      { grade: "C", count: 24, percentage: 20 },
      { grade: "D", count: 6, percentage: 5 },
      { grade: "F", count: 0, percentage: 0 },
    ],
  },
  {
    instructor: "Dr. Katherine Johnson",
    department: "Mathematics",
    courses: 3,
    students: 110,
    averageGrade: "B",
    gradeDistribution: [
      { grade: "A", count: 22, percentage: 20 },
      { grade: "B", count: 55, percentage: 50 },
      { grade: "C", count: 27, percentage: 25 },
      { grade: "D", count: 5, percentage: 4 },
      { grade: "F", count: 1, percentage: 1 },
    ],
  },
  {
    instructor: "Dr. Richard Feynman",
    department: "Physics",
    courses: 3,
    students: 95,
    averageGrade: "B-",
    gradeDistribution: [
      { grade: "A", count: 19, percentage: 20 },
      { grade: "B", count: 38, percentage: 40 },
      { grade: "C", count: 28, percentage: 30 },
      { grade: "D", count: 7, percentage: 7 },
      { grade: "F", count: 3, percentage: 3 },
    ],
  },
];

const mockCourseStats: CourseStatistics[] = [
  {
    course: "Introduction to Computer Science",
    department: "Computer Science",
    instructor: "Dr. Alan Turing",
    students: 45,
    averageGrade: "B+",
    passRate: 95,
    gradeDistribution: [
      { grade: "A", count: 18, percentage: 40 },
      { grade: "B", count: 20, percentage: 44 },
      { grade: "C", count: 5, percentage: 11 },
      { grade: "D", count: 2, percentage: 5 },
      { grade: "F", count: 0, percentage: 0 },
    ],
  },
  {
    course: "Calculus I",
    department: "Mathematics",
    instructor: "Dr. Katherine Johnson",
    students: 38,
    averageGrade: "B",
    passRate: 90,
    gradeDistribution: [
      { grade: "A", count: 8, percentage: 21 },
      { grade: "B", count: 19, percentage: 50 },
      { grade: "C", count: 7, percentage: 19 },
      { grade: "D", count: 3, percentage: 8 },
      { grade: "F", count: 1, percentage: 2 },
    ],
  },
  {
    course: "Physics I",
    department: "Physics",
    instructor: "Dr. Richard Feynman",
    students: 42,
    averageGrade: "B-",
    passRate: 88,
    gradeDistribution: [
      { grade: "A", count: 8, percentage: 19 },
      { grade: "B", count: 17, percentage: 40 },
      { grade: "C", count: 12, percentage: 29 },
      { grade: "D", count: 3, percentage: 7 },
      { grade: "F", count: 2, percentage: 5 },
    ],
  },
];

const Statistics: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("all");
  const [selectedSemester, setSelectedSemester] =
    React.useState<string>("Fall 2023");

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "success";
    if (grade.startsWith("B")) return "primary";
    if (grade.startsWith("C")) return "warning";

    return "danger";
  };

  const getPassRateColor = (rate: number) => {
    if (rate >= 90) return "success";
    if (rate >= 80) return "primary";
    if (rate >= 70) return "warning";

    return "danger";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Statistics & Analytics</h1>
        <p className="text-default-500">
          View academic performance and statistics
        </p>
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
              <SelectItem key="all" value="all">
                All Departments
              </SelectItem>
              <SelectItem key="cs" value="Computer Science">
                Computer Science
              </SelectItem>
              <SelectItem key="math" value="Mathematics">
                Mathematics
              </SelectItem>
              <SelectItem key="physics" value="Physics">
                Physics
              </SelectItem>
            </Select>

            <Select
              label="Semester"
              placeholder="Select semester"
              selectedKeys={[selectedSemester]}
              className="w-full max-w-xs"
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <SelectItem key="fall2023" value="Fall 2023">
                Fall 2023
              </SelectItem>
              <SelectItem key="spring2023" value="Spring 2023">
                Spring 2023
              </SelectItem>
              <SelectItem key="fall2022" value="Fall 2022">
                Fall 2022
              </SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Statistics Categories">
        <Tab key="departments" title="Department Statistics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {mockDepartmentStats.map((dept, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-col items-start">
                  <h3 className="text-lg font-semibold">{dept.department}</h3>
                  <p className="text-default-500 text-sm">
                    Department Statistics
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-3 bg-content2 rounded-lg">
                        <span className="text-sm text-default-500">
                          Students
                        </span>
                        <span className="text-xl font-bold">
                          {dept.students}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-content2 rounded-lg">
                        <span className="text-sm text-default-500">
                          Instructors
                        </span>
                        <span className="text-xl font-bold">
                          {dept.instructors}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-content2 rounded-lg">
                        <span className="text-sm text-default-500">
                          Courses
                        </span>
                        <span className="text-xl font-bold">
                          {dept.courses}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-content2 rounded-lg">
                      <span className="text-sm text-default-500">
                        Average GPA
                      </span>
                      <span className="text-xl font-bold">
                        {dept.averageGpa.toFixed(1)}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm text-default-500 mb-2">
                        Grade Distribution
                      </h4>
                      <div className="flex justify-between">
                        {dept.gradeDistribution.map((grade, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="h-24 w-6 bg-content2 rounded-t-md relative">
                              <div
                                className={`absolute bottom-0 left-0 right-0 bg-${getGradeColor(grade.grade)}-500 rounded-t-md`}
                                style={{ height: `${grade.percentage}%` }}
                              />
                            </div>
                            <span className="mt-1 text-xs">{grade.grade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab key="instructors" title="Instructor Statistics">
          <Card className="mt-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Instructor Performance</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Instructor statistics table">
                <TableHeader>
                  <TableColumn>INSTRUCTOR</TableColumn>
                  <TableColumn>DEPARTMENT</TableColumn>
                  <TableColumn>COURSES</TableColumn>
                  <TableColumn>STUDENTS</TableColumn>
                  <TableColumn>AVG. GRADE</TableColumn>
                  <TableColumn>GRADE DISTRIBUTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockInstructorStats.map((instructor, index) => (
                    <TableRow key={index}>
                      <TableCell>{instructor.instructor}</TableCell>
                      <TableCell>{instructor.department}</TableCell>
                      <TableCell>{instructor.courses}</TableCell>
                      <TableCell>{instructor.students}</TableCell>
                      <TableCell>
                        <Chip
                          color={getGradeColor(instructor.averageGrade)}
                          variant="flat"
                        >
                          {instructor.averageGrade}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {instructor.gradeDistribution.map((grade, i) => (
                            <Chip
                              key={i}
                              size="sm"
                              variant="flat"
                              color={getGradeColor(grade.grade)}
                            >
                              {grade.grade}: {grade.percentage}%
                            </Chip>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="courses" title="Course Statistics">
          <Card className="mt-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Course Performance</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Course statistics table">
                <TableHeader>
                  <TableColumn>COURSE</TableColumn>
                  <TableColumn>DEPARTMENT</TableColumn>
                  <TableColumn>INSTRUCTOR</TableColumn>
                  <TableColumn>STUDENTS</TableColumn>
                  <TableColumn>AVG. GRADE</TableColumn>
                  <TableColumn>PASS RATE</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockCourseStats.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.course}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <Chip
                          color={getGradeColor(course.averageGrade)}
                          variant="flat"
                        >
                          {course.averageGrade}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={getPassRateColor(course.passRate)}
                          variant="flat"
                        >
                          {course.passRate}%
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Statistics;
