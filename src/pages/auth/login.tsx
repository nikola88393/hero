import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Input, Button, Checkbox, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../../contexts/auth-context";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");

      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-default-500">Sign in to continue to your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 rounded-md bg-danger-50 text-danger-500 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          startContent={
            <Icon className="text-default-400" icon="lucide:mail" width={18} />
          }
          isRequired
          onValueChange={setEmail}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onValueChange={setPassword}
          placeholder="Enter your password"
          startContent={
            <Icon icon="lucide:lock" className="text-default-400" width={18} />
          }
          isRequired
        />

        <div className="flex items-center justify-between">
          <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
            Remember me
          </Checkbox>
          <Link as={RouterLink} to="#" size="sm" className="text-primary">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <Divider className="my-4" />

        <div className="text-center text-sm">
          <span className="text-default-500">Don't have an account? </span>
          <Link as={RouterLink} to="/register" className="text-primary">
            Sign up now
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-default-400">
          <p>For demo purposes, use these emails:</p>
          <p>admin@example.com, rector@example.com,</p>
          <p>head@example.com, instructor@example.com,</p>
          <p>student@example.com (any password)</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
