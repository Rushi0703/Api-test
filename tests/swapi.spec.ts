import { test,expect } from '../utils/base.fixture';
import{swVectors }from '../testData/test-vectors.ts';
import { startTest, endTest, addRuntimeData, fetchRuntimeData, getTestDataFromDB, getTestDataFromFaker, getTestDataFromJsonFile  } from '../utils/utilities';
import dotenv from 'dotenv';
dotenv.config();

test.describe('TC_001 API TestCase Template', () => {

  // Use following code to run testcase for multiple data sets
  // testData.runs.forEach((data, index) => {
  // test(`TC_001_runId_${index + 1}`, async ({ page }) => {

  // Use following code to Fetch test data from different sources
  // const data = getTestDataFromDB('select * from users', 'TC_001_runId_1');
  // const data = getTestDataFromFaker('person.firstName');
  // const data = getTestDataFromJsonFile('./testData/TD_TC_001.json');



swVectors.forEach(vector => {
    test(`SWAPI: ${vector.personName} appears in correct film count`, async ({ request,swapiRequest  }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest("TC_001_runId_1");

      let errorMessage: string | undefined;

      try {

     const response = await swapiRequest.get(
        `/api/people/${vector.personId}`
      );

      const data = await response.json();

      expect(response.status()).toBe(200);

      expect(data.name).toBe(vector.personName);

      expect(data.films.length).toBe(vector.filmCount);
    

      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest("TC_001_runId_1", logs, startTime, status, testInfo, errorMessage, );

      }

    });

  });



swVectors.forEach(vector => {
    test(`TC_Film Count: ${vector.personName} homeworld resolves`, async ({ request,swapiRequest  }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest("TC_001_runId_1");

      let errorMessage: string | undefined;

      try {

    const person = await swapiRequest.get(
        `/api/people/${vector.personId}`
      );

      const personData = await person.json();

      const world = await swapiRequest.get(
        personData.homeworld
      );

      const worldData = await world.json();

      expect(worldData.name).toBeTruthy();

      expect(typeof worldData.population)
        .toBe('string');
    

      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest("TC_001_runId_1", logs, startTime, status, testInfo, errorMessage, );

      }

    });

});   



swVectors.forEach(vector => {

test(`TC_Starships: ${vector.personName} starships`, async ({ request,swapiRequest  }, testInfo) => {

      // Add runtime data 
      //await addRuntimeData(testInfo.title, data);

      let status = 'passed';

      // Start the test
      const { logs, startTime } = await startTest("TC_001_runId_1");

      let errorMessage: string | undefined;

      try {

  
      const response = await swapiRequest.get(
        `/api/people/${vector.personId}`
      );

      const data = await response.json();

      expect(data.starships.length)
        .toBe(vector.pilotedStarships);

      } catch (error: any) {
        status = 'failed';
        errorMessage = error.message;
        throw error;
      } finally {

        // End the test
        await endTest("TC_001_runId_1", logs, startTime, status, testInfo, errorMessage, );

      }

    });

});  


   test('SWAPI: all people have required fields', async ({ swapiRequest }, testInfo) => {

  let status = 'passed';

  const { logs, startTime } = await startTest('TC_001_runId_4');

  let errorMessage: string | undefined;

  try {

    const response = await swapiRequest.get('/api/people/');

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBeTruthy();

    expect(data.length).toBeGreaterThan(80);

    data.forEach((person: any) => {
      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('films');
      expect(person).toHaveProperty('starships');
      expect(person).toHaveProperty('vehicles');
      expect(person).toHaveProperty('homeworld');
    });

  } catch (error: any) {
    status = 'failed';
    errorMessage = error.message;
    throw error;

  } finally {

    await endTest(
      'TC_001_runId_4',
      logs,
      startTime,
      status,
      testInfo,
      errorMessage
    );
  }
});       
 

});  



