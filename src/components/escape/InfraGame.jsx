import { useEffect, useRef } from 'react';
import { MAZE } from '../../data/mazeLayout.js';

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const CELL = 30;
const START = { r: 0, c: 1 };
const END = { r: 7, c: 12 };

export default function InfraGame({ color, onProgress, onWin }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ path: [START], drawing: false, won: false });

  function draw(ctx) {
    const s = stateRef.current;
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.fillStyle = '#0e0e18';
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    // Draw maze cells
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * CELL, y = r * CELL;
        if (MAZE[r][c] === 1) {
          ctx.fillStyle = '#1a1a28';
          ctx.fillRect(x, y, CELL, CELL);
          ctx.strokeStyle = 'rgba(255,255,255,0.04)';
          ctx.strokeRect(x, y, CELL, CELL);
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.02)';
          ctx.fillRect(x, y, CELL, CELL);
        }
      }
    }

    // Start & End markers
    const sx = START.c * CELL, sy = START.r * CELL;
    ctx.fillStyle = 'rgba(80,200,100,0.3)';
    ctx.fillRect(sx, sy, CELL, CELL);
    ctx.fillStyle = '#5fc87a';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('S', sx + CELL / 2, sy + CELL / 2 + 4);

    const ex = END.c * CELL, ey = END.r * CELL;
    ctx.fillStyle = `${color}33`;
    ctx.fillRect(ex, ey, CELL, CELL);
    ctx.fillStyle = color;
    ctx.fillText('E', ex + CELL / 2, ey + CELL / 2 + 4);
    ctx.textAlign = 'left';

    // Draw path
    if (s.path.length > 1) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      s.path.forEach(({ r, c }, i) => {
        const px = c * CELL + CELL / 2, py = r * CELL + CELL / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Highlight path head
    const head = s.path[s.path.length - 1];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(head.c * CELL + CELL / 2, head.r * CELL + CELL / 2, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
    const ctx = canvas.getContext('2d');
    draw(ctx);

    function getCell(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      return { r: Math.floor(y / CELL), c: Math.floor(x / CELL) };
    }

    function isPassable(r, c) {
      return r >= 0 && r < ROWS && c >= 0 && c < COLS && MAZE[r][c] === 0;
    }
    function inPath(r, c) {
      return stateRef.current.path.some(p => p.r === r && p.c === c);
    }
    function isAdjacent(a, b) {
      return (Math.abs(a.r - b.r) + Math.abs(a.c - b.c)) === 1;
    }

    // Click S to start (or restart). Once started, just move the mouse —
    // no need to hold the button down.
    function onDown(e) {
      const cell = getCell(e);
      if (cell.r === START.r && cell.c === START.c) {
        stateRef.current.drawing = true;
        stateRef.current.path = [START];
        draw(ctx);
      }
    }

    function extendPath(cell) {
      const s = stateRef.current;
      if (!s.drawing || s.won) return;
      if (!isPassable(cell.r, cell.c)) return;
      const head = s.path[s.path.length - 1];
      // Same cell — nothing to do
      if (head.r === cell.r && head.c === cell.c) return;
      if (!isAdjacent(head, cell)) return;

      // Backtrack if revisiting an earlier cell
      const prevIdx = s.path.findIndex(p => p.r === cell.r && p.c === cell.c);
      if (prevIdx >= 0) {
        s.path = s.path.slice(0, prevIdx + 1);
      } else {
        s.path.push(cell);
      }

      // Check win
      if (cell.r === END.r && cell.c === END.c) {
        s.won = true;
        s.drawing = false;
        onWin('Infrastructure path complete. The grid reconnects.');
      }

      onProgress(
        Math.round((s.path.length / (ROWS * COLS * 0.3)) * 100),
        s.won ? 'Path complete!' : `Path: ${s.path.length} cells`
      );
      draw(ctx);
    }

    // Mouse move extends path freely — no button hold required
    function onMove(e) {
      extendPath(getCell(e));
    }

    // Click also extends path — lets player tap individual cells
    function onClick(e) {
      extendPath(getCell(e));
    }

    // mouseup does NOT stop drawing — player can lift and re-enter freely
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('click', onClick);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [color, onProgress, onWin]);

  return (
    <div className="game-canvas-wrap">
      <p className="game-instruction">
        Click S to start, then move your mouse through the corridors to reach E.
      </p>
      <canvas
        ref={canvasRef}
        className="game-canvas maze-canvas"
        style={{ cursor: 'crosshair', maxWidth: '100%' }}
      />
    </div>
  );
}
