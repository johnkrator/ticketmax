import type React from "react";
import {useState, useRef, useEffect} from "react";
import {
    Calendar,
    Ticket,
    Plus,
    Edit3,
    Trash2,
    Users,
    DollarSign,
    Download,
    QrCode,
    CheckCircle,
    XCircle,
    Camera,
    FileImage,
    FileText,
    ChevronDown,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {QRCodeGenerator} from "@/components/QRCodeGenerator.tsx";
import {TicketTemplate} from "@/components/TicketTemplate.tsx";
import {Link} from "react-router-dom";
import type {UserTicket} from "@/state/api/types/api.ts";

interface UserEvent {
    id: number;
    title: string;
    date: string;
    location: string;
    ticketsSold: number;
    totalTickets: number;
    revenue: number;
    status: string;
}

interface ScanResult {
    valid: boolean;
    ticketNumber?: string;
    eventTitle?: string;
    ticketType?: string;
    scannedAt?: string;
    error?: string;
}

// Custom Dropdown Component (fallback if shadcn dropdown doesn't work)
interface CustomDropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({trigger, children, isOpen, onToggle}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onToggle();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={onToggle}>{trigger}</div>
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-md border border-slate-700 bg-slate-800 p-1 shadow-lg">
                    {children}
                </div>
            )}
        </div>
    );
};

interface CustomDropdownItemProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const CustomDropdownItem: React.FC<CustomDropdownItemProps> = ({onClick, disabled = false, children}) => {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`w-full text-left px-2 py-1.5 text-sm rounded-sm transition-colors ${
                disabled
                    ? "opacity-50 cursor-not-allowed text-gray-400"
                    : "text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
            }`}
        >
            {children}
        </button>
    );
};

