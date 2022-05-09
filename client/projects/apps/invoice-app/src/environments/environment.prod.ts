import { envProd } from '@lbk/environments';

export const environment = {
  production: true,
  apiUrl: envProd.apiUrl,
  githubOAuthClientId: envProd.githubOAuthClientId,
  currentHost: envProd.clientInvoiceApp,
};
