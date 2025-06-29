import {Search, Ticket, Calendar, QrCode, Users, Shield, Clock, Star} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import FloatingShapes from "@/components/FloatingShapes";

const HowItWorks = () => {
    const steps = [
        {
            icon: Search,
            title: "Discover Events",
            description: "Browse through thousands of events or search for your favorites using our smart filters.",
            color: "from-blue-500 to-cyan-500",
            details: ["Filter by category, location, and date", "Smart search suggestions", "Save events to favorites"]
        },
        {
            icon: Ticket,
            title: "Select & Book",
            description: "Choose your preferred tickets and complete your purchase with secure payment options.",
            color: "from-purple-500 to-pink-500",
            details: ["Multiple ticket types available", "Secure payment processing", "Instant confirmation"]
        },
        {
            icon: QrCode,
            title: "Get Digital Tickets",
            description: "Receive your tickets instantly via email with unique QR codes for easy entry.",
            color: "from-orange-500 to-red-500",
            details: ["Digital tickets on your phone", "Unique QR codes", "Easy transfer to friends"]
        },
        {
            icon: Calendar,
            title: "Enjoy the Event",
            description: "Show your digital ticket at the venue and enjoy your unforgettable experience.",
            color: "from-green-500 to-emerald-500",
            details: ["Quick entry with QR scan", "Event reminders", "Rate your experience"]
        }
    ];

    const features = [
        {icon: Users, title: "Trusted by 100K+", description: "Join thousands of satisfied customers"},
        {icon: Shield, title: "Secure Payments", description: "Your transactions are always protected"},
        {icon: Clock, title: "24/7 Support", description: "Get help whenever you need it"},
        {icon: Star, title: "Best Experience", description: "Rated 4.9/5 by our users"}
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            <div className="relative z-10 py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            How It Works
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Getting your tickets is easier than ever. Follow these simple steps
                            to secure your spot at amazing events.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {steps.map((step, index) => (
                            <Card
                                key={index}
                                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center group"
                            >
                                <CardContent className="p-6">
                                    <div className="relative mb-6">
                                        <div
                                            className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <step.icon className="h-8 w-8 text-white"/>
                                        </div>
                                        <div
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {step.description}
                                    </p>

                                    <ul className="text-sm text-gray-500 space-y-1">
                                        {step.details.map((detail, i) => (
                                            <li key={i}>• {detail}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <feature.icon className="h-8 w-8 mx-auto mb-3 text-purple-400"/>
                                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/events">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full"
                            >
                                Start Booking Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
