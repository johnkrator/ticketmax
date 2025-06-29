
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, CheckCircle, XCircle, Camera } from 'lucide-react';
import { toast } from 'sonner';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For demo purposes, we'll simulate QR code reading
    // In a real implementation, you'd use a QR code reading library
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Simulate parsing QR code data
        const mockTicketData = {
          ticketNumber: 'TK-' + Math.random().toString(36).substr(2, 9),
          eventTitle: 'Summer Music Festival 2024',
          transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9),
          valid: true,
          scannedAt: new Date().toISOString()
        };
        
        setScanResult(mockTicketData);
        toast.success('Ticket verified successfully!');
      } catch (error) {
        setScanResult({ valid: false, error: 'Invalid QR code' });
        toast.error('Invalid QR code');
      }
    };
    reader.readAsDataURL(file);
  };

  const startScanning = () => {
    setIsScanning(true);
    fileInputRef.current?.click();
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <QrCode className="h-6 w-6" />
          Ticket Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!scanResult ? (
          <div className="text-center space-y-4">
            <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8">
              <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-4">
                Upload or scan a QR code to verify ticket
              </p>
              <Button
                onClick={startScanning}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Camera className="h-4 w-4 mr-2" />
                Upload QR Code
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
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-red-500/30 bg-red-500/10'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {scanResult.valid ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <span className={`font-semibold ${
                  scanResult.valid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
                </span>
              </div>
              
              {scanResult.valid && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Ticket:</strong> {scanResult.ticketNumber}</p>
                  <p><strong>Event:</strong> {scanResult.eventTitle}</p>
                  <p><strong>Transaction:</strong> {scanResult.transactionId}</p>
                  <p><strong>Verified at:</strong> {new Date(scanResult.scannedAt).toLocaleString()}</p>
                </div>
              )}
              
              {!scanResult.valid && (
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
  );
};

export default QRScanner;
