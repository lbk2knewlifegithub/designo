import { Error } from '@lbk/errors';

export enum GithubErrorKind {
  CODE_NOT_FOUND = 'CodeNotFound',
  GET_USER_FAILURE = 'GetUserFailure',
}

export type GithubError = Error<GithubErrorKind>;
