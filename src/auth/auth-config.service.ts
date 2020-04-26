import { AuthConfig } from './auth';
export class AuthConfigService implements AuthConfig {
  public clientID: string;
  public domain: string;
  public redirectUri: string;
  public returnTo: string;
  public scope: string;
  public audience: string;
  public responseType: string;
}
