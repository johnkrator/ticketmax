
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Music Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b172?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "TicketVerse made it so easy to find and book tickets for my favorite concerts. The mobile tickets are a game-changer!"
    },
    {
      name: "Michael Chen",
      role: "Event Organizer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As an event organizer, TicketVerse has streamlined our entire ticketing process. The analytics and QR scanning features are fantastic."
    },
    {
      name: "Emma Davis",
      role: "Conference Attendee",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I love how I can transfer tickets to friends and get instant confirmation. The user experience is incredibly smooth."
    }
  ];

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TicketVerse 
            for their event ticketing needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-purple-400/30" />
                  <p className="text-gray-300 italic leading-relaxed pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500/30"
                  />
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
