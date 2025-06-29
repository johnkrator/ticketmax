import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowLeft, Calendar, MapPin, Clock, Users, Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {toast} from "sonner";
import FloatingShapes from "@/components/FloatingShapes";

interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
    available: number;
}

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    price: string;
    category: string;
    description: string;
    organizer: string;
}

const TicketPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
    const [event, setEvent] = useState<Event | null>(null);
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);

    useEffect(() => {
        const state = location.state as {
            event: Event;
            selectedTickets: Record<string, number>;
            ticketTypes?: TicketType[]
        } | null;
        if (state) {
            setEvent(state.event);
            setSelectedTickets(state.selectedTickets);

            // If ticketTypes are passed, use them, otherwise create default ones
            if (state.ticketTypes) {
                setTicketTypes(state.ticketTypes);
            } else {
                // Create default ticket types based on event price
                const defaultTicketTypes = [
                    {
                        id: "general",
                        name: "General Admission",
                        price: parseInt(state.event.price.replace("$", "")),
                        description: "Access to all stages and general event areas",
                        available: 500,
                    },
                    {
                        id: "vip",
                        name: "VIP Experience",
                        price: parseInt(state.event.price.replace("$", "")) * 2,
                        description: "Premium experience with exclusive perks",
                        available: 50,
                    }
                ];
                setTicketTypes(defaultTicketTypes);
            }
        } else {
            // Redirect back to events if no state
            navigate("/events");
        }
    }, [location, navigate]);

    const updateTicketQuantity = (ticketId: string, change: number) => {
        setSelectedTickets(prev => {
            const currentQuantity = prev[ticketId] || 0;
            const newQuantity = Math.max(0, currentQuantity + change);

            if (newQuantity !== 0) {
                return {...prev, [ticketId]: newQuantity};
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {[ticketId]: _, ...rest} = prev;
                return rest;
            }
        });
    };

    const getTotalPrice = () => {
        if (!ticketTypes.length) return 0;
        return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
            const ticket = ticketTypes.find(t => t.id === ticketId);
            return total + (ticket ? ticket.price * quantity : 0);
        }, 0);
    };

    const getTotalTickets = () => {
        return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
    };

    const handleProceedToPayment = () => {
        if (getTotalTickets() === 0) {
            toast.error("Please select at least one ticket");
            return;
        }

        navigate("/payment", {
            state: {
                event,
                selectedTickets,
                totalPrice: getTotalPrice(),
                totalTickets: getTotalTickets()
            }
        });
    };

    // Show loading only if we don't have event data
    if (!event) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="text-white hover:bg-white/10 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to Event
                    </Button>

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Ticket Preview
                    </h1>
                    <p className="text-gray-400 mt-2">Review your ticket selection before payment</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Details */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader>
                                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardTitle className="text-2xl text-white">{event.title}</CardTitle>
                                <div className="flex items-center gap-4 text-gray-400 mt-2">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4"/>
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4"/>
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4"/>
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Selected Tickets</h3>
                                        {Object.entries(selectedTickets).length === 0 ? (
                                            <div className="text-center py-8 text-gray-400">
                                                <p>No tickets selected yet.</p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => navigate(-1)}
                                                    className="mt-4 border-white/20 text-white hover:bg-white/10"
                                                >
                                                    Go Back to Select Tickets
                                                </Button>
                                            </div>
                                        ) : (
                                            Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                                                const ticket = ticketTypes.find(t => t.id === ticketId);
                                                if (!ticket || quantity === 0) return null;

                                                return (
                                                    <div key={ticketId}
                                                         className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-white">{ticket.name}</h4>
                                                            <p className="text-sm text-gray-400">{ticket.description}</p>
                                                            <p className="text-lg font-bold text-purple-400">${ticket.price}</p>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => updateTicketQuantity(ticketId, -1)}
                                                                className="h-8 w-8 p-0 border-white/20 hover:bg-white/10"
                                                            >
                                                                <Minus className="h-4 w-4"/>
                                                            </Button>

                                                            <p className="text-white font-medium w-8 text-center">
                                                                {quantity}
                                                            </p>

                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => updateTicketQuantity(ticketId, 1)}
                                                                className="h-8 w-8 p-0 border-white/20 hover:bg-white/10"
                                                                disabled={quantity >= ticket.available}
                                                            >
                                                                <Plus className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-xl text-white">Order Summary</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                                        const ticket = ticketTypes.find(t => t.id === ticketId);
                                        if (!ticket || quantity === 0) return null;

                                        return (
                                            <div key={ticketId} className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {ticket.name} × {quantity}
                        </span>
                                                <span
                                                    className="text-white">${(ticket.price * quantity).toFixed(2)}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Separator className="bg-white/20"/>

                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">Total Tickets:</span>
                                    <Badge variant="secondary" className="bg-purple-600 text-white">
                                        <Users className="h-3 w-3 mr-1"/>
                                        {getTotalTickets()}
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span className="text-white">Total:</span>
                                    <span className="text-purple-400">${getTotalPrice().toFixed(2)}</span>
                                </div>

                                <Button
                                    onClick={handleProceedToPayment}
                                    className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                                    disabled={getTotalTickets() === 0}
                                >
                                    Proceed to Payment
                                </Button>

                                <p className="text-xs text-gray-400 text-center">
                                    Secure payment powered by Stripe
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPreview;