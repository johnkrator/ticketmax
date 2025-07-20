import {useEffect, useState} from "react";

interface Shape {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
    shape: "circle" | "polygon" | "triangle" | "hexagon";
    color: "purple" | "pink" | "blue" | "indigo" | "cyan";
    rotationSpeed: number;
    floatDirection: "up" | "down" | "left" | "right" | "diagonal";
}

const FloatingShapes = () => {
    const [shapes, setShapes] = useState<Shape[]>([]);

    useEffect(() => {
        const generateShapes = () => {
            const newShapes: Shape[] = [];
            const shapeTypes: Shape["shape"][] = ["circle", "polygon", "triangle", "hexagon"];
            const colors: Shape["color"][] = ["purple", "pink", "blue", "indigo", "cyan"];
            const directions: Shape["floatDirection"][] = ["up", "down", "left", "right", "diagonal"];

            for (let i = 0; i < 20; i++) {
                newShapes.push({
                    id: i,
                    size: Math.random() * 120 + 30,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    duration: Math.random() * 25 + 15,
                    delay: Math.random() * 15,
                    opacity: Math.random() * 0.4 + 0.05,
                    shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotationSpeed: Math.random() * 30 + 10,
                    floatDirection: directions[Math.floor(Math.random() * directions.length)]
                });
            }
            setShapes(newShapes);
        };

        generateShapes();

        // Regenerate shapes periodically for dynamic effect
        const interval = setInterval(generateShapes, 60000); // Every minute

        return () => clearInterval(interval);
    }, []);

    const getShapeClipPath = (shape: Shape["shape"]) => {
        switch (shape) {
            case "triangle":
                return "polygon(50% 0%, 0% 100%, 100% 100%)";
            case "hexagon":
                return "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
            case "polygon":
                return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
            default:
                return "none";
        }
    };

    const getColorGradient = (color: Shape["color"]) => {
        switch (color) {
            case "purple":
                return "from-purple-500/20 to-purple-600/10";
            case "pink":
                return "from-pink-500/20 to-rose-600/10";
            case "blue":
                return "from-blue-500/20 to-blue-600/10";
            case "indigo":
                return "from-indigo-500/20 to-indigo-600/10";
            case "cyan":
                return "from-cyan-500/20 to-teal-600/10";
            default:
                return "from-purple-500/20 to-pink-500/10";
        }
    };

    const getAnimationClass = (direction: Shape["floatDirection"]) => {
        switch (direction) {
            case "up":
                return "animate-float-up";
            case "down":
                return "animate-float-down";
            case "left":
                return "animate-float-left";
            case "right":
                return "animate-float-right";
            case "diagonal":
                return "animate-float-diagonal";
            default:
                return "animate-float";
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated Background Shapes */}
            {shapes.map((shape) => (
                <div
                    key={shape.id}
                    className={`absolute ${getAnimationClass(shape.floatDirection)} ${
                        shape.shape === "circle" ? "rounded-full" : ""
                    } bg-gradient-to-r ${getColorGradient(shape.color)} backdrop-blur-sm`}
                    style={{
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        opacity: shape.opacity,
                        animation: `${getAnimationClass(shape.floatDirection).replace("animate-", "")} ${shape.duration}s ease-in-out infinite, rotate-gentle ${shape.rotationSpeed}s linear infinite`,
                        animationDelay: `${shape.delay}s`,
                        clipPath: getShapeClipPath(shape.shape),
                        transform: `rotate(${Math.random() * 360}deg)`,
                        zIndex: -1,
                    }}
                />
            ))}

            {/* Large Gradient Orbs with Enhanced Animation - More visible */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/12 rounded-full blur-3xl animate-pulse-slow animate-drift-1"
                style={{zIndex: -1}}/>
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/12 rounded-full blur-3xl animate-pulse-slow animate-drift-2"
                style={{animationDelay: "3s", zIndex: -1}}/>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/12 rounded-full blur-3xl animate-pulse-slow animate-drift-3"
                style={{animationDelay: "6s", zIndex: -1}}/>
            <div
                className="absolute top-3/4 left-1/8 w-64 h-64 bg-indigo-600/12 rounded-full blur-3xl animate-pulse-slow animate-drift-4"
                style={{animationDelay: "9s", zIndex: -1}}/>
            <div
                className="absolute top-1/8 right-1/8 w-88 h-88 bg-cyan-600/12 rounded-full blur-3xl animate-pulse-slow animate-drift-5"
                style={{animationDelay: "12s", zIndex: -1}}/>

            {/* Enhanced Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{zIndex: -2}}>
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                        animation: "drift-bg 120s ease-in-out infinite"
                    }}
                />
            </div>

            {/* Additional animated particles for more visual impact */}
            <div className="absolute inset-0" style={{zIndex: -1}}>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FloatingShapes;