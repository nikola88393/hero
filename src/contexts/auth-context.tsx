import React from "react";

export type UserRole =
  | "administrator"
  | "rector"
  | "department_head"
  | "instructor"
  | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This would be an API call in a real application
    // For demo purposes, we'll simulate a successful login
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data based on email
    let mockUser: User;

    if (email.includes("admin")) {
      mockUser = { id: "1", name: "Admin User", email, role: "administrator" };
    } else if (email.includes("rector")) {
      mockUser = { id: "2", name: "Rector User", email, role: "rector" };
    } else if (email.includes("head")) {
      mockUser = {
        id: "3",
        name: "Department Head",
        email,
        role: "department_head",
        departmentId: "1",
      };
    } else if (email.includes("instructor")) {
      mockUser = {
        id: "4",
        name: "Instructor User",
        email,
        role: "instructor",
        departmentId: "1",
      };
    } else {
      mockUser = { id: "5", name: "Student User", email, role: "student" };
    }

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    // This would be an API call in a real application
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: "student", // Default role for new registrations
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
