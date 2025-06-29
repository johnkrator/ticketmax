
import { Link } from 'react-router-dom';
import FloatingShapes from '@/components/FloatingShapes';
import QRScanner from '@/components/QRScanner';

const TicketVerification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <FloatingShapes />
      
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            TicketVerse
          </Link>
        </div>
      </nav>

      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Ticket Verification</h1>
            <p className="text-xl text-gray-300">
              Scan QR codes to verify ticket authenticity
            </p>
          </div>

          <QRScanner />
        </div>
      </div>
    </div>
  );
};

export default TicketVerification;
