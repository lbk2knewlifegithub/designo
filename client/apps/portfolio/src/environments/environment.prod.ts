import { envProd } from '@lbk/environments';

export const environment = {
  production: true,
  clientProductFeedbacksUrl: envProd.clientProductFeedbacksUrl,
  clientDesignoUrl: envProd.clientDesignoUrl,
  clientAudiophileUrl: envProd.clientAudiophileUrl,
};
