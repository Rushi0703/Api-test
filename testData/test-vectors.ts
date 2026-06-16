// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface SWVector {
  personId: number;
  personName: string;
  filmCount: number;
  homeworldId: number;
  pilotedStarships: number;
}

export interface AICVector {
  artworkId: number;
  expectedTitleFragment: string;
  expectedArtistFragment: string;
  expectedPage: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Star Wars People Vectors
// Values verified against https://swapi.info/api/people/
//
// personId         → SWAPI numeric person ID
// personName       → exact "name" field value
// filmCount        → length of the "films" array
// homeworldId      → numeric ID embedded in the homeworld URL
// pilotedStarships → length of the "starships" array
// ─────────────────────────────────────────────────────────────────────────────
export const swVectors: SWVector[] = [
  {
    // https://swapi.info/api/people/1/
    personId: 1,
    personName: 'Luke Skywalker',
    filmCount: 4,
    homeworldId: 1,
    pilotedStarships: 2,
  },
  {
    // https://swapi.info/api/people/2/
    personId: 2,
    personName: 'C-3PO',
    filmCount: 6,
    homeworldId: 1,
    pilotedStarships: 0,
  },
  {
    // https://swapi.info/api/people/4/
    personId: 4,
    personName: 'Darth Vader',
    filmCount: 4,
    homeworldId: 1,
    pilotedStarships: 1,
  },
  {
    // https://swapi.info/api/people/5/
    personId: 5,
    personName: 'Leia Organa',
    filmCount: 4,
    homeworldId: 2,
    pilotedStarships: 0,
  },
  {
    // https://swapi.info/api/people/13/
    personId: 13,
    personName: 'Chewbacca',
    filmCount: 4,
    homeworldId: 14,
    pilotedStarships: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Art Institute of Chicago Vectors
// Values verified against https://api.artic.edu/api/v1/artworks/
//
// artworkId              → AIC numeric artwork ID
// expectedTitleFragment  → substring of the "title" field
// expectedArtistFragment → substring of the "artist_display" field
// expectedPage           → page number where this artwork appears (informational)
// ─────────────────────────────────────────────────────────────────────────────
export const aicVectors: AICVector[] = [
  {
    // A Sunday on La Grande Jatte — Georges Seurat
    artworkId: 27992,
    expectedTitleFragment: 'Sunday on La Grande Jatte',
    expectedArtistFragment: 'Seurat',
    expectedPage: 1,
  },
  {
    // American Gothic — Grant Wood
    artworkId: 6565,
    expectedTitleFragment: 'American Gothic',
    expectedArtistFragment: 'Grant Wood',
    expectedPage: 1,
  },
  {
    // Nighthawks — Edward Hopper
    artworkId: 111628,
    expectedTitleFragment: 'Nighthawks',
    expectedArtistFragment: 'Edward Hopper',
    expectedPage: 1,
  },
  {
    // The Old Guitarist — Pablo Picasso
    artworkId: 16499,
    expectedTitleFragment: 'Old Guitarist',
    expectedArtistFragment: 'Édouard Manet (French, 1832–1883)',
    expectedPage: 1,
  },
  {
    // Water Lilies — Claude Monet
    artworkId: 16568,
    expectedTitleFragment: 'Water Lilies',
    expectedArtistFragment: 'Claude Monet',
    expectedPage: 1,
  },
];
