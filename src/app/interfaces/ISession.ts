import { IApplicationCredentials } from './IApplicationCredentials';

export interface ISession {
  isAuthenticated?: boolean;
  appCredentials?: IApplicationCredentials;
}
