"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "@/stores/editorStore";

const STAGE_WIDTH = 480;
const STAGE_HEIGHT = 360;
const SPRITE_SIZE = 40;

export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprites = useEditorStore((s) => s.stage.sprites);
  const background = useEditorStore((s) => s.stage.background);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

      // Background
      const bgColors: Record<string, string> = {
        default: "#E8F5E9",
        garden: "#C8E6C9",
        space: "#1A237E",
        ocean: "#E3F2FD",
      };
      ctx.fillStyle = bgColors[background] || bgColors.default;
      ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

      // Grid dots
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (let x = 0; x < STAGE_WIDTH; x += 40) {
        for (let y = 0; y < STAGE_HEIGHT; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Sprites
      for (const sprite of sprites) {
        if (!sprite.visible) continue;

        ctx.save();
        ctx.translate(sprite.x, sprite.y);
        ctx.rotate((sprite.rotation * Math.PI) / 180);
        ctx.scale(sprite.scale, sprite.scale);

        // Draw CoCo as a colorful chameleon shape
        const size = SPRITE_SIZE;

        // Body
        ctx.fillStyle = "#4CAF50";
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.6, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = "#66BB6A";
        ctx.beginPath();
        ctx.arc(size * 0.45, -size * 0.05, size * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(size * 0.52, -size * 0.12, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(size * 0.55, -size * 0.12, size * 0.06, 0, Math.PI * 2);
        ctx.fill();

        // Tail curl
        ctx.strokeStyle = "#388E3C";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(-size * 0.5, size * 0.15, size * 0.2, 0, Math.PI * 1.5);
        ctx.stroke();

        // Feet
        ctx.fillStyle = "#388E3C";
        ctx.beginPath();
        ctx.ellipse(-size * 0.2, size * 0.35, size * 0.1, size * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(size * 0.2, size * 0.35, size * 0.1, size * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Speech bubble
        if (sprite.sayText) {
          const bubbleX = sprite.x + size * 0.5;
          const bubbleY = sprite.y - size * 0.8;
          const padding = 8;
          const textWidth = ctx.measureText(sprite.sayText).width;
          const bubbleWidth = Math.max(textWidth + padding * 2, 60);
          const bubbleHeight = 30;

          ctx.fillStyle = "white";
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(
            bubbleX - bubbleWidth / 2,
            bubbleY - bubbleHeight,
            bubbleWidth,
            bubbleHeight,
            8
          );
          ctx.fill();
          ctx.stroke();

          // Bubble tail
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.moveTo(bubbleX - 5, bubbleY);
          ctx.lineTo(bubbleX + 5, bubbleY);
          ctx.lineTo(bubbleX, bubbleY + 8);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = "#333";
          ctx.font = "bold 12px Nunito, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(sprite.sayText, bubbleX, bubbleY - bubbleHeight / 2);
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sprites, background]);

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-green-200 bg-white shadow-lg">
      <canvas
        ref={canvasRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        className="w-full h-auto"
        style={{ imageRendering: "auto" }}
      />
      <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs text-gray-500 font-medium">
        Stage
      </div>
    </div>
  );
}
