import {useEffect, useState} from "react";

interface Shape {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
    shape: "circle" | "polygon";
}

const FloatingShapes = () => {
    const [shapes, setShapes] = useState<Shape[]>([]);

    useEffect(() => {
        const generateShapes = () => {
            const newShapes: Shape[] = [];
            for (let i = 0; i < 15; i++) {
                newShapes.push({
                    id: i,
                    size: Math.random() * 100 + 50,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    duration: Math.random() * 20 + 10,
                    delay: Math.random() * 10,
                    opacity: Math.random() * 0.3 + 0.1,
                    shape: Math.random() > 0.5 ? "circle" : "polygon"
                });
            }
            setShapes(newShapes);
        };

        generateShapes();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape) => (
                <div
                    key={shape.id}
                    className={`absolute animate-float ${
                        shape.shape === "circle"
                            ? "rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    }`}
                    style={{
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        opacity: shape.opacity,
                        animation: `float ${shape.duration}s ease-in-out infinite`,
                        animationDelay: `${shape.delay}s`,
                        clipPath: shape.shape === "polygon"
                            ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                            : "none"
                    }}
                />
            ))}

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"/>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
                 style={{animationDelay: "2s"}}/>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
                style={{animationDelay: "4s"}}/>
        </div>
    );
};

export default FloatingShapes;