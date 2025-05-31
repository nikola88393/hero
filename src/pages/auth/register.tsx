import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Input, Button, Checkbox, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useAuth } from "../../contexts/auth-context";

const Register: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");

      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");

      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-default-500">Sign up to get started</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 rounded-md bg-danger-50 text-danger-500 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          value={name}
          onValueChange={setName}
          placeholder="Enter your full name"
          startContent={
            <Icon icon="lucide:user" className="text-default-400" width={18} />
          }
          isRequired
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onValueChange={setEmail}
          placeholder="Enter your email"
          startContent={
            <Icon icon="lucide:mail" className="text-default-400" width={18} />
          }
          isRequired
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onValueChange={setPassword}
          placeholder="Create a password"
          startContent={
            <Icon icon="lucide:lock" className="text-default-400" width={18} />
          }
          isRequired
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          placeholder="Confirm your password"
          startContent={
            <Icon icon="lucide:lock" className="text-default-400" width={18} />
          }
          isRequired
        />

        <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
          I agree to the{" "}
          <Link href="#" className="text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary">
            Privacy Policy
          </Link>
        </Checkbox>

        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={isLoading}
          isDisabled={!agreeTerms}
        >
          Create Account
        </Button>

        <Divider className="my-4" />

        <div className="text-center text-sm">
          <span className="text-default-500">Already have an account? </span>
          <Link as={RouterLink} to="/login" className="text-primary">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