const Dashboard: React.FC = () => {
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [downloadingTickets, setDownloadingTickets] = useState<Set<number>>(new Set());
    const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [userTickets] = useState<UserTicket[]>([
        {
            id: 1,
            eventTitle: "Summer Music Festival 2024",
            date: "Aug 15, 2024",
            location: "Central Park, NY",
            ticketType: "VIP",
            quantity: 2,
            status: "confirmed",
            ticketNumber: "TK-SMF2024-001",
            qrData: JSON.stringify({
                ticketNumber: "TK-SMF2024-001",
                eventTitle: "Summer Music Festival 2024",
                ticketType: "VIP",
                date: "Aug 15, 2024",
                location: "Central Park, NY",
                userId: "user123",
                timestamp: "2024-08-15T18:00:00Z",
            }),
        },
        {
            id: 2,
            eventTitle: "Tech Conference 2024",
            date: "Sep 20, 2024",
            location: "Convention Center",
            ticketType: "General",
            quantity: 1,
            status: "confirmed",
            ticketNumber: "TK-TC2024-002",
            qrData: JSON.stringify({
                ticketNumber: "TK-TC2024-002",
                eventTitle: "Tech Conference 2024",
                ticketType: "General",
                date: "Sep 20, 2024",
                location: "Convention Center",
                userId: "user123",
                timestamp: "2024-09-20T09:00:00Z",
            }),
        },
    ]);

    const [userEvents, setUserEvents] = useState<UserEvent[]>([
        {
            id: 1,
            title: "Local Art Exhibition",
            date: "Oct 10, 2024",
            location: "Downtown Gallery",
            ticketsSold: 45,
            totalTickets: 100,
            revenue: 2250,
            status: "active",
        },
        {
            id: 2,
            title: "Community Workshop",
            date: "Nov 5, 2024",
            location: "Community Center",
            ticketsSold: 12,
            totalTickets: 30,
            revenue: 360,
            status: "active",
        },
    ]);

    const handleDeleteEvent = (eventId: number): void => {
        setUserEvents(userEvents.filter((event) => event.id !== eventId));
    };

    const toggleDropdown = (ticketId: number) => {
        setOpenDropdowns((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(ticketId)) {
                newSet.delete(ticketId);
            } else {
                newSet.clear(); // Close other dropdowns
                newSet.add(ticketId);
            }
            return newSet;
        });
    };

    const closeDropdown = (ticketId: number) => {
        setOpenDropdowns((prev) => {
            const newSet = new Set(prev);
            newSet.delete(ticketId);
            return newSet;
        });
    };

    // Download ticket as PDF
    const downloadTicketAsPDF = async (ticket: UserTicket): Promise<void> => {
        try {
            closeDropdown(ticket.id);
            setDownloadingTickets((prev) => new Set(prev).add(ticket.id));
            const qrCodeDataUrl = await QRCodeGenerator.generate(ticket.qrData, 200);
            await TicketTemplate.downloadAsPDF(ticket, qrCodeDataUrl);
        } catch (err) {
            console.error("Error generating PDF ticket:", err);
            alert("Error generating PDF ticket. Please try again.");
        } finally {
            setDownloadingTickets((prev) => {
                const newSet = new Set(prev);
                newSet.delete(ticket.id);
                return newSet;
            });
        }
    };

    // Download ticket as JPEG
    const downloadTicketAsJPEG = async (ticket: UserTicket): Promise<void> => {
        try {
            closeDropdown(ticket.id);
            setDownloadingTickets((prev) => new Set(prev).add(ticket.id));
            const qrCodeDataUrl = await QRCodeGenerator.generate(ticket.qrData, 200);
            await TicketTemplate.downloadAsJPEG(ticket, qrCodeDataUrl);
        } catch (err) {
            console.error("Error generating JPEG ticket:", err);
            alert("Error generating JPEG ticket. Please try again.");
        } finally {
            setDownloadingTickets((prev) => {
                const newSet = new Set(prev);
                newSet.delete(ticket.id);
                return newSet;
            });
        }
    };

    // QR Code scanning functions
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setScanResult({valid: false, error: "Please upload a valid image file"});
            return;
        }

        setIsScanning(true);
        const reader = new FileReader();
        reader.onload = () => {
            try {
                // In a real implementation, you would use a QR code reading library here
                // For demo purposes, we'll simulate QR code reading
                const validTickets = userTickets.map((t) => {
                    try {
                        return JSON.parse(t.qrData);
                    } catch {
                        return {ticketNumber: t.ticketNumber};
                    }
                });

                // Simulate different scan results based on file name or random
                const fileName = file.name.toLowerCase();
                let matchedTicket;

                if (fileName.includes("summer") || fileName.includes("music") || Math.random() > 0.3) {
                    matchedTicket = validTickets[0]; // Valid ticket
                } else if (fileName.includes("tech") || fileName.includes("conference")) {
                    matchedTicket = validTickets[1]; // Another valid ticket
                } else {
                    matchedTicket = null; // Invalid ticket
                }

                if (matchedTicket) {
                    setScanResult({
                        valid: true,
                        ticketNumber: matchedTicket.ticketNumber,
                        eventTitle: matchedTicket.eventTitle,
                        ticketType: matchedTicket.ticketType,
                        scannedAt: new Date().toISOString(),
                    });
                } else {
                    setScanResult({
                        valid: false,
                        error: "Ticket not found or invalid QR code",
                    });
                }
            } catch (err) {
                console.error("Error processing QR code:", err);
                setScanResult({
                    valid: false,
                    error: "Failed to read QR code. Please try again.",
                });
            } finally {
                setIsScanning(false);
            }
        };

        reader.onerror = () => {
            setScanResult({
                valid: false,
                error: "Failed to read file. Please try again.",
            });
            setIsScanning(false);
        };

        reader.readAsDataURL(file);
    };

    const startScanning = (): void => {
        fileInputRef.current?.click();
    };

    const resetScanner = (): void => {
        setScanResult(null);
        setIsScanning(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Load QRCode library on component mount
    useEffect(() => {
        // The QRCodeGenerator will handle loading the library when needed
    }, []);

    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* My Tickets */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-white">My Tickets</CardTitle>
                                <Link to="/events">
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
                                        Browse Events
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {userTickets.map((ticket) => (
                                    <div key={ticket.id} className="border border-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-white">{ticket.eventTitle}</h4>
                                            <Badge className="bg-green-500/20 text-green-300">{ticket.status}</Badge>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-1">
                                            {ticket.date} • {ticket.location}
                                        </p>
                                        <p className="text-gray-400 text-sm mb-3">
                                            {ticket.quantity} x {ticket.ticketType} Ticket(s)
                                        </p>
                                        <div className="flex space-x-2">
                                            {/* Custom Dropdown Implementation */}
                                            <CustomDropdown
                                                isOpen={openDropdowns.has(ticket.id)}
                                                onToggle={() => toggleDropdown(ticket.id)}
                                                trigger={
                                                    <Button
                                                        size="sm"
                                                        disabled={downloadingTickets.has(ticket.id)}
                                                        className="bg-[#4f3580] hover:bg-[#6a4a99] focus:bg-[#6a4a99] text-white flex-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Download className="h-4 w-4 mr-2"/>
                                                        {downloadingTickets.has(ticket.id) ? "Generating..." : "Download"}
                                                        <ChevronDown className="h-4 w-4 ml-2"/>
                                                    </Button>
                                                }
                                            >
                                                <CustomDropdownItem
                                                    onClick={() => downloadTicketAsPDF(ticket)}
                                                    disabled={downloadingTickets.has(ticket.id)}
                                                >
                                                    <div className="flex items-center">
                                                        <FileText className="h-4 w-4 mr-2"/>
                                                        Download as PDF
                                                    </div>
                                                </CustomDropdownItem>
                                                <CustomDropdownItem
                                                    onClick={() => downloadTicketAsJPEG(ticket)}
                                                    disabled={downloadingTickets.has(ticket.id)}
                                                >
                                                    <div className="flex items-center">
                                                        <FileImage className="h-4 w-4 mr-2"/>
                                                        Download as JPEG
                                                    </div>
                                                </CustomDropdownItem>
                                            </CustomDropdown>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* QR Code Scanner */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                    <QrCode className="h-6 w-6"/>
                                    Ticket Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {!scanResult ? (
                                    <div className="text-center space-y-4">
                                        <div
                                            className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8">
                                            <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4"/>
                                            <p className="text-gray-300 mb-4">Upload a QR code image to verify
                                                ticket</p>
                                            <Button
                                                onClick={startScanning}
                                                disabled={isScanning}
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                                            >
                                                <Camera className="h-4 w-4 mr-2"/>
                                                {isScanning ? "Processing..." : "Upload QR Code"}
                                            </Button>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div
                                            className={`p-4 rounded-lg border-2 ${
                                                scanResult.valid ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                {scanResult.valid ? (
                                                    <CheckCircle className="h-6 w-6 text-green-400"/>
                                                ) : (
                                                    <XCircle className="h-6 w-6 text-red-400"/>
                                                )}
                                                <span
                                                    className={`font-semibold ${scanResult.valid ? "text-green-400" : "text-red-400"}`}>
                          {scanResult.valid ? "Valid Ticket" : "Invalid Ticket"}
                        </span>
                                            </div>

                                            {scanResult.valid && scanResult.ticketNumber && (
                                                <div className="space-y-2 text-sm text-gray-300">
                                                    <p>
                                                        <strong>Ticket:</strong> {scanResult.ticketNumber}
                                                    </p>
                                                    <p>
                                                        <strong>Event:</strong> {scanResult.eventTitle}
                                                    </p>
                                                    <p>
                                                        <strong>Type:</strong> {scanResult.ticketType}
                                                    </p>
                                                    <p>
                                                        <strong>Verified at:</strong>{" "}
                                                        {scanResult.scannedAt ? new Date(scanResult.scannedAt).toLocaleString() : "N/A"}
                                                    </p>
                                                </div>
                                            )}

                                            {!scanResult.valid && scanResult.error && (
                                                <p className="text-red-300 text-sm">{scanResult.error}</p>
                                            )}
                                        </div>

                                        <Button
                                            onClick={resetScanner}
                                            variant="outline"
                                            className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                                        >
                                            Scan Another Ticket
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* My Events */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-white">My Events</CardTitle>
                                <Link to="/events/create">
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
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
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-blue-400 hover:bg-blue-500/20 hover:text-white"
                                                >
                                                    <Edit3 className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-400 hover:bg-red-500/20 hover:text-white"
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">
                                            {event.date} • {event.location}
                                        </p>
                                        <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {event.ticketsSold}/{event.totalTickets} tickets sold
                      </span>
                                            <span
                                                className="text-green-400 font-semibold">${event.revenue} revenue</span>
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
