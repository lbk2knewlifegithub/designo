import { envProd } from '@lbk/environments';

export const environment = {
  production: true,
  apiAuthUrl: envProd.apiAuthUrl,
  apiImagesUrl: envProd.apiImagesUrl,
  clientProductFeedbacksUrl: envProd.clientProductFeedbacksUrl,
};
