import { Canvas, Circle, createCanvas } from "@lib/canvas";
import { useRef, useEffect } from "react";

const Backdrop = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = createCanvas();
    containerRef.current?.appendChild(canvas.htmlElement);
    canvas.constrainSize(canvas.htmlElement.parentNode as HTMLElement);

    const maxRadius = 5;
    const color = "#000000";
    const density = () => {
      return (canvas.htmlElement.width * canvas.htmlElement.height) / 3500;
    };

    const createCircles = (amount: number, radius: number) => {
      for (let i = 0; i < amount; i++) {
        const x =
          Math.random() * canvas.htmlElement.width + radius * 2 - radius;
        const y =
          Math.random() * canvas.htmlElement.height + radius * 2 - radius;
        const circle = new Circle({
          x: x,
          y: y,
          dx: Math.random() - 0.5,
          dy: Math.random() - 0.5,
          radius: radius,
          color: color,
          increase: true,
        });
        canvas.addCircle(circle);
      }
    };

    canvas.animate((canvas: Canvas, context: CanvasRenderingContext2D) => {
      const particles = canvas.circles;
      context.fillStyle = "rgb(255,255,255,0.5)";
      context.fillRect(
        0,
        0,
        canvas.htmlElement.width,
        canvas.htmlElement.height
      );

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        a.x += a.dx;
        a.y += a.dy;

        if (a.increase) {
          a.radius += 0.03;
        } else {
          a.radius -= 0.03;
        }

        if (a.radius >= maxRadius) {
          a.increase = false;
        }

        if (a.radius <= 0) {
          particles.splice(i, 1);
        }

        for (let j = i; j < particles.length; j++) {
          const b = particles[j];
          let rx = a.x - b.x;
          let ry = a.y - b.y;
          let distance = Math.sqrt(rx * rx + ry * ry);
          if (distance < 75) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = a.color;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        if (a.x + a.radius > canvas.htmlElement.width || a.x - a.radius < 0) {
          a.dx *= -1;
        }
        if (a.y + a.radius > canvas.htmlElement.height || a.y - a.radius < 0) {
          a.dy *= -1;
        }
      }
    });

    for (let i = 0; i < 3; i++) {
      setInterval(() => {
        if (canvas.circles.length <= density()) {
          createCircles(2, 0);
        }
      }, i * 20 + 150);
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default Backdrop;
