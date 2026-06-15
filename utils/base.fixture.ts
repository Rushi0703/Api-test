import {
  test as base,
  request,
  APIRequestContext
} from '@playwright/test';

type Fixtures = {
  swapiRequest: APIRequestContext;
  aicRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({

  swapiRequest: async ({}, use) => {

    const context = await request.newContext({
      baseURL: 'https://swapi.info',

      extraHTTPHeaders: {
        Accept: 'application/json'
      }
    });

    await use(context);

    await context.dispose();
  },

  aicRequest: async ({}, use) => {

    const context = await request.newContext({
      baseURL: 'https://api.artic.edu',

      extraHTTPHeaders: {
        Accept: 'application/json'
      }
    });

    await use(context);

    await context.dispose();
  }
});

export { expect } from '@playwright/test';