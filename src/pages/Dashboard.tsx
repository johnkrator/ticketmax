import React, {useState, useRef} from "react";
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
    Camera
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Link} from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserTicket {
    id: number;
    eventTitle: string;
    date: string;
    location: string;
    ticketType: string;
    quantity: number;
    status: string;
    ticketNumber: string;
    qrData: string;
}

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

const Dashboard: React.FC = () => {
    // Mock user data
    const [user] = useState<User>({
        id: "user123",
        name: "John Doe",
        email: "john@example.com"
    });

    // QR Scanner state
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock user's tickets
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
            qrData: "SMF2024-VIP-001-VERIFIED"
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
            qrData: "TC2024-GEN-002-VERIFIED"
        }
    ]);

    // Mock user's created events
    const [userEvents, setUserEvents] = useState<UserEvent[]>([
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

    const handleDeleteEvent = (eventId: number): void => {
        setUserEvents(userEvents.filter(event => event.id !== eventId));
    };

    // Generate proper QR Code using canvas and simple QR pattern
    const generateQRCode = (data: string): string => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";

        const size = 200;
        canvas.width = size;
        canvas.height = size;

        // Clear canvas with white background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);

        // Generate QR-like pattern based on data
        const moduleSize = 8;
        const modules = size / moduleSize;
        ctx.fillStyle = "#000000";

        // Create a more realistic QR code pattern
        for (let row = 0; row < modules; row++) {
            for (let col = 0; col < modules; col++) {
                // Position detection patterns (corners)
                if ((row < 7 && col < 7) || (row < 7 && col >= modules - 7) || (row >= modules - 7 && col < 7)) {
                    if ((row === 0 || row === 6 || col === 0 || col === 6) ||
                        (row >= 2 && row <= 4 && col >= 2 && col <= 4)) {
                        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
                    }
                }
                // Data modules based on input string
                else if (row > 8 && col > 8 && row < modules - 9 && col < modules - 9) {
                    const hash = (data.charCodeAt((row * col) % data.length) + row + col) % 3;
                    if (hash === 0) {
                        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
                    }
                }
                // Timing patterns
                else if ((row === 6 && col > 7 && col < modules - 8) || (col === 6 && row > 7 && row < modules - 8)) {
                    if ((row + col) % 2 === 0) {
                        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
                    }
                }
            }
        }

        return canvas.toDataURL();
    };

    // Download ticket as HTML file
    const downloadTicket = (ticket: UserTicket): void => {
        const qrCodeDataUrl = generateQRCode(ticket.qrData);

        // Create a professional ticket HTML
        const ticketHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ticket - ${ticket.eventTitle}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    }
                    .ticket { 
                        background: white; 
                        border-radius: 15px; 
                        padding: 30px; 
                        max-width: 650px; 
                        width: 100%;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        position: relative;
                        overflow: hidden;
                    }
                    .ticket::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 5px;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                    }
                    .header { 
                        text-align: center; 
                        border-bottom: 2px dashed #ddd; 
                        padding-bottom: 25px; 
                        margin-bottom: 25px; 
                    }
                    .event-title { 
                        font-size: 28px; 
                        font-weight: bold; 
                        color: #2d3748; 
                        margin-bottom: 8px; 
                        line-height: 1.2;
                    }
                    .ticket-number {
                        font-size: 14px;
                        color: #718096;
                        font-weight: 500;
                        letter-spacing: 1px;
                    }
                    .content { 
                        display: flex; 
                        gap: 30px; 
                        align-items: flex-start; 
                    }
                    .info { 
                        flex: 1; 
                    }
                    .qr-section { 
                        text-align: center;
                        flex-shrink: 0;
                    }
                    .qr-code img { 
                        border: 2px solid #e2e8f0; 
                        border-radius: 8px;
                        display: block;
                    }
                    .qr-label {
                        margin-top: 12px;
                        font-size: 12px;
                        color: #718096;
                        font-weight: 500;
                    }
                    .detail-row { 
                        margin-bottom: 16px;
                        display: flex;
                        align-items: center;
                    }
                    .label { 
                        font-weight: 600; 
                        color: #4a5568;
                        min-width: 120px;
                        font-size: 14px;
                    }
                    .value { 
                        color: #2d3748;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .status-confirmed {
                        color: #38a169;
                        font-weight: bold;
                        text-transform: uppercase;
                        font-size: 14px;
                        letter-spacing: 0.5px;
                    }
                    .footer { 
                        text-align: center; 
                        margin-top: 30px; 
                        padding-top: 25px; 
                        border-top: 1px solid #e2e8f0; 
                    }
                    .footer-brand {
                        font-size: 18px;
                        font-weight: bold;
                        color: #667eea;
                        margin-bottom: 8px;
                    }
                    .footer-text {
                        color: #718096;
                        font-size: 13px;
                        line-height: 1.4;
                    }
                    @media print {
                        body { background: white; }
                        .ticket { box-shadow: none; border: 1px solid #ddd; }
                    }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <h1 class="event-title">${ticket.eventTitle}</h1>
                        <div class="ticket-number">Ticket #${ticket.ticketNumber}</div>
                    </div>
                    <div class="content">
                        <div class="info">
                            <div class="detail-row">
                                <span class="label">Date:</span>
                                <span class="value">${ticket.date}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Location:</span>
                                <span class="value">${ticket.location}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Ticket Type:</span>
                                <span class="value">${ticket.ticketType}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Quantity:</span>
                                <span class="value">${ticket.quantity} ticket${ticket.quantity > 1 ? "s" : ""}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Status:</span>
                                <span class="value status-confirmed">${ticket.status}</span>
                            </div>
                        </div>
                        <div class="qr-section">
                            <div class="qr-code">
                                <img src="${qrCodeDataUrl}" alt="QR Code" width="160" height="160">
                            </div>
                            <div class="qr-label">Scan to verify ticket</div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="footer-brand">TicketVerse</div>
                        <div class="footer-text">
                            Digital Ticket Platform<br>
                            Keep this ticket safe and present it at the event entrance
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Create and download the file
        const blob = new Blob([ticketHTML], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${ticket.eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_ticket_${ticket.ticketNumber}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // QR Code scanning functions
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
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
                const validTickets = userTickets.map(t => t.qrData);

                // Simulate different scan results based on file name or random
                const fileName = file.name.toLowerCase();
                let scannedData: string;

                if (fileName.includes("summer") || fileName.includes("music") || Math.random() > 0.5) {
                    scannedData = "SMF2024-VIP-001-VERIFIED"; // Valid ticket
                } else {
                    scannedData = "INVALID-QR-CODE"; // Invalid ticket
                }

                if (validTickets.includes(scannedData)) {
                    const ticket = userTickets.find(t => t.qrData === scannedData);
                    if (ticket) {
                        setScanResult({
                            valid: true,
                            ticketNumber: ticket.ticketNumber,
                            eventTitle: ticket.eventTitle,
                            ticketType: ticket.ticketType,
                            scannedAt: new Date().toISOString()
                        });
                    }
                } else {
                    setScanResult({
                        valid: false,
                        error: "Ticket not found or invalid QR code"
                    });
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setScanResult({
                    valid: false,
                    error: "Failed to read QR code. Please try again."
                });
            } finally {
                setIsScanning(false);
            }
        };

        reader.onerror = () => {
            setScanResult({
                valid: false,
                error: "Failed to read file. Please try again."
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

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            {/* Floating shapes background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div
                    className="absolute top-32 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div
                    className="absolute bottom-20 left-32 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/"
                          className="text-2xl cursor-pointer font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        TicketMax
                    </Link>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-300">Welcome, {user.name}</span>
                        <Button variant="ghost" className="text-white cursor-pointer hover:bg-white/10">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* My Tickets */}
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-white">My Tickets</CardTitle>
                                <Link to="/events">
                                    <Button size="sm"
                                            className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
                                        <p className="text-gray-400 text-sm mb-3">
                                            {ticket.quantity} x {ticket.ticketType} Ticket(s)
                                        </p>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                onClick={() => downloadTicket(ticket)}
                                                className="bg-[#4f3580] cursor-pointer hover:bg-[#4f3580] text-white flex-1"
                                            >
                                                <Download className="h-4 w-4 mr-2"/>
                                                Download
                                            </Button>
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
                                            <p className="text-gray-300 mb-4">
                                                Upload a QR code image to verify ticket
                                            </p>
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
                                        <div className={`p-4 rounded-lg border-2 ${
                                            scanResult.valid
                                                ? "border-green-500/30 bg-green-500/10"
                                                : "border-red-500/30 bg-red-500/10"
                                        }`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                {scanResult.valid ? (
                                                    <CheckCircle className="h-6 w-6 text-green-400"/>
                                                ) : (
                                                    <XCircle className="h-6 w-6 text-red-400"/>
                                                )}
                                                <span className={`font-semibold ${
                                                    scanResult.valid ? "text-green-400" : "text-red-400"
                                                }`}>
                                                    {scanResult.valid ? "Valid Ticket" : "Invalid Ticket"}
                                                </span>
                                            </div>

                                            {scanResult.valid && scanResult.ticketNumber && (
                                                <div className="space-y-2 text-sm text-gray-300">
                                                    <p><strong>Ticket:</strong> {scanResult.ticketNumber}</p>
                                                    <p><strong>Event:</strong> {scanResult.eventTitle}</p>
                                                    <p><strong>Type:</strong> {scanResult.ticketType}</p>
                                                    <p><strong>Verified
                                                        at:</strong> {scanResult.scannedAt ? new Date(scanResult.scannedAt).toLocaleString() : "N/A"}
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
                                            className="w-full border-white/30 text-white hover:bg-white/10"
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
                                    <Button size="sm"
                                            className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
                                                        className="text-blue-400 hover:bg-blue-500/20 hover:text-white">
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
