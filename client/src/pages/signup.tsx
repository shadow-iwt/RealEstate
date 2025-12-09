import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/">
            <div className="flex items-center justify-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                RP
              </div>
              <span className="text-2xl font-bold text-white">RealEstate Pro</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400">Join thousands of real estate professionals</p>
        </div>

        {/* Signup Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-200">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-400">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-200">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-400">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Company (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-200">
                  Company Name (Optional)
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Real Estate Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (234) 567-890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500">At least 8 characters</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 py-2">
                <Checkbox
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        name: "agreeToTerms",
                        type: "checkbox",
                        checked: checked as boolean,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                  className="mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-purple-400 hover:text-purple-300">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-400">{errors.agreeToTerms}</p>
              )}

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-purple-400 hover:text-purple-300 font-semibold transition">
                Sign in here
              </a>
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
