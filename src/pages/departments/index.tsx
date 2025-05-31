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
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Department {
  id: string;
  name: string;
  head: string;
  faculty: string;
  instructors: number;
  students: number;
  courses: number;
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Computer Science",
    head: "Dr. Alan Turing",
    faculty: "Engineering",
    instructors: 15,
    students: 320,
    courses: 24,
  },
  {
    id: "2",
    name: "Mathematics",
    head: "Dr. Katherine Johnson",
    faculty: "Science",
    instructors: 12,
    students: 280,
    courses: 18,
  },
  {
    id: "3",
    name: "Physics",
    head: "Dr. Richard Feynman",
    faculty: "Science",
    instructors: 10,
    students: 220,
    courses: 16,
  },
  {
    id: "4",
    name: "Electrical Engineering",
    head: "Dr. Nikola Tesla",
    faculty: "Engineering",
    instructors: 14,
    students: 300,
    courses: 22,
  },
  {
    id: "5",
    name: "Business Administration",
    head: "Dr. Peter Drucker",
    faculty: "Business",
    instructors: 18,
    students: 350,
    courses: 26,
  },
  {
    id: "6",
    name: "Psychology",
    head: "Dr. Carl Jung",
    faculty: "Social Sciences",
    instructors: 11,
    students: 270,
    courses: 20,
  },
  {
    id: "7",
    name: "English Literature",
    head: "Dr. Jane Austen",
    faculty: "Humanities",
    instructors: 9,
    students: 180,
    courses: 15,
  },
  {
    id: "8",
    name: "History",
    head: "Dr. Howard Zinn",
    faculty: "Humanities",
    instructors: 8,
    students: 160,
    courses: 14,
  },
];

const Departments: React.FC = () => {
  const [departments, setDepartments] =
    React.useState<Department[]>(mockDepartments);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentDepartment, setCurrentDepartment] =
    React.useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = React.useState<Partial<Department>>(
    {
      name: "",
      head: "",
      faculty: "",
    }
  );

  // Filter departments based on search query
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const pages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredDepartments.slice(start, end);
  }, [page, filteredDepartments]);

  const handleAdd = () => {
    setCurrentDepartment(null);
    setNewDepartment({
      name: "",
      head: "",
      faculty: "",
    });
    onOpen();
  };

  const handleEdit = (department: Department) => {
    setCurrentDepartment(department);
    setNewDepartment({
      name: department.name,
      head: department.head,
      faculty: department.faculty,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const handleSave = () => {
    if (currentDepartment) {
      // Edit existing department
      setDepartments(
        departments.map((dept) =>
          dept.id === currentDepartment.id
            ? { ...dept, ...newDepartment }
            : dept
        )
      );
    } else {
      // Add new department
      const newId = (
        Math.max(...departments.map((d) => parseInt(d.id))) + 1
      ).toString();

      setDepartments([
        ...departments,
        {
          id: newId,
          name: newDepartment.name || "",
          head: newDepartment.head || "",
          faculty: newDepartment.faculty || "",
          instructors: 0,
          students: 0,
          courses: 0,
        },
      ]);
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-default-500">Manage college departments</p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Department
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search departments..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={
            <Icon icon="lucide:search" className="text-default-400" />
          }
          className="w-full max-w-xs"
        />
      </div>

      <div className="bg-content1 rounded-lg overflow-hidden shadow-sm">
        <Table
          aria-label="Departments table"
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
            <TableColumn>DEPARTMENT</TableColumn>
            <TableColumn>HEAD</TableColumn>
            <TableColumn>FACULTY</TableColumn>
            <TableColumn>INSTRUCTORS</TableColumn>
            <TableColumn>STUDENTS</TableColumn>
            <TableColumn>COURSES</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No departments found">
            {items.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.head}</TableCell>
                <TableCell>
                  <Chip variant="flat" size="sm">
                    {department.faculty}
                  </Chip>
                </TableCell>
                <TableCell>{department.instructors}</TableCell>
                <TableCell>{department.students}</TableCell>
                <TableCell>{department.courses}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleEdit(department)}
                    >
                      <Icon icon="lucide:edit" className="text-default-500" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(department.id)}
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

      {/* Add/Edit Department Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentDepartment ? "Edit Department" : "Add Department"}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Department Name"
                    placeholder="Enter department name"
                    value={newDepartment.name}
                    onValueChange={(value) =>
                      setNewDepartment({ ...newDepartment, name: value })
                    }
                  />
                  <Input
                    label="Department Head"
                    placeholder="Enter department head"
                    value={newDepartment.head}
                    onValueChange={(value) =>
                      setNewDepartment({ ...newDepartment, head: value })
                    }
                  />
                  <Input
                    label="Faculty"
                    placeholder="Enter faculty"
                    value={newDepartment.faculty}
                    onValueChange={(value) =>
                      setNewDepartment({ ...newDepartment, faculty: value })
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

export default Departments;
