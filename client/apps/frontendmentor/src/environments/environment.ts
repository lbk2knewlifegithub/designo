import { envDev } from '@lbk/environments';

export const environment = {
  production: false,
  apiUrl: envDev.apiUrl,
  githubOAuthClientId: envDev.githubOAuthClientId,
  currentHost: 'http://localhost:4206',
};
