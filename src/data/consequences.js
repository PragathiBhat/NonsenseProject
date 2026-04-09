export const CATEGORIES = ['people', 'economy', 'env', 'memory', 'infra'];

export const CATEGORY_COLORS = {
  people: '#3B8BD4',
  economy: '#EF9F27',
  env: '#3a8c5c',
  memory: '#9b7fd4',
  infra: '#c0544a',
};

export const CATEGORY_LABELS = {
  people: 'People',
  economy: 'Economy',
  env: 'Environment',
  memory: 'Memory',
  infra: 'Infrastructure',
};

export const BUDGET_MAX = 260;

export const consequenceMessages = {
  people: {
    low: 'Human presence reduced below critical threshold — streets are empty, but safe from conflict.',
    mid: 'Population flows normalized — commuters, vendors, and residents co-exist.',
    high: 'Overcrowding detected — density creates friction, illness vectors multiply.',
  },
  economy: {
    low: 'Commerce filtered out — the plaza returns to civic space, stripped of transaction.',
    mid: 'Economic activity balanced — kiosks, services, and exchange persist.',
    high: 'Market saturation — every surface monetized, public space colonized by capital.',
  },
  env: {
    low: 'Green infrastructure removed — heat island effect accelerates, air quality drops.',
    mid: 'Ecological systems maintained — trees, soil, birds remain in equilibrium.',
    high: 'Rewilding override — vegetation reclaims transit paths and building edges.',
  },
  memory: {
    low: 'Historical layers deleted — 1969, 1989, the fountain, the wall — all erased.',
    mid: 'Collective memory preserved — traces of the past visible beneath the present.',
    high: 'Memory overwhelms the present — the plaza exists only as monument, frozen in time.',
  },
  infra: {
    low: 'Infrastructure suspended — trams stop, cables go dark, the grid disconnects.',
    mid: 'Systems operating within parameters — energy, transit, and data flows stable.',
    high: 'Infrastructural excess — surveillance density spikes, every node is monitored.',
  },
};

export const outcomes = {
  people: {
    low: {
      title: 'The Empty Plaza',
      text: 'You filtered out the people. Alexanderplatz is clean, quiet, optimized. The algorithm achieved what planners always wanted: a space without friction. Without delay. Without mess. The benches are empty. The pigeons have no one to beg from. Somewhere in the data, 847,291 human stories were marked as noise and removed.',
    },
    high: {
      title: 'The Overflow',
      text: 'You kept everyone. Every street vendor, every protester, every tourist, every ghost. The system cannot process this volume. Bodies become data becomes bodies. Alexanderplatz is a compression artifact — everything that was ever there, superimposed. The algorithm has no language for this much presence.',
    },
  },
  economy: {
    low: {
      title: 'The De-Monetized Square',
      text: 'You removed commerce. The kiosks went dark. The advertisements dissolved. What remained was… something older. People sitting on steps for no reason. Children running without destination. A square that existed outside of exchange. The algorithm flagged this as unproductive. The system flagged it as subversive. You let it happen anyway.',
    },
    high: {
      title: 'The Total Market',
      text: 'Every surface priced. Every moment monetized. The algorithm found efficiency in full economic saturation. Alexanderplatz became a transaction architecture — you move through it only as a consumer. The TV Tower sells its silhouette. The sky above it has been licensed.',
    },
  },
  env: {
    low: {
      title: 'The Heat Island',
      text: 'You removed the green. The trees went first — they were inefficient, unpredictable, soft infrastructure. Then the soil sealed over. Temperatures climbed 4°C above baseline. The plaza became a radiator. The data looks clean. The algorithm is satisfied. Nothing is growing.',
    },
    high: {
      title: 'The Rewilding',
      text: 'You let the green take over. The tram tracks disappeared beneath grass. The Fernsehturm wore a collar of ivy. The algorithm could not predict which path birds would take through the data stream. Alexanderplatz became unmappable — too alive, too contingent. You lost control. The plaza gained it back.',
    },
  },
  memory: {
    low: {
      title: 'Year Zero',
      text: 'You erased the past. The 1969 fountain never existed. The 1989 demonstrations — noise in the dataset, removed. The DDR streets renamed. The algorithm works in the eternal present: no inheritance, no debt, no grief. Alexanderplatz is new. It has always been new. It will always be new.',
    },
    high: {
      title: 'The Living Archive',
      text: 'You refused to forget anything. The plaza exists in all its time periods simultaneously — construction cranes and war rubble and modernist utopia and post-wall grief all layered. The algorithm cannot reconcile these versions. They keep bleeding through each other. This is not a bug. This is what cities are.',
    },
  },
  infra: {
    low: {
      title: 'The Dark Grid',
      text: 'You shut down the infrastructure. The trams stopped mid-route. The lights failed in sequence. Data connections severed. Alexanderplatz in darkness is a different place — intimate, dangerous, uncertain. People navigated by memory. The algorithm had nothing to process. For the first time, the square existed outside the network.',
    },
    high: {
      title: 'Total Surveillance',
      text: 'You maximized infrastructure. Every node active, every signal captured, every movement logged. Alexanderplatz became the most observed square kilometer in Europe. The algorithm knows exactly where you are standing right now. It has predicted your next three movements. It is already processing your absence.',
    },
  },
};
