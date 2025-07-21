import {useState, useEffect} from "react";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Calendar, MapPin, Clock, Ticket, Download, Eye, Search} from "lucide-react";
import {Input} from "@/components/ui/input";

interface BookingItem {
    id: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    venue: string;
    ticketType: string;
    quantity: number;
    totalAmount: number;
    status: "confirmed" | "pending" | "cancelled";
    bookingDate: string;
    qrCode?: string;
}

const BookingHistory = () => {
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [loading, setLoading] = useState(true);

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockBookings: BookingItem[] = [
            {
                id: "BK001",
                eventName: "Summer Music Festival 2025",
                eventDate: "2025-08-15",
                eventTime: "18:00",
                venue: "Central Park, New York",
                ticketType: "VIP",
                quantity: 2,
                totalAmount: 199.98,
                status: "confirmed",
                bookingDate: "2025-07-01",
                qrCode: "QR123456"
            },
            {
                id: "BK002",
                eventName: "Tech Conference 2025",
                eventDate: "2025-09-22",
                eventTime: "09:00",
                venue: "Convention Center, San Francisco",
                ticketType: "General Admission",
                quantity: 1,
                totalAmount: 299.00,
                status: "confirmed",
                bookingDate: "2025-06-15",
                qrCode: "QR789012"
            },
            {
                id: "BK003",
                eventName: "Food & Wine Expo",
                eventDate: "2025-07-30",
                eventTime: "12:00",
                venue: "Grand Hotel, Chicago",
                ticketType: "Premium",
                quantity: 2,
                totalAmount: 149.98,
                status: "pending",
                bookingDate: "2025-07-18"
            }
        ];

        // Simulate API loading
        setTimeout(() => {
            setBookings(mockBookings);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.venue.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDownloadTicket = (bookingId: string) => {
        // TODO: Implement ticket download functionality
        console.log("Downloading ticket for booking:", bookingId);
    };

    const handleViewTicket = (bookingId: string) => {
        // TODO: Implement ticket view functionality
        console.log("Viewing ticket for booking:", bookingId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-app-background py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-app-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Booking History</h1>
                    <p className="text-gray-300">View and manage your event bookings</p>
                </div>

                {/* Filters */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                <Input
                                    placeholder="Search events or venues..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="all" className="bg-gray-800">All Status</option>
                            <option value="confirmed" className="bg-gray-800">Confirmed</option>
                            <option value="pending" className="bg-gray-800">Pending</option>
                            <option value="cancelled" className="bg-gray-800">Cancelled</option>
                        </select>
                    </div>
                </Card>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 p-12 text-center">
                        <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
                        <p className="text-gray-300 mb-4">
                            {searchTerm || statusFilter !== "all"
                                ? "Try adjusting your search or filter criteria."
                                : "You haven't made any event bookings yet."}
                        </p>
                        <Button
                            onClick={() => window.location.href = "/events"}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                            Browse Events
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => (
                            <Card key={booking.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-2">
                                                    {booking.eventName}
                                                </h3>
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-white">
                                                    ${booking.totalAmount.toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    {booking.quantity} ticket{booking.quantity > 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center text-gray-300">
                                                <Calendar className="h-4 w-4 mr-2"/>
                                                {new Date(booking.eventDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center text-gray-300">
                                                <Clock className="h-4 w-4 mr-2"/>
                                                {booking.eventTime}
                                            </div>
                                            <div className="flex items-center text-gray-300">
                                                <MapPin className="h-4 w-4 mr-2"/>
                                                {booking.venue}
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-400">
                                            <p>Booking ID: {booking.id}</p>
                                            <p>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                            <p>Ticket Type: {booking.ticketType}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 lg:w-48">
                                        {booking.status === "confirmed" && (
                                            <>
                                                <Button
                                                    onClick={() => handleViewTicket(booking.id)}
                                                    variant="ghost"
                                                    className="text-purple-300 hover:text-white hover:bg-white/10 w-full"
                                                >
                                                    <Eye className="h-4 w-4 mr-2"/>
                                                    View Ticket
                                                </Button>
                                                <Button
                                                    onClick={() => handleDownloadTicket(booking.id)}
                                                    variant="ghost"
                                                    className="text-purple-300 hover:text-white hover:bg-white/10 w-full"
                                                >
                                                    <Download className="h-4 w-4 mr-2"/>
                                                    Download
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;
