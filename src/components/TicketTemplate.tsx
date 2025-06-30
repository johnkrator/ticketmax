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

export class TicketTemplate {
    static generate(ticket: UserTicket, qrCodeDataUrl: string): string {
        return `
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
                  <div class="footer-brand">TicketProMax</div>
                  <div class="footer-text">
                      Digital Ticket Platform<br>
                      Keep this ticket safe and present it at the event entrance
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;
    }

    static downloadTicket(ticket: UserTicket, ticketHTML: string): void {
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
    }
}
