
import { Search, Ticket, Calendar, QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Events",
      description: "Browse through thousands of events or search for your favorites using our smart filters.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Ticket,
      title: "Select & Book",
      description: "Choose your preferred tickets and complete your purchase with secure payment options.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: QrCode,
      title: "Get Digital Tickets",
      description: "Receive your tickets instantly via email with unique QR codes for easy entry.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Calendar,
      title: "Enjoy the Event",
      description: "Show your digital ticket at the venue and enjoy your unforgettable experience.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Getting your tickets is easier than ever. Follow these simple steps 
            to secure your spot at amazing events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center group"
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Connecting Lines */}
        <div className="hidden lg:block relative -mt-32 mb-16">
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute top-8 left-1/2 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute top-8 left-3/4 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
