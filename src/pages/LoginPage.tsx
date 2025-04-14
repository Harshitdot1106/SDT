
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock user data
const mockUsers = [
  { email: "admin@example.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "user@example.com", password: "user123", role: "user", name: "Regular User" }
];

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication logic
    const foundUser = mockUsers.find(
      (user) => user.email === loginEmail && user.password === loginPassword
    );
    
    setTimeout(() => {
      if (foundUser) {
        // Store user info in localStorage for persistence
        localStorage.setItem("user", JSON.stringify({
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          isLoggedIn: true
        }));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        // Redirect based on role
        if (foundUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if email already exists
    const emailExists = mockUsers.some((user) => user.email === registerEmail);
    
    setTimeout(() => {
      if (emailExists) {
        toast({
          title: "Registration Failed",
          description: "An account with this email already exists.",
          variant: "destructive"
        });
      } else {
        // In a real app, we would create a new user in the database
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });
        
        // Auto-login the new user
        localStorage.setItem("user", JSON.stringify({
          email: registerEmail,
          name: registerName,
          role: "user",
          isLoggedIn: true
        }));
        
        navigate("/dashboard");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <div className="absolute inset-0 animate-ripple rounded-full bg-water-bright/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplet size={32} className="text-water-bright" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome to FixMyWater</CardTitle>
            <CardDescription className="text-center">
              Login or create an account to report and track water issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="water-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-water-bright hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="water-input"
                        required
                      />
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <p>Demo credentials:</p>
                      <p>Admin: admin@example.com / admin123</p>
                      <p>User: user@example.com / user123</p>
                    </div>
                    <Button 
                      type="submit" 
                      className="water-button w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="water-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="water-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="water-input"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="water-button w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 text-center">
            By continuing, you agree to FixMyWater's{" "}
            <Link to="/terms" className="text-water-bright hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-water-bright hover:underline">Privacy Policy</Link>.
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
