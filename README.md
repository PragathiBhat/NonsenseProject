# You Are The Algorithm
### Alexanderplatz Filter Reality Game

An interactive narrative experience where you play as an algorithm filtering urban data streams for Berlin's Alexanderplatz. Everything you filter out disappears.

---

## What is this?

You control five data categories flowing through Alexanderplatz:
- **People** — human presence on the square
- **Economy** — commercial activity and transactions
- **Environment** — green infrastructure and ecology
- **Memory** — historical layers and collective archive
- **Infrastructure** — transit, energy, and surveillance

Adjust the sliders. Watch the city change. Face the consequences.

---

## How to run it locally

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or later).

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How to deploy to GitHub Pages

**One-time setup:**

1. In your GitHub repository, go to **Settings → Pages**
2. Under "Source", select **GitHub Actions**
3. In `vite.config.js`, replace `'your-repo-name'` with your actual repository name:
   ```js
   base: '/your-actual-repo-name/',
   ```

**After that**, every time you push to `main`, the site automatically deploys.

---

## Project structure

```
src/
  App.jsx                    main app, handles screen transitions
  data/
    consequences.js          all game text, outcomes, color tokens
    mazeLayout.js            infrastructure maze grid
  hooks/
    useGameState.js          filter sliders, budget, override logic
  components/
    screens/
      EntryScreen.jsx        opening screen
      OverloadScreen.jsx     data overload animation
      GameScreen.jsx         main filter interface + city view
      EscapeScreen.jsx       escape room wrapper
      RevealScreen.jsx       final outcome screen
    game/
      CityView.jsx           animated SVG city visualization
      FilterPanel.jsx        sliders + consequence log
    escape/
      PeopleGame.jsx         click to add people mini-game
      MemoryGame.jsx         memory card matching game
      EnvGame.jsx            ecological balance scale game
      EconomyGame.jsx        ad removal economy game
      InfraGame.jsx          infrastructure maze drawing game
```

---

## Built with

- [Vite](https://vite.dev/) — build tool
- [React](https://react.dev/) — UI framework
- [Tailwind CSS](https://tailwindcss.com/) — utility styles
- [react-icons](https://react-icons.github.io/react-icons/) — icon library
