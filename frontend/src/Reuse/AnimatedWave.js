import React, { useEffect, useRef } from "react";

function AnimatedWave({
    speed = 0.75,
    amplitude = 1,
    frequency = 20,
    className,
}) {
    const pathRef = useRef(null);

    useEffect(() => {
        const svgContainer = pathRef.current.closest("svg");
        const svgWidth = svgContainer.clientWidth;
        const svgHeight = svgContainer.clientHeight;

        let xs = [];
        for (var i = 6; i <= svgWidth - 15; i++) {
            xs.push(i);
        }

        let t = 0;

        function animate() {
            if (pathRef.current) {
                // Check if pathRef.current is not null
                let points = xs.map((x) => {
                    let y =
                        amplitude * Math.sin((x + t) / frequency) +
                        svgHeight / 2;
                    return [x, y];
                });

                let path =
                    "M" +
                    points
                        .map((p) => {
                            return p[0] + "," + p[1];
                        })
                        .join(" L");

                pathRef.current.setAttribute("d", path);
            }

            t += speed;

            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup function
        return () => {
            // Add cleanup logic if needed
        };
    }, [speed, amplitude, frequency]); // Include variables as dependencies

    return (
        <svg className={`animated-wave ${className}`}>
            <path ref={pathRef} />
        </svg>
    );
}

export default AnimatedWave;
