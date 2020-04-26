import * as jsonPackage from './../../package.json';
const domain = 'YOUR-AUT0-DOMAIN.auth0.com';

export const environment = {
  production: true,
  appName: jsonPackage.name,
  version:  jsonPackage.version,
  auth: {
    clientID: 'YOUR-AUT0-CLIENTID',
    domain,
    redirectUri: 'YOUR-APP-URL/callback',
    returnTo: 'YOUR-APP-URL',
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token',
  }
};
