import React, {useState} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {CreditCard, Lock, ArrowLeft, User, Mail, Phone} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import FloatingShapes from "@/components/FloatingShapes";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentData, setPaymentData] = useState({
        email: "",
        phone: "",
        fullName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const bookingDetails = location.state || {
        eventTitle: "Sample Event",
        tickets: 1,
        totalPrice: 89,
        eventId: 1
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            toast.success("Payment successful!");
            navigate("/payment/success", {
                state: {
                    ...bookingDetails,
                    transactionId: "TXN" + Date.now(),
                    paymentDate: new Date().toISOString()
                }
            });
        }, 3000);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            <div className="relative z-10 py-8 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Link to={`/events/${bookingDetails.eventId}`}
                          className="inline-flex items-center text-purple-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to Event
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Event:</span>
                                    <span className="text-white font-semibold">{bookingDetails.eventTitle}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Tickets:</span>
                                    <span className="text-white">{bookingDetails.tickets}</span>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-white">Total:</span>
                                        <span className="text-purple-400">${bookingDetails.totalPrice}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Form */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white flex items-center">
                                    <Lock className="h-6 w-6 mr-2 text-green-400"/>
                                    Secure Payment
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePayment} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="fullName"
                                                placeholder="John Doe"
                                                value={paymentData.fullName}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email</label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={paymentData.email}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Phone</label>
                                        <div className="relative">
                                            <Phone
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="phone"
                                                placeholder="+1 (555) 123-4567"
                                                value={paymentData.phone}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Card Number</label>
                                        <div className="relative">
                                            <CreditCard
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={paymentData.cardNumber}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                                            <Input
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={paymentData.expiryDate}
                                                onChange={handleInputChange}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">CVV</label>
                                            <Input
                                                name="cvv"
                                                placeholder="123"
                                                value={paymentData.cvv}
                                                onChange={handleInputChange}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
                                    >
                                        {isProcessing ? "Processing Payment..." : `Pay $${bookingDetails.totalPrice}`}
                                    </Button>

                                    <p className="text-xs text-gray-400 text-center">
                                        Your payment information is secure and encrypted
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
