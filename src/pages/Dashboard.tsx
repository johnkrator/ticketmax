import {useState} from "react";
import {Link} from "react-router-dom";
import {Calendar, Ticket, Plus, Edit3, Trash2, Users, DollarSign} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import FloatingShapes from "@/components/FloatingShapes";

const Dashboard = () => {
    // Mock user data - in real app, this would come from authentication context
    const [user] = useState({
        id: "user123",
        name: "John Doe",
        email: "john@example.com"
    });

    // Mock user's tickets
    const [userTickets] = useState([
        {
            id: 1,
            eventTitle: "Summer Music Festival 2024",
            date: "Aug 15, 2024",
            location: "Central Park, NY",
            ticketType: "VIP",
            quantity: 2,
            status: "confirmed"
        },
        {
            id: 2,
            eventTitle: "Tech Conference 2024",
            date: "Sep 20, 2024",
            location: "Convention Center",
            ticketType: "General",
            quantity: 1,
            status: "confirmed"
        }
    ]);

    // Mock user's created events
    const [userEvents, setUserEvents] = useState([
        {
            id: 1,
            title: "Local Art Exhibition",
            date: "Oct 10, 2024",
            location: "Downtown Gallery",
            ticketsSold: 45,
            totalTickets: 100,
            revenue: 2250,
            status: "active"
        },
        {
            id: 2,
            title: "Community Workshop",
            date: "Nov 5, 2024",
            location: "Community Center",
            ticketsSold: 12,
            totalTickets: 30,
            revenue: 360,
            status: "active"
        }
    ]);

    const handleDeleteEvent = (eventId: number) => {
        setUserEvents(userEvents.filter(event => event.id !== eventId));
        toast.success("Event deleted successfully");
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
                        <span className="text-gray-300">Welcome, {user.name}</span>
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 py-8 px-4">
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-gray-400">Manage your tickets and events</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Ticket className="h-8 w-8 text-purple-400 mr-3"/>
                                    <div>
                                        <p className="text-gray-400 text-sm">My Tickets</p>
                                        <p className="text-2xl font-bold text-white">{userTickets.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Calendar className="h-8 w-8 text-pink-400 mr-3"/>
                                    <div>
                                        <p className="text-gray-400 text-sm">My Events</p>
                                        <p className="text-2xl font-bold text-white">{userEvents.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Users className="h-8 w-8 text-blue-400 mr-3"/>
                                    <div>
                                        <p className="text-gray-400 text-sm">Tickets Sold</p>
                                        <p className="text-2xl font-bold text-white">
                                            {userEvents.reduce((sum, event) => sum + event.ticketsSold, 0)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <DollarSign className="h-8 w-8 text-green-400 mr-3"/>
                                    <div>
                                        <p className="text-gray-400 text-sm">Revenue</p>
                                        <p className="text-2xl font-bold text-white">
                                            ${userEvents.reduce((sum, event) => sum + event.revenue, 0)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* My Tickets */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-white">My Tickets</CardTitle>
                                <Link to="/events">
                                    <Button size="sm"
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        Browse Events
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {userTickets.map((ticket) => (
                                    <div key={ticket.id} className="border border-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-white">{ticket.eventTitle}</h4>
                                            <Badge className="bg-green-500/20 text-green-300">
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-1">{ticket.date} • {ticket.location}</p>
                                        <p className="text-gray-400 text-sm">
                                            {ticket.quantity} x {ticket.ticketType} Ticket(s)
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* My Events */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-white">My Events</CardTitle>
                                <Link to="/events/create">
                                    <Button size="sm"
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Create Event
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {userEvents.map((event) => (
                                    <div key={event.id} className="border border-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-white">{event.title}</h4>
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="ghost"
                                                        className="text-blue-400 hover:bg-blue-500/20">
                                                    <Edit3 className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-400 hover:bg-red-500/20"
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">{event.date} • {event.location}</p>
                                        <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {event.ticketsSold}/{event.totalTickets} tickets sold
                      </span>
                                            <span className="text-green-400 font-semibold">
                        ${event.revenue} revenue
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
