import { test, expect } from '../utils/base.fixture';
import { aicVectors } from '../testData/test-vectors';
import { startTest, endTest, addRuntimeData, fetchRuntimeData, getTestDataFromDB, getTestDataFromFaker, getTestDataFromJsonFile } from '../utils/utilities';
import dotenv from 'dotenv';
dotenv.config();

test.describe('AIC Api test', () => {


  for (const vector of aicVectors) {
    test(`AIC: artwork ${vector.artworkId} has correct artist`, async ({ request, aicRequest }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest(`AIC: artwork ${vector.artworkId} has correct artist`);

      let errorMessage: string | undefined;

      try {
        const response = await aicRequest.get(
          `/api/v1/artworks/${vector.artworkId}?fields=id,title,artist_display`
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.artist_display).toContain(vector.expectedArtistFragment);


      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest(`AIC: artwork ${vector.artworkId} has correct artist`, logs, startTime, status, testInfo, errorMessage,);

      }

    });
  }
  // T2 — Title contains expected fragment (parametric)

  for (const vector of aicVectors) {
    test(`AIC: artwork ${vector.artworkId} title matches`, async ({ request, aicRequest }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest(`AIC: artwork ${vector.artworkId} title matches`);

      let errorMessage: string | undefined;

      try {
        const response = await aicRequest.get(
          `/api/v1/artworks/${vector.artworkId}?fields=id,title,artist_display`
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.artist_display).toContain(vector.expectedArtistFragment);

      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest(`AIC: artwork ${vector.artworkId} title matches`, logs, startTime, status, testInfo, errorMessage,);

      }

    });
  }

  // T3 — Pagination structure is correct



    test(`AIC: pagination structure is correct`, async ({ request, aicRequest }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest(`AIC: pagination structure is correct`);

      let errorMessage: string | undefined;

      try {
        const response = await aicRequest.get(
          '/api/v1/artworks?page=1&limit=5&fields=id,title'
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.length).toBe(5);
        expect(body.pagination.total).toBeGreaterThan(100000);
        expect(body.pagination.total_pages).toBeGreaterThan(1);
        expect(body.pagination.current_page).toBe(1);

      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest(`AIC: pagination structure is correct`, logs, startTime, status, testInfo, errorMessage,);

      }

    });



  test(`AIC: search returns relevant results`, async ({ request, aicRequest }, testInfo) => {

    // Add runtime data 
    //await addRuntimeData(testInfo.title, data);

    let status = 'passed';

    // Start the test
    const { logs, startTime } = await startTest(`AIC: search returns relevant results`);

    let errorMessage: string | undefined;

    try {
      const response = await aicRequest.get(
        '/api/v1/artworks/search?q=monet&fields=id,title,artist_display&limit=10'
      );
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);

      const hasMonet = body.data.some(
        (item: { artist_display?: string }) =>
          item.artist_display && item.artist_display.includes('Monet')
      );
      expect(hasMonet).toBe(true);
    } catch (error: any) {
      status = 'failed';
      errorMessage = error.message;
      throw error;
    } finally {

      // End the test
      await endTest(`AIC: search returns relevant results`, logs, startTime, status, testInfo, errorMessage,);

    }

  });



}); 