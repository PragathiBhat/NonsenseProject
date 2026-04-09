export default function EntryScreen({ onDeploy }) {
  return (
    <div className="screen entry-screen">
      <div className="entry-content">
        <div className="entry-tag">URBAN DATA SYSTEM v4.2.1</div>
        <h1 className="entry-title">REALITIES REIMAGINED</h1>
        <div className="entry-location">Berlin · Alexanderplatz · 02:47</div>
        <p className="entry-subtitle">
          Every city generates data. Someone decides what gets filtered.
          <br />
          Today, that someone is you.
          <br /><br />
          You control five data streams flowing through Alexanderplatz.
          <br />
          Everything you filter out disappears.
        </p>
        <button className="btn btn-primary" onClick={onDeploy}>
          Deploy Filter System
        </button>
      </div>
      <div className="city-silhouette" aria-hidden="true">
        <svg viewBox="0 0 600 120" preserveAspectRatio="xMidYMax meet">
          {/* TV Tower */}
          <rect x="290" y="10" width="6" height="90" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="293" cy="40" rx="14" ry="14" fill="rgba(255,255,255,0.06)" />
          <rect x="291" y="5" width="4" height="30" fill="rgba(255,255,255,0.1)" />
          {/* Buildings */}
          <rect x="50" y="50" width="60" height="70" fill="rgba(255,255,255,0.04)" />
          <rect x="120" y="65" width="40" height="55" fill="rgba(255,255,255,0.04)" />
          <rect x="170" y="40" width="50" height="80" fill="rgba(255,255,255,0.05)" />
          <rect x="330" y="55" width="55" height="65" fill="rgba(255,255,255,0.04)" />
          <rect x="395" y="45" width="45" height="75" fill="rgba(255,255,255,0.04)" />
          <rect x="450" y="70" width="70" height="50" fill="rgba(255,255,255,0.03)" />
          {/* Ground */}
          <rect x="0" y="110" width="600" height="10" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>
    </div>
  );
}
