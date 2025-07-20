import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Eye, EyeOff, Mail, Lock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {useAuth} from "@/hooks/useAuth";
import {AxiosError} from "axios";
import type {ApiError} from "@/api/types/api.ts";

// Define the error response type locally to avoid circular dependency
interface AxiosErrorResponse {
    response?: {
        data: ApiError;
        status: number;
        statusText: string;
    };
    message: string;
    code?: string;
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {login, isLoading, error, clearError} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login({email, password});
            toast.success("Login successful! Welcome back!");
            navigate("/dashboard");
        } catch (error) {
            const axiosError = error as AxiosError<AxiosErrorResponse>;
            toast.error(axiosError.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div
            className="min-h-screen bg-app-gradient text-white relative overflow-hidden flex items-center justify-center">
            <div className="relative z-10 w-full max-w-md px-4">
                <Card className="bg-app-glass">
                    <CardHeader className="text-center">
                        <Link to="/"
                              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 inline-block">
                            TicketVerse
                        </Link>
                        <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                        <p className="text-gray-400">Sign in to your account</p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-sm text-gray-400">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/10"/>
                                    <span>Remember me</span>
                                </label>
                                <Link to="/auth/forgot" className="text-sm text-purple-400 hover:text-purple-300">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/auth/register"
                                      className="text-purple-400 hover:text-purple-300 font-semibold">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
