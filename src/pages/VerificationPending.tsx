import React from "react";
import {useNavigate} from "react-router-dom";
import {Clock, CheckCircle, Mail, Phone, ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

const VerificationPending: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-app-background py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-white/10 backdrop-blur-md border-white/20">
                        <CardHeader className="text-center">
                            <div
                                className="mx-auto mb-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Clock className="h-8 w-8 text-white"/>
                            </div>
                            <CardTitle className="text-2xl text-white">
                                Verification In Progress
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="text-white space-y-6">
                            <div className="text-center">
                                <p className="text-lg text-gray-300 mb-4">
                                    Thank you for submitting your organizer application!
                                </p>
                                <p className="text-gray-400">
                                    We're currently reviewing your information and documents.
                                    This process typically takes 1-3 business days.
                                </p>
                            </div>

                            <Alert className="bg-blue-500/20 border-blue-500/50">
                                <CheckCircle className="h-4 w-4 text-blue-400"/>
                                <AlertDescription className="text-blue-100">
                                    <strong>What happens next:</strong>
                                    <ul className="mt-2 ml-4 list-disc space-y-1">
                                        <li>Our team will review your submitted documents</li>
                                        <li>We may contact you for additional information</li>
                                        <li>You'll receive an email once verification is complete</li>
                                        <li>After approval, you can start creating events immediately</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="h-5 w-5 text-blue-400"/>
                                        <h3 className="font-medium">Email Updates</h3>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        We'll send you updates about your verification status
                                    </p>
                                </div>

                                <div className="bg-white/5 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="h-5 w-5 text-green-400"/>
                                        <h3 className="font-medium">Support Available</h3>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Contact us if you have any questions
                                    </p>
                                </div>
                            </div>

                            <div className="text-center pt-6">
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
                                >
                                    <ArrowLeft className="h-4 w-4"/>
                                    Return to Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VerificationPending;