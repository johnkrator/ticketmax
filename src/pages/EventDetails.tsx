import {useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Calendar, MapPin, Users, Clock, Star, ArrowLeft, Plus, Minus, Ticket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import {useEvents} from "@/contexts/EventsContext";
import FloatingShapes from "@/components/FloatingShapes";

const EventDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {events} = useEvents();
    const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});

    // Find the event by ID
    const event = events.find(e => e.id === parseInt(id || "0"));

    if (!event) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <Link to="/events">
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Back to Events
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Default ticket types for all events
    const ticketTypes = [
        {
            id: "general",
            name: "General Admission",
            price: parseInt(event.price.replace("$", "")),
            description: "Access to all stages and general event areas",
            available: 500,
            features: ["Access to all stages", "Event access", "General seating area"]
        },
        {
            id: "vip",
            name: "VIP Experience",
            price: parseInt(event.price.replace("$", "")) * 2,
            description: "Premium experience with exclusive perks",
            available: 50,
            features: ["All General Admission benefits", "VIP lounge access", "Priority entry", "Complimentary drinks"]
        }
    ];

    const updateTicketQuantity = (ticketId: string, change: number) => {
        setSelectedTickets(prev => {
            const current = prev[ticketId] || 0;
            const newQuantity = Math.max(0, Math.min(10, current + change));
            return {...prev, [ticketId]: newQuantity};
        });
    };

    const getTotalPrice = () => {
        return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
            const ticket = ticketTypes.find(t => t.id === ticketId);
            return total + (ticket ? ticket.price * quantity : 0);
        }, 0);
    };

    const getTotalTickets = () => {
        return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
    };

    const handleBookNow = () => {
        if (getTotalTickets() === 0) {
            toast.error("Please select at least one ticket");
            return;
        }

        // Navigate to ticket preview page
        navigate("/ticket-preview", {
            state: {
                event: event,
                selectedTickets: selectedTickets,
                totalPrice: getTotalPrice(),
                totalTickets: getTotalTickets(),
                ticketTypes: ticketTypes
            }
        });
    };

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

                    <div className="flex items-center space-x-4">
                        <Link to="/auth/login">
                            <Button variant="ghost" className="text-white hover:bg-white/10">
                                Login
                            </Button>
                        </Link>
                        <Link to="/auth/register">
                            <Button
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 py-8 px-4">
                <div className="container mx-auto">
                    {/* Back Button */}
                    <Link to="/events"
                          className="inline-flex items-center text-purple-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to Events
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Event Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Hero Image */}
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-96 object-cover"
                                />
                                {event.featured && (
                                    <Badge
                                        className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        Featured Event
                                    </Badge>
                                )}
                            </div>

                            {/* Event Info */}
                            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <Badge variant="secondary"
                                                   className="bg-purple-500/20 text-purple-300 mb-3">
                                                {event.category}
                                            </Badge>
                                            <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                                            <p className="text-gray-400 mb-4">Professional Event Organizer</p>
                                        </div>
                                        <div className="flex items-center text-yellow-400">
                                            <Star className="h-5 w-5 fill-current mr-1"/>
                                            <span className="font-semibold">4.8</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="h-5 w-5 mr-3 text-purple-400"/>
                                            <span>{event.date} at {event.time}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="h-5 w-5 mr-3 text-purple-400"/>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Users className="h-5 w-5 mr-3 text-purple-400"/>
                                            <span>{event.attendees} attending</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Clock className="h-5 w-5 mr-3 text-purple-400"/>
                                            <span>Full day event</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-3">About This Event</h3>
                                        <p className="text-gray-300 leading-relaxed mb-4">{event.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                                            {event.category}
                                        </Badge>
                                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                                            Popular
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Ticket Selection */}
                        <div className="space-y-6">
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 sticky top-4">
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Select Tickets</h3>

                                    <div className="space-y-4">
                                        {ticketTypes.map((ticket) => (
                                            <div key={ticket.id}
                                                 className="border border-white/10 rounded-lg p-4 hover:border-purple-500/30 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-semibold text-white">{ticket.name}</h4>
                                                        <p className="text-gray-400 text-sm mb-2">{ticket.description}</p>
                                                        <p className="text-2xl font-bold text-purple-400">${ticket.price}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => updateTicketQuantity(ticket.id, -1)}
                                                            disabled={!selectedTickets[ticket.id]}
                                                            className="border-white/20 text-white hover:bg-white/10"
                                                        >
                                                            <Minus className="h-4 w-4"/>
                                                        </Button>
                                                        <span className="w-8 text-center text-white font-semibold">
                              {selectedTickets[ticket.id] || 0}
                            </span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => updateTicketQuantity(ticket.id, 1)}
                                                            disabled={(selectedTickets[ticket.id] || 0) >= 10}
                                                            className="border-white/20 text-white hover:bg-white/10"
                                                        >
                                                            <Plus className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="text-xs text-gray-500 mb-2">
                                                    {ticket.available} tickets remaining
                                                </div>

                                                <ul className="text-xs text-gray-400 space-y-1">
                                                    {ticket.features.map((feature, index) => (
                                                        <li key={index}>• {feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {getTotalTickets() > 0 && (
                                        <div className="mt-6 p-4 bg-white/5 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white">Total Tickets:</span>
                                                <span className="text-white font-semibold">{getTotalTickets()}</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xl font-bold text-white">Total Price:</span>
                                                <span
                                                    className="text-2xl font-bold text-purple-400">${getTotalPrice()}</span>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleBookNow}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
                                    >
                                        <Ticket className="h-5 w-5 mr-2"/>
                                        {getTotalTickets() > 0 ? `Book ${getTotalTickets()} Ticket(s)` : "Select Tickets"}
                                    </Button>

                                    <p className="text-xs text-gray-400 text-center mt-3">
                                        Secure booking • Instant confirmation • Mobile tickets
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
