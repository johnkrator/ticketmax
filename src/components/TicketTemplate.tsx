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
    // Generate ticket as canvas for JPEG/PDF conversion
    static async generateCanvas(ticket: UserTicket, qrCodeDataUrl: string): Promise<HTMLCanvasElement> {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas context not available");

            // Set canvas dimensions (ticket size)
            canvas.width = 800;
            canvas.height = 600;

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "#667eea");
            gradient.addColorStop(1, "#764ba2");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw ticket background
            const ticketMargin = 40;
            const ticketWidth = canvas.width - ticketMargin * 2;
            const ticketHeight = canvas.height - ticketMargin * 2;

            // White ticket background with rounded corners
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.roundRect(ticketMargin, ticketMargin, ticketWidth, ticketHeight, 15);
            ctx.fill();

            // Add purple accent bar at top
            const accentGradient = ctx.createLinearGradient(
                ticketMargin,
                ticketMargin,
                ticketMargin + ticketWidth,
                ticketMargin,
            );
            accentGradient.addColorStop(0, "#667eea");
            accentGradient.addColorStop(1, "#764ba2");
            ctx.fillStyle = accentGradient;
            ctx.fillRect(ticketMargin, ticketMargin, ticketWidth, 8);

            // Load and draw QR code
            const qrImage = new Image();
            qrImage.crossOrigin = "anonymous";
            qrImage.onload = () => {
                // Draw QR code
                const qrSize = 140;
                const qrX = canvas.width - ticketMargin - qrSize - 30;
                const qrY = ticketMargin + 80;

                // QR code border
                ctx.fillStyle = "#e2e8f0";
                ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

                ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

                // Draw text content
                ctx.fillStyle = "#2d3748";

                // Event title
                ctx.font = "bold 32px Arial, sans-serif";
                ctx.fillText(ticket.eventTitle, ticketMargin + 30, ticketMargin + 60);

                // Ticket number
                ctx.font = "14px Arial, sans-serif";
                ctx.fillStyle = "#718096";
                ctx.fillText(`Ticket #${ticket.ticketNumber}`, ticketMargin + 30, ticketMargin + 85);

                // Dashed line separator
                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = "#ddd";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(ticketMargin + 30, ticketMargin + 110);
                ctx.lineTo(canvas.width - ticketMargin - 30, ticketMargin + 110);
                ctx.stroke();
                ctx.setLineDash([]);

                // Ticket details
                const details = [
                    {label: "Date:", value: ticket.date},
                    {label: "Location:", value: ticket.location},
                    {label: "Ticket Type:", value: ticket.ticketType},
                    {label: "Quantity:", value: `${ticket.quantity} ticket${ticket.quantity > 1 ? "s" : ""}`},
                    {label: "Status:", value: ticket.status.toUpperCase()},
                ];

                let yPos = ticketMargin + 150;
                details.forEach((detail) => {
                    // Label
                    ctx.font = "bold 16px Arial, sans-serif";
                    ctx.fillStyle = "#4a5568";
                    ctx.fillText(detail.label, ticketMargin + 30, yPos);

                    // Value
                    ctx.font = "16px Arial, sans-serif";
                    ctx.fillStyle = detail.label === "Status:" ? "#38a169" : "#2d3748";
                    ctx.fillText(detail.value, ticketMargin + 150, yPos);

                    yPos += 35;
                });

                // QR code label
                ctx.font = "12px Arial, sans-serif";
                ctx.fillStyle = "#718096";
                ctx.textAlign = "center";
                ctx.fillText("Scan to verify ticket", qrX + qrSize / 2, qrY + qrSize + 20);
                ctx.textAlign = "left";

                // Footer
                const footerY = canvas.height - ticketMargin - 60;

                // Footer separator line
                ctx.strokeStyle = "#e2e8f0";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(ticketMargin + 30, footerY - 20);
                ctx.lineTo(canvas.width - ticketMargin - 30, footerY - 20);
                ctx.stroke();

                // Brand name
                ctx.font = "bold 20px Arial, sans-serif";
                ctx.fillStyle = "#667eea";
                ctx.textAlign = "center";
                ctx.fillText("TicketProMax", canvas.width / 2, footerY);

                // Footer text
                ctx.font = "13px Arial, sans-serif";
                ctx.fillStyle = "#718096";
                ctx.fillText("Digital Ticket Platform", canvas.width / 2, footerY + 20);
                ctx.fillText("Keep this ticket safe and present it at the event entrance", canvas.width / 2, footerY + 35);

                ctx.textAlign = "left";
                resolve(canvas);
            };

            qrImage.onerror = () => {
                console.error("Failed to load QR code image");
                resolve(canvas); // Return canvas without QR code
            };

            qrImage.src = qrCodeDataUrl;
        });
    }

    // Download ticket as JPEG
    static async downloadAsJPEG(ticket: UserTicket, qrCodeDataUrl: string): Promise<void> {
        try {
            const canvas = await this.generateCanvas(ticket, qrCodeDataUrl);

            // Convert canvas to JPEG blob
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error("Failed to generate JPEG blob");
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${ticket.eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_ticket_${ticket.ticketNumber}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                },
                "image/jpeg",
                0.95,
            );
        } catch (error) {
            console.error("Error generating JPEG ticket:", error);
        }
    }

    // Download ticket as PDF using jsPDF
    static async downloadAsPDF(ticket: UserTicket, qrCodeDataUrl: string): Promise<void> {
        try {
            // Dynamically import jsPDF
            const {jsPDF} = await import("jspdf");

            const canvas = await this.generateCanvas(ticket, qrCodeDataUrl);
            const imgData = canvas.toDataURL("image/jpeg", 0.95);

            // Create PDF document
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            });

            // Calculate dimensions to fit the ticket nicely on the page
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth - 20; // 10mm margin on each side
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Center the image on the page
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;

            pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

            // Save the PDF
            pdf.save(`${ticket.eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_ticket_${ticket.ticketNumber}.pdf`);
        } catch (error) {
            console.error("Error generating PDF ticket:", error);
            // Fallback to JPEG if PDF generation fails
            console.log("Falling back to JPEG download...");
            await this.downloadAsJPEG(ticket, qrCodeDataUrl);
        }
    }

    // Legacy HTML generation (keeping for backward compatibility)
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

    // Legacy download method (keeping for backward compatibility)
    static downloadTicket(ticket: UserTicket, ticketHTML: string): void {
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


// interface UserTicket {
//     id: number;
//     eventTitle: string;
//     date: string;
//     location: string;
//     ticketType: string;
//     quantity: number;
//     status: string;
//     ticketNumber: string;
//     qrData: string;
// }
//
// export class TicketTemplate {
//     static generate(ticket: UserTicket, qrCodeDataUrl: string): string {
//         return `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Ticket - ${ticket.eventTitle}</title>
//           <style>
//               * { margin: 0; padding: 0; box-sizing: border-box; }
//               body {
//                   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                   min-height: 100vh;
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                   padding: 20px;
//               }
//               .ticket {
//                   background: white;
//                   border-radius: 15px;
//                   padding: 30px;
//                   max-width: 650px;
//                   width: 100%;
//                   box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//                   position: relative;
//                   overflow: hidden;
//               }
//               .ticket::before {
//                   content: '';
//                   position: absolute;
//                   top: 0;
//                   left: 0;
//                   right: 0;
//                   height: 5px;
//                   background: linear-gradient(90deg, #667eea, #764ba2);
//               }
//               .header {
//                   text-align: center;
//                   border-bottom: 2px dashed #ddd;
//                   padding-bottom: 25px;
//                   margin-bottom: 25px;
//               }
//               .event-title {
//                   font-size: 28px;
//                   font-weight: bold;
//                   color: #2d3748;
//                   margin-bottom: 8px;
//                   line-height: 1.2;
//               }
//               .ticket-number {
//                   font-size: 14px;
//                   color: #718096;
//                   font-weight: 500;
//                   letter-spacing: 1px;
//               }
//               .content {
//                   display: flex;
//                   gap: 30px;
//                   align-items: flex-start;
//               }
//               .info {
//                   flex: 1;
//               }
//               .qr-section {
//                   text-align: center;
//                   flex-shrink: 0;
//               }
//               .qr-code img {
//                   border: 2px solid #e2e8f0;
//                   border-radius: 8px;
//                   display: block;
//               }
//               .qr-label {
//                   margin-top: 12px;
//                   font-size: 12px;
//                   color: #718096;
//                   font-weight: 500;
//               }
//               .detail-row {
//                   margin-bottom: 16px;
//                   display: flex;
//                   align-items: center;
//               }
//               .label {
//                   font-weight: 600;
//                   color: #4a5568;
//                   min-width: 120px;
//                   font-size: 14px;
//               }
//               .value {
//                   color: #2d3748;
//                   font-size: 16px;
//                   font-weight: 500;
//               }
//               .status-confirmed {
//                   color: #38a169;
//                   font-weight: bold;
//                   text-transform: uppercase;
//                   font-size: 14px;
//                   letter-spacing: 0.5px;
//               }
//               .footer {
//                   text-align: center;
//                   margin-top: 30px;
//                   padding-top: 25px;
//                   border-top: 1px solid #e2e8f0;
//               }
//               .footer-brand {
//                   font-size: 18px;
//                   font-weight: bold;
//                   color: #667eea;
//                   margin-bottom: 8px;
//               }
//               .footer-text {
//                   color: #718096;
//                   font-size: 13px;
//                   line-height: 1.4;
//               }
//               @media print {
//                   body { background: white; }
//                   .ticket { box-shadow: none; border: 1px solid #ddd; }
//               }
//           </style>
//       </head>
//       <body>
//           <div class="ticket">
//               <div class="header">
//                   <h1 class="event-title">${ticket.eventTitle}</h1>
//                   <div class="ticket-number">Ticket #${ticket.ticketNumber}</div>
//               </div>
//               <div class="content">
//                   <div class="info">
//                       <div class="detail-row">
//                           <span class="label">Date:</span>
//                           <span class="value">${ticket.date}</span>
//                       </div>
//                       <div class="detail-row">
//                           <span class="label">Location:</span>
//                           <span class="value">${ticket.location}</span>
//                       </div>
//                       <div class="detail-row">
//                           <span class="label">Ticket Type:</span>
//                           <span class="value">${ticket.ticketType}</span>
//                       </div>
//                       <div class="detail-row">
//                           <span class="label">Quantity:</span>
//                           <span class="value">${ticket.quantity} ticket${ticket.quantity > 1 ? "s" : ""}</span>
//                       </div>
//                       <div class="detail-row">
//                           <span class="label">Status:</span>
//                           <span class="value status-confirmed">${ticket.status}</span>
//                       </div>
//                   </div>
//                   <div class="qr-section">
//                       <div class="qr-code">
//                           <img src="${qrCodeDataUrl}" alt="QR Code" width="160" height="160">
//                       </div>
//                       <div class="qr-label">Scan to verify ticket</div>
//                   </div>
//               </div>
//               <div class="footer">
//                   <div class="footer-brand">TicketProMax</div>
//                   <div class="footer-text">
//                       Digital Ticket Platform<br>
//                       Keep this ticket safe and present it at the event entrance
//                   </div>
//               </div>
//           </div>
//       </body>
//       </html>
//     `;
//     }
//
//     static downloadTicket(ticket: UserTicket, ticketHTML: string): void {
//         // Create and download the file
//         const blob = new Blob([ticketHTML], {type: "text/html"});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${ticket.eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_ticket_${ticket.ticketNumber}.html`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     }
// }
