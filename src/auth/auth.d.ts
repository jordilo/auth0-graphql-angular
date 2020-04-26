export interface AuthConfig {
  clientID: string;
  domain: string;
  redirectUri: string;
  returnTo: string;
  scope: string;
  audience: string;
  responseType: string;
}


export interface AuthUser {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
}
