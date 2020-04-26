import * as jsonPackage from './../../package.json';
const domain = 'YOUR-AUT0-DOMAIN.auth0.com';

export const environment = {
  production: false,
  appName: jsonPackage.name,
  version: 'dev.' + jsonPackage.version,
  auth: {
    clientID: 'YOUR-AUT0-CLIENTID',
    domain,
    redirectUri: 'http://localhost:3000/callback',
    returnTo: 'http://localhost:3000',
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
