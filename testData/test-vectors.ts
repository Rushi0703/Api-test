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

export const swVectors: SWVector[] = [
  {
    personId: 1,
    personName: 'Luke Skywalker',
    filmCount: 4,
    homeworldId: 1,
    pilotedStarships: 2
  },

  {
    personId: 2,
    personName: 'C-3PO',
    filmCount: 6,
    homeworldId: 1,
    pilotedStarships: 0
  }
];

export const aicVectors: AICVector[] = [
  {
    artworkId: 129884,
    expectedTitleFragment: 'Water',
    expectedArtistFragment: 'Monet',
    expectedPage: 1
  }
];