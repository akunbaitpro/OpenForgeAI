
import React, { useEffect, useRef } from 'react';

const AITechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      connections: number[];
    }> = [];

    // Data particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }> = [];

    // Circuit lines
    const circuits: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      speed: number;
    }> = [];

    // Initialize neural network nodes
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        pulse: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        life: Math.random() * 100 + 50
      });
    }

    // Initialize circuit lines
    for (let i = 0; i < 20; i++) {
      circuits.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: 0,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = 'rgba(6, 6, 6, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw neural network nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.1;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections to nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const opacity = (100 - distance) / 100 * 0.3;
              ctx.strokeStyle = `rgba(0, 102, 223, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        const pulseSize = node.size + Math.sin(node.pulse) * 0.5;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2);
        gradient.addColorStop(0, 'rgba(0, 102, 223, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 102, 223, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0066DF';
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw data particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = Math.random() * 100 + 50;
        }

        const alpha = (particle.life / 150) * particle.opacity;
        ctx.fillStyle = `rgba(130, 150, 187, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw circuit lines
      circuits.forEach((circuit) => {
        circuit.progress += circuit.speed;
        if (circuit.progress > 1) {
          circuit.progress = 0;
          circuit.x1 = Math.random() * canvas.width;
          circuit.y1 = Math.random() * canvas.height;
          circuit.x2 = Math.random() * canvas.width;
          circuit.y2 = Math.random() * canvas.height;
        }

        const currentX = circuit.x1 + (circuit.x2 - circuit.x1) * circuit.progress;
        const currentY = circuit.y1 + (circuit.y2 - circuit.y1) * circuit.progress;

        // Draw fading trail
        const trailLength = 20;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, circuit.progress - (i * 0.01));
          const trailX = circuit.x1 + (circuit.x2 - circuit.x1) * trailProgress;
          const trailY = circuit.y1 + (circuit.y2 - circuit.y1) * trailProgress;
          const alpha = (trailLength - i) / trailLength * 0.3;
          
          ctx.fillStyle = `rgba(0, 102, 223, ${alpha})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

export default AITechBackground;
