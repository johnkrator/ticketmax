import {useEffect, useState} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {CheckCircle, Ticket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import FloatingShapes from "@/components/FloatingShapes";
import TicketCard from "@/components/TicketCard";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const paymentDetails = location.state || {
        eventTitle: "Sample Event",
        tickets: 1,
        totalPrice: 89,
        transactionId: "TXN123456",
        paymentDate: new Date().toISOString()
    };

    // Generate ticket data based on payment details
    const [ticketData] = useState(() => {
        const tickets = [];
        for (let i = 0; i < paymentDetails.tickets; i++) {
            tickets.push({
                eventTitle: paymentDetails.eventTitle,
                eventDate: "Aug 15, 2024 at 6:00 PM", // This would come from event data
                eventLocation: "Central Park, NY", // This would come from event data
                ticketType: "General Admission",
                quantity: 1,
                ticketNumber: `TK-${paymentDetails.transactionId}-${String(i + 1).padStart(3, "0")}`,
                transactionId: paymentDetails.transactionId
            });
        }
        return tickets;
    });

    useEffect(() => {
        // Redirect to dashboard after 15 seconds
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 15000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/"
                          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        TicketVerse
                    </Link>
                </div>
            </nav>

            <div className="relative z-10 py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-8">
                        <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6"/>
                        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
                        <p className="text-xl text-gray-300">
                            Your tickets have been confirmed and are ready for download
                        </p>
                    </div>

                    <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-white">Booking Confirmation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-left">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Event:</span>
                                <span className="text-white font-semibold">{paymentDetails.eventTitle}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Tickets:</span>
                                <span className="text-white">{paymentDetails.tickets}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Total Paid:</span>
                                <span className="text-green-400 font-bold">${paymentDetails.totalPrice}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Transaction ID:</span>
                                <span className="text-white font-mono text-sm">{paymentDetails.transactionId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Date:</span>
                                <span
                                    className="text-white">{new Date(paymentDetails.paymentDate).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tickets Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Ticket className="h-6 w-6"/>
                            Your Tickets
                        </h2>
                        <div className="space-y-4">
                            {ticketData.map((ticket, index) => (
                                <TicketCard key={index} ticket={ticket}/>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-400 mb-4">
                            Redirecting to your dashboard in 15 seconds...
                        </p>
                        <Link to="/dashboard">
                            <Button variant="ghost" className="text-purple-300 hover:text-white">
                                Go to Dashboard Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
