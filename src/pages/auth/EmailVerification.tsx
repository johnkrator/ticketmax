import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {useAuth} from "@/state/hooks/useAuth";
import {Mail, ArrowLeft} from "lucide-react";
import {AxiosError} from "axios";

// Type for API error response
interface ApiErrorResponse {
    message: string;
    error?: string;
    statusCode?: number;
}

const EmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const {verifyEmailCode, resendVerificationCode} = useAuth();

    // Get email from the location state (passed from registration)
    const email = location.state?.email;

    useEffect(() => {
        // If no email is available, redirect to register
        if (!email) {
            navigate("/auth/register");
        }
    }, [email, navigate]);

    const handleInputChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text");
        const digits = pastedText.replace(/\D/g, "").slice(0, 6);

        if (digits.length > 0) {
            const newCode = [...code];
            for (let i = 0; i < digits.length && i < 6; i++) {
                newCode[i] = digits[i];
            }
            setCode(newCode);

            // Focus the next empty input or the last input
            const nextIndex = Math.min(digits.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");

        if (verificationCode.length !== 6) {
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        setIsSubmitting(true);
        try {
            await verifyEmailCode(email, verificationCode);
            toast.success("Email verified successfully!");
            navigate("/auth/login", {
                state: {
                    message: "Your email has been verified. Please log in to continue."
                }
            });
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || "Invalid verification code. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        try {
            await resendVerificationCode(email);
            toast.success("Verification code sent to your email!");
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || "Failed to resend verification code. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden flex items-center justify-center py-8">
            <div className="relative z-10 w-full max-w-md px-4">
                <Card className="bg-app-glass">
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-full">
                                <Mail className="h-8 w-8 text-purple-400"/>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
                        <p className="text-gray-400">
                            We sent a 6-digit verification code to
                            <br/>
                            <span className="text-purple-400 font-medium">{email}</span>
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center space-x-3">
                                {code.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-xl font-bold bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400"
                                        placeholder="0"
                                    />
                                ))}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || code.some(digit => !digit)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
                            >
                                {isSubmitting ? "Verifying..." : "Verify Email"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-4">
                            <p className="text-gray-400 text-sm">
                                Didn't receive the code?
                            </p>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleResendCode}
                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            >
                                Resend Code
                            </Button>
                        </div>

                        <div className="mt-6 text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => navigate("/auth/register")}
                                className="text-gray-400 hover:text-white hover:bg-white/10 flex items-center gap-2 mx-auto"
                            >
                                <ArrowLeft className="h-4 w-4"/>
                                Back to Registration
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmailVerification;
