import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FloatingShapes from "@/components/FloatingShapes";

const Home = () => {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            {/* Hero Section */}
            <HeroSection/>

            {/* Featured Events */}
            <FeaturedEvents/>

            {/* How It Works */}
            <HowItWorks/>

            {/* Testimonials */}
            <Testimonials/>
        </div>
    );
};

export default Home;
