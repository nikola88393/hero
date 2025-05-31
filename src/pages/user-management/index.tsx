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

interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "administrator"
    | "rector"
    | "department_head"
    | "instructor"
    | "student";
  department?: string;
  status: "active" | "inactive" | "pending";
  lastLogin?: string;
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

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "administrator",
    status: "active",
    lastLogin: "2023-09-15 10:30:45",
  },
  {
    id: "2",
    name: "Rector User",
    email: "rector@example.com",
    role: "rector",
    status: "active",
    lastLogin: "2023-09-14 14:22:10",
  },
  {
    id: "3",
    name: "Department Head",
    email: "head@example.com",
    role: "department_head",
    department: "Computer Science",
    status: "active",
    lastLogin: "2023-09-15 09:15:33",
  },
  {
    id: "4",
    name: "Instructor User",
    email: "instructor@example.com",
    role: "instructor",
    department: "Computer Science",
    status: "active",
    lastLogin: "2023-09-13 16:45:20",
  },
  {
    id: "5",
    name: "Student User",
    email: "student@example.com",
    role: "student",
    department: "Computer Science",
    status: "active",
    lastLogin: "2023-09-15 08:30:15",
  },
  {
    id: "6",
    name: "Math Instructor",
    email: "math.instructor@example.com",
    role: "instructor",
    department: "Mathematics",
    status: "active",
    lastLogin: "2023-09-14 11:20:05",
  },
  {
    id: "7",
    name: "Physics Student",
    email: "physics.student@example.com",
    role: "student",
    department: "Physics",
    status: "inactive",
    lastLogin: "2023-08-30 14:10:22",
  },
  {
    id: "8",
    name: "New User",
    email: "new.user@example.com",
    role: "student",
    department: "Business Administration",
    status: "pending",
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [newUser, setNewUser] = React.useState<Partial<User>>({
    name: "",
    email: "",
    role: "student",
    department: "",
    status: "pending",
  });

  // Filter users based on search query, role and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department &&
        user.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);

  const handleAdd = () => {
    setCurrentUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "student",
      department: "",
      status: "pending",
    });
    onOpen();
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
    });
    onOpen();
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = () => {
    if (currentUser) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? ({ ...user, ...newUser } as User) : user
        )
      );
    } else {
      // Add new user
      const newId = (
        Math.max(...users.map((u) => parseInt(u.id))) + 1
      ).toString();

      setUsers([
        ...users,
        {
          id: newId,
          name: newUser.name || "",
          email: newUser.email || "",
          role: newUser.role || "student",
          department: newUser.department,
          status: newUser.status || "pending",
        },
      ]);
    }
    onClose();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "danger";
      case "rector":
        return "secondary";
      case "department_head":
        return "warning";
      case "instructor":
        return "primary";
      case "student":
        return "success";
      default:
        return "default";
    }
  };

  const getRoleText = (role: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "pending":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-default-500">
            Manage system users and their roles
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Icon icon="lucide:user-plus" />}
        >
          Add User
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full max-w-xs"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                label="Role"
                placeholder="Select role"
                selectedKeys={[selectedRole]}
                className="w-full sm:w-40"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <SelectItem key="all" value="all">
                  All Roles
                </SelectItem>
                <SelectItem key="administrator" value="administrator">
                  Administrator
                </SelectItem>
                <SelectItem key="rector" value="rector">
                  Rector
                </SelectItem>
                <SelectItem key="department_head" value="department_head">
                  Department Head
                </SelectItem>
                <SelectItem key="instructor" value="instructor">
                  Instructor
                </SelectItem>
                <SelectItem key="student" value="student">
                  Student
                </SelectItem>
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
                <SelectItem key="inactive" value="inactive">
                  Inactive
                </SelectItem>
                <SelectItem key="pending" value="pending">
                  Pending
                </SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="bg-content1 rounded-lg overflow-hidden shadow-sm">
        <Table
          aria-label="Users table"
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
            <TableColumn>USER</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>DEPARTMENT</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>LAST LOGIN</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No users found">
            {items.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-default-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip color={getRoleColor(user.role)} variant="flat">
                    {getRoleText(user.role)}
                  </Chip>
                </TableCell>
                <TableCell>{user.department || "-"}</TableCell>
                <TableCell>
                  <Chip color={getStatusColor(user.status)} variant="flat">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Chip>
                </TableCell>
                <TableCell>{user.lastLogin || "Never"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleEdit(user)}
                    >
                      <Icon icon="lucide:edit" className="text-default-500" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(user.id)}
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

      {/* Add/Edit User Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentUser ? "Edit User" : "Add User"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter user name"
                    value={newUser.name}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, name: value })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, email: value })
                    }
                  />
                  <Select
                    label="Role"
                    placeholder="Select role"
                    selectedKeys={newUser.role ? [newUser.role] : []}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value as User["role"],
                      })
                    }
                  >
                    <SelectItem key="administrator" value="administrator">
                      Administrator
                    </SelectItem>
                    <SelectItem key="rector" value="rector">
                      Rector
                    </SelectItem>
                    <SelectItem key="department_head" value="department_head">
                      Department Head
                    </SelectItem>
                    <SelectItem key="instructor" value="instructor">
                      Instructor
                    </SelectItem>
                    <SelectItem key="student" value="student">
                      Student
                    </SelectItem>
                  </Select>
                  <Select
                    label="Department"
                    placeholder="Select department"
                    selectedKeys={
                      newUser.department ? [newUser.department] : []
                    }
                    isDisabled={
                      newUser.role === "administrator" ||
                      newUser.role === "rector"
                    }
                    onChange={(e) =>
                      setNewUser({ ...newUser, department: e.target.value })
                    }
                  >
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.name} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Status"
                    placeholder="Select status"
                    selectedKeys={newUser.status ? [newUser.status] : []}
                    className="md:col-span-2"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        status: e.target.value as User["status"],
                      })
                    }
                  >
                    <SelectItem key="active" value="active">
                      Active
                    </SelectItem>
                    <SelectItem key="inactive" value="inactive">
                      Inactive
                    </SelectItem>
                    <SelectItem key="pending" value="pending">
                      Pending
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

export default UserManagement;
