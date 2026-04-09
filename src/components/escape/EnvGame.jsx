import { useEffect, useRef } from 'react';

// Resources the player can drag onto the right pan
const TOOLS = [
  { label: '💧 Water',  emoji: '💧', weight: 1.2 },
  { label: '🌳 Tree',   emoji: '🌳', weight: 1.0 },
  { label: '🌂 Shade',  emoji: '🌂', weight: 0.9 },
  { label: '❄ Cool',   emoji: '❄',  weight: 1.1 },
  { label: '🌱 Moss',   emoji: '🌱', weight: 0.7 },
];

// Initial heat load — beam starts dramatically tilted left
const INITIAL_HEAT = 4.5;
const WIN_HEALTH = 80;
const PIVOT_X = 220;
const PIVOT_Y = 100;
const ARM_LEN = 155;

export default function EnvGame({ color, onProgress, onWin }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    tilt: 0.48,       // start visibly tilted left (heat side)
    health: 0,
    heatWeight: INITIAL_HEAT,
    tools: [],        // tools dropped on right pan
    dragTool: null,
    won: false,
    frame: 0,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    const PAL_Y = 200;
    const PAL_W = 68;

    function draw() {
      if (s.won) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background — hot reddish tint that cools as balance improves
      const hotness = Math.max(0, s.tilt / 0.5);
      const r = Math.round(14 + hotness * 30);
      const g = Math.round(14 + (1 - hotness) * 10);
      ctx.fillStyle = `rgb(${r},${g},24)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      s.frame++;

      // Heat slowly increases over time (pressure mounts)
      if (s.frame % 180 === 0) {
        s.heatWeight = Math.min(6.0, s.heatWeight + 0.2);
      }

      const rightWeight = s.tools.reduce((sum, t) => sum + t.weight, 0);
      const targetTilt = (s.heatWeight - rightWeight) * 0.06;
      // Clamp tilt
      const clampedTarget = Math.max(-0.5, Math.min(0.5, targetTilt));
      s.tilt += (clampedTarget - s.tilt) * 0.04;

      const balanced = Math.abs(s.tilt) < 0.1;

      if (balanced) {
        s.health = Math.min(WIN_HEALTH, s.health + 0.7);
        onProgress(
          Math.round((s.health / WIN_HEALTH) * 100),
          'Balance held! Keep the resources on the scale…'
        );
        if (s.health >= WIN_HEALTH) {
          s.won = true;
          onWin('Ecological balance restored. Heat neutralised. The city breathes again.');
          return;
        }
      } else {
        s.health = Math.max(0, s.health - 0.3);
        const toolsNeeded = Math.ceil(s.heatWeight - rightWeight);
        onProgress(
          Math.round((s.health / WIN_HEALTH) * 100),
          s.tilt > 0.1
            ? `Heat is overwhelming — drag ${toolsNeeded > 0 ? toolsNeeded + ' more' : ''} resources onto the scale`
            : 'Too many resources — remove some'
        );
      }

      // ── Draw the scale ──
      const tiltAngle = Math.max(-0.5, Math.min(0.5, s.tilt));
      const beamColor = tiltAngle > 0.25 ? '#e8593c'
        : tiltAngle > 0.1 ? '#EF9F27'
        : color;

      // Stand
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(PIVOT_X - 3, PIVOT_Y, 6, 80);
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(PIVOT_X - 20, PIVOT_Y + 75, 40, 6);

      ctx.save();
      ctx.translate(PIVOT_X, PIVOT_Y);
      ctx.rotate(tiltAngle);

      // Beam
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-ARM_LEN, 0); ctx.lineTo(ARM_LEN, 0);
      ctx.stroke();

      // ── Left pan: HEAT ──
      ctx.strokeStyle = '#e8593c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-ARM_LEN, 2); ctx.lineTo(-ARM_LEN, 42);
      ctx.stroke();

      const leftPanW = 80;
      const leftPanH = 36;
      ctx.fillStyle = 'rgba(232,89,60,0.2)';
      ctx.strokeStyle = '#e8593c';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(-ARM_LEN - leftPanW / 2, 42, leftPanW, leftPanH, 4);
      ctx.fill(); ctx.stroke();

      // Heat label + flame icons
      ctx.fillStyle = '#ff6b4a';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔥 EXTREME HEAT', -ARM_LEN, 56);
      ctx.fillStyle = 'rgba(255,107,74,0.7)';
      ctx.font = '9px monospace';
      ctx.fillText(`load: ${s.heatWeight.toFixed(1)}`, -ARM_LEN, 70);
      ctx.textAlign = 'left';

      // ── Right pan: RESOURCES ──
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ARM_LEN, 2); ctx.lineTo(ARM_LEN, 42);
      ctx.stroke();

      const rightPanW = 80;
      const rightPanH = 36 + Math.min(s.tools.length, 4) * 8;
      ctx.fillStyle = `rgba(0,0,0,0.25)`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(ARM_LEN - rightPanW / 2, 42, rightPanW, rightPanH, 4);
      ctx.fill(); ctx.stroke();

      if (s.tools.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('empty', ARM_LEN, 62);
        ctx.textAlign = 'left';
      } else {
        s.tools.forEach((t, i) => {
          ctx.font = '11px sans-serif';
          ctx.fillText(t.emoji, ARM_LEN - 28 + (i % 4) * 17, 58 + Math.floor(i / 4) * 16);
        });
      }

      ctx.restore();

      // Pivot circle
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(PIVOT_X, PIVOT_Y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Balance indicator line
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(PIVOT_X, PIVOT_Y - 20); ctx.lineTo(PIVOT_X, PIVOT_Y + 10);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Palette at bottom ──
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(0, PAL_Y - 14, canvas.width, canvas.height - PAL_Y + 14);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = '8px monospace';
      ctx.fillText('DRAG RESOURCES TO SCALE →', 10, PAL_Y - 2);

      TOOLS.forEach((tool, i) => {
        const px = 8 + i * PAL_W;
        const py = PAL_Y + 2;
        const isBeingDragged = s.dragTool && s.dragTool.label === tool.label;

        ctx.globalAlpha = isBeingDragged ? 0.4 : 1;
        ctx.fillStyle = 'rgba(255,255,255,0.07)';
        ctx.strokeStyle = `${color}88`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.roundRect(px, py, PAL_W - 4, 32, 4);
        ctx.fill(); ctx.stroke();

        ctx.font = '14px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillText(tool.emoji, px + 6, py + 20);
        ctx.font = '7px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(tool.label.split(' ')[1], px + 24, py + 12);
        ctx.fillText(`w:${tool.weight}`, px + 24, py + 22);
        ctx.globalAlpha = 1;
      });

      // Drag preview
      if (s.dragTool) {
        ctx.globalAlpha = 0.85;
        ctx.font = '18px sans-serif';
        ctx.fillText(s.dragTool.emoji, s.dragTool.x - 10, s.dragTool.y + 6);
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }

    function onDown(e) {
      const { x, y } = getPos(e);
      TOOLS.forEach((tool, i) => {
        const px = 8 + i * PAL_W;
        const py = PAL_Y + 2;
        if (x >= px && x <= px + PAL_W - 4 && y >= py && y <= py + 32) {
          s.dragTool = { ...tool, x, y };
        }
      });
    }
    function onMove(e) {
      if (!s.dragTool) return;
      const { x, y } = getPos(e);
      s.dragTool.x = x; s.dragTool.y = y;
    }
    function onUp(e) {
      if (!s.dragTool) return;
      const { x, y } = getPos(e);
      // Drop on right side of scale (right pan area, above palette)
      if (x > PIVOT_X && y < PAL_Y - 10) {
        s.tools.push({ ...s.dragTool });
      }
      s.dragTool = null;
    }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onUp);
    };
  }, [color, onProgress, onWin]);

  return (
    <div className="game-canvas-wrap">
      <p className="game-instruction">
        Extreme heat has tipped the scale. Drag water, trees, and shade onto the right pan to restore balance.
      </p>
      <canvas
        ref={canvasRef}
        width={440}
        height={240}
        className="game-canvas"
        style={{ cursor: 'grab' }}
      />
    </div>
  );
}
