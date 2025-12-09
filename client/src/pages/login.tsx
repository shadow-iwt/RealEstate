import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center px-4">
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
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup">
              <a className="text-purple-400 hover:text-purple-300 font-semibold transition">
                Sign up here
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
