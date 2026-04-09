import { useEffect, useRef } from 'react';

const TARGET_MIN = 20;
const TARGET_MAX = 25;

export default function PeopleGame({ color, onProgress, onWin }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ people: [], won: false });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    // Start with empty square — player must click to add everyone
    s.people = [];

    function draw() {
      if (s.won) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background — empty plaza feel
      ctx.fillStyle = '#0e0e18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground line
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 30);
      ctx.lineTo(canvas.width, canvas.height - 30);
      ctx.stroke();

      // Draw people — permanent, no decay
      s.people.forEach((p, idx) => {
        ctx.globalAlpha = 1;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;

        // Head
        ctx.beginPath();
        ctx.arc(p.x, p.y - 10, 5, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 5);
        ctx.lineTo(p.x, p.y + 8);
        // Arms
        ctx.moveTo(p.x - 6, p.y);
        ctx.lineTo(p.x + 6, p.y);
        // Legs
        ctx.moveTo(p.x, p.y + 8);
        ctx.lineTo(p.x - 5, p.y + 18);
        ctx.moveTo(p.x, p.y + 8);
        ctx.lineTo(p.x + 5, p.y + 18);
        ctx.stroke();
      });

      const count = s.people.length;

      // Counter display
      const inRange = count >= TARGET_MIN && count <= TARGET_MAX;
      ctx.globalAlpha = 1;
      ctx.fillStyle = inRange ? color : 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${count} / ${TARGET_MAX} people`, canvas.width - 12, 20);
      ctx.textAlign = 'left';

      // Progress bar at top
      const barW = Math.min(count / TARGET_MAX, 1) * (canvas.width - 20);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(10, 28, canvas.width - 20, 4);
      ctx.fillStyle = inRange ? color : 'rgba(255,255,255,0.2)';
      ctx.fillRect(10, 28, barW, 4);

      // Target zone markers
      const minX = (TARGET_MIN / TARGET_MAX) * (canvas.width - 20) + 10;
      ctx.strokeStyle = `${color}88`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(minX, 24); ctx.lineTo(minX, 36);
      ctx.stroke();
      ctx.setLineDash([]);

      // Status message
      if (count === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('The square is empty. Click anywhere to add people.', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'left';
        onProgress(0, 'Empty square — click to add people');
      } else if (count < TARGET_MIN) {
        onProgress(Math.round((count / TARGET_MIN) * 80), `${count} people — need at least ${TARGET_MIN} to activate the square`);
      } else if (count <= TARGET_MAX) {
        // Win!
        s.won = true;
        onProgress(100, `${count} people — the square is alive!`);
        onWin(`${count} people now occupy Alexanderplatz. The square breathes again.`);
        return;
      } else {
        onProgress(60, `${count} people — too crowded! Stay between ${TARGET_MIN}–${TARGET_MAX}`);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [color, onProgress, onWin]);

  function handleClick(e) {
    if (stateRef.current.won) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Don't add if already at max
    if (stateRef.current.people.length >= TARGET_MAX) return;

    // Snap people to ground level area
    const groundY = canvas.height - 30 - 18;
    stateRef.current.people.push({ x, y: Math.min(y, groundY) });
  }

  return (
    <div className="game-canvas-wrap">
      <p className="game-instruction">
        Click on the square to add people. Fill it with {TARGET_MIN}–{TARGET_MAX} residents to complete the puzzle.
      </p>
      <canvas
        ref={canvasRef}
        width={440}
        height={240}
        className="game-canvas"
        onClick={handleClick}
        style={{ cursor: 'crosshair' }}
      />
    </div>
  );
}
