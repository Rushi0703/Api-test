import { test, expect } from '../utils/base.fixture';

test.describe('Chain Tests', () => {
  // ─────────────────────────────────────────────────────────────────────────
  // Chain 1 — Cross-API data aggregation (5 steps in one test)
  // ─────────────────────────────────────────────────────────────────────────
  test('Cross-API data aggregation chain', async ({ swapiRequest, aicRequest, request }) => {
    // ── Step 1: Get Luke Skywalker ──────────────────────────────────────────
    const personResp = await swapiRequest.get('/api/people/1/');
    expect(personResp.status()).toBe(200);

    const person = await personResp.json();
    const filmUrl: string = person.films[0]; // first film URL

    // ── Step 2: Get the film from Step 1 ───────────────────────────────────
    const filmPath = new URL(filmUrl).pathname;          // /api/films/<id>/
    const filmResp = await swapiRequest.get(filmPath);
    expect(filmResp.status()).toBe(200);

    const film = await filmResp.json();
    const filmTitle: string = film.title;
    expect(Array.isArray(film.starships)).toBe(true);
    expect(film.starships.length).toBeGreaterThan(0);

    // ── Step 3: Get first starship from that film ───────────────────────────
    const starshipUrl: string = film.starships[0];
    const starshipPath = new URL(starshipUrl).pathname;  // /api/starships/<id>/
    const starshipResp = await swapiRequest.get(starshipPath);
    expect(starshipResp.status()).toBe(200);

    const starship = await starshipResp.json();
    const starshipName: string = starship.name;
    const maxSpeed: string = starship.max_atmosphering_speed;
    expect(typeof starshipName).toBe('string');
    expect(typeof maxSpeed).toBe('string');

    // ── Step 4: Fetch AIC artworks page 1, limit 3 ─────────────────────────
    const aicResp = await aicRequest.get(
      '/api/v1/artworks?page=1&limit=3&fields=id,title'
    );
    expect(aicResp.status()).toBe(200);

    const aicBody = await aicResp.json();
    expect(aicBody.data.length).toBe(3);

    // ── Step 5: POST to JSONPlaceholder with film title + starship name ─────
    const postResp = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: filmTitle,
        body: `Starship: ${starshipName}`,
        userId: 1,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(postResp.status()).toBe(201);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Chain 2 — SWAPI all-starships statistical validation
  // ─────────────────────────────────────────────────────────────────────────
  test('SWAPI all-starships statistical validation', async ({ swapiRequest }) => {
    const response = await swapiRequest.get('/api/starships/');
    expect(response.status()).toBe(200);

    const starships = await response.json();
    expect(Array.isArray(starships)).toBe(true);

    // Parse speeds, filtering out 'n/a' and 'unknown'
    const parseableSpeeds: number[] = starships
      .map((s: { max_atmosphering_speed: string }) => s.max_atmosphering_speed)
      .filter((v: string) => v !== 'n/a' && v !== 'unknown')
      .map((v: string) => parseInt(v, 10))
      .filter((n: number) => !isNaN(n));

    expect(parseableSpeeds.length).toBeGreaterThanOrEqual(5);

    const maxSpeed = Math.max(...parseableSpeeds);
    expect(maxSpeed).toBeGreaterThan(1000);
  });
});
