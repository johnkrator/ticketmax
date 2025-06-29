import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Download, Calendar, MapPin, Ticket} from "lucide-react";
import QRCode from "qrcode";
import {useEffect, useState} from "react";

interface TicketData {
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    ticketType: string;
    quantity: number;
    ticketNumber: string;
    transactionId: string;
}

interface TicketCardProps {
    ticket: TicketData;
}

const TicketCard = ({ticket}: TicketCardProps) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const qrData = JSON.stringify({
                    ticketNumber: ticket.ticketNumber,
                    eventTitle: ticket.eventTitle,
                    transactionId: ticket.transactionId,
                    valid: true
                });
                const url = await QRCode.toDataURL(qrData, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                });
                setQrCodeUrl(url);
            } catch (error) {
                console.error("Error generating QR code:", error);
            }
        };

        generateQRCode();
    }, [ticket]);

    const downloadTicket = () => {
        // Create a printable version of the ticket
        const ticketContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket - ${ticket.eventTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .ticket { border: 2px solid #333; padding: 20px; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .qr-code { text-align: center; margin: 20px 0; }
            .details { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <h1>${ticket.eventTitle}</h1>
              <h2>Ticket #${ticket.ticketNumber}</h2>
            </div>
            <div class="details">
              <p><strong>Date:</strong> ${ticket.eventDate}</p>
              <p><strong>Location:</strong> ${ticket.eventLocation}</p>
              <p><strong>Ticket Type:</strong> ${ticket.ticketType}</p>
              <p><strong>Quantity:</strong> ${ticket.quantity}</p>
              <p><strong>Transaction ID:</strong> ${ticket.transactionId}</p>
            </div>
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="QR Code" />
              <p>Scan this code for entry verification</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const blob = new Blob([ticketContent], {type: "text/html"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ticket-${ticket.ticketNumber}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Ticket className="h-5 w-5 text-purple-400"/>
                            <span className="text-sm text-gray-400">Ticket #{ticket.ticketNumber}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4">{ticket.eventTitle}</h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-300">
                                <Calendar className="h-4 w-4 mr-2 text-purple-400"/>
                                <span className="text-sm">{ticket.eventDate}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <MapPin className="h-4 w-4 mr-2 text-purple-400"/>
                                <span className="text-sm">{ticket.eventLocation}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {ticket.ticketType}
              </span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Qty: {ticket.quantity}
              </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="bg-white p-3 rounded-lg">
                            {qrCodeUrl && (
                                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32"/>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                            Scan for verification
                        </p>
                        <Button
                            onClick={downloadTicket}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            <Download className="h-4 w-4 mr-2"/>
                            Download
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
