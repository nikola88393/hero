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

interface Faculty {
  id: string;
  name: string;
  dean: string;
  departments: number;
  instructors: number;
  students: number;
  established: string;
}

const mockFaculties: Faculty[] = [
  {
    id: "1",
    name: "Engineering",
    dean: "Dr. Robert Smith",
    departments: 5,
    instructors: 45,
    students: 850,
    established: "1965",
  },
  {
    id: "2",
    name: "Science",
    dean: "Dr. Maria Rodriguez",
    departments: 4,
    instructors: 38,
    students: 720,
    established: "1970",
  },
  {
    id: "3",
    name: "Business",
    dean: "Dr. James Wilson",
    departments: 3,
    instructors: 32,
    students: 680,
    established: "1975",
  },
  {
    id: "4",
    name: "Humanities",
    dean: "Dr. Sarah Johnson",
    departments: 6,
    instructors: 50,
    students: 920,
    established: "1960",
  },
  {
    id: "5",
    name: "Social Sciences",
    dean: "Dr. Michael Brown",
    departments: 4,
    instructors: 36,
    students: 750,
    established: "1972",
  },
  {
    id: "6",
    name: "Medicine",
    dean: "Dr. Elizabeth Taylor",
    departments: 7,
    instructors: 65,
    students: 580,
    established: "1980",
  },
  {
    id: "7",
    name: "Law",
    dean: "Dr. Thomas Anderson",
    departments: 2,
    instructors: 24,
    students: 340,
    established: "1985",
  },
  {
    id: "8",
    name: "Fine Arts",
    dean: "Dr. Patricia Martinez",
    departments: 3,
    instructors: 28,
    students: 420,
    established: "1990",
  },
];

const Faculties: React.FC = () => {
  const [faculties, setFaculties] = React.useState<Faculty[]>(mockFaculties);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentFaculty, setCurrentFaculty] = React.useState<Faculty | null>(
    null
  );
  const [newFaculty, setNewFaculty] = React.useState<Partial<Faculty>>({
    name: "",
    dean: "",
    established: "",
  });

  // Filter faculties based on search query
  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.dean.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const pages = Math.ceil(filteredFaculties.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredFaculties.slice(start, end);
  }, [page, filteredFaculties]);

  const handleAdd = () => {
    setCurrentFaculty(null);
    setNewFaculty({
      name: "",
      dean: "",
      established: new Date().getFullYear().toString(),
    });
    onOpen();
  };

  const handleEdit = (faculty: Faculty) => {
    setCurrentFaculty(faculty);
    setNewFaculty({
      name: faculty.name,
      dean: faculty.dean,
      established: faculty.established,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setFaculties(faculties.filter((faculty) => faculty.id !== id));
  };

  const handleSave = () => {
    if (currentFaculty) {
      // Edit existing faculty
      setFaculties(
        faculties.map((faculty) =>
          faculty.id === currentFaculty.id
            ? { ...faculty, ...newFaculty }
            : faculty
        )
      );
    } else {
      // Add new faculty
      const newId = (
        Math.max(...faculties.map((f) => parseInt(f.id))) + 1
      ).toString();

      setFaculties([
        ...faculties,
        {
          id: newId,
          name: newFaculty.name || "",
          dean: newFaculty.dean || "",
          established:
            newFaculty.established || new Date().getFullYear().toString(),
          departments: 0,
          instructors: 0,
          students: 0,
        },
      ]);
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Faculties</h1>
          <p className="text-default-500">Manage college faculties</p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Faculty
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search faculties..."
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
          aria-label="Faculties table"
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
            <TableColumn>FACULTY</TableColumn>
            <TableColumn>DEAN</TableColumn>
            <TableColumn>DEPARTMENTS</TableColumn>
            <TableColumn>INSTRUCTORS</TableColumn>
            <TableColumn>STUDENTS</TableColumn>
            <TableColumn>ESTABLISHED</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No faculties found">
            {items.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>{faculty.dean}</TableCell>
                <TableCell>
                  <Chip variant="flat" size="sm" color="primary">
                    {faculty.departments}
                  </Chip>
                </TableCell>
                <TableCell>{faculty.instructors}</TableCell>
                <TableCell>{faculty.students}</TableCell>
                <TableCell>{faculty.established}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleEdit(faculty)}
                    >
                      <Icon icon="lucide:edit" className="text-default-500" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(faculty.id)}
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

      {/* Add/Edit Faculty Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentFaculty ? "Edit Faculty" : "Add Faculty"}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Faculty Name"
                    placeholder="Enter faculty name"
                    value={newFaculty.name}
                    onValueChange={(value) =>
                      setNewFaculty({ ...newFaculty, name: value })
                    }
                  />
                  <Input
                    label="Dean"
                    placeholder="Enter dean's name"
                    value={newFaculty.dean}
                    onValueChange={(value) =>
                      setNewFaculty({ ...newFaculty, dean: value })
                    }
                  />
                  <Input
                    label="Established Year"
                    placeholder="Enter year established"
                    value={newFaculty.established}
                    onValueChange={(value) =>
                      setNewFaculty({ ...newFaculty, established: value })
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

export default Faculties;
