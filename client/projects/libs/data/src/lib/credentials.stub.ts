import { Credentials } from '@lbk/models';

export const credentialsStub = (): Credentials => ({
  username: 'banana',
  password: 'what the fuck',
});

export const anotherCredentialsStub = (): Credentials => ({
  username: 'another',
  password: 'what the fuck',
});
