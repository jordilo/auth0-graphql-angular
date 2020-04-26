
# Auth0-Angular template

Template to implement quicky and easy a Auth0 engine with an Angular application.
## Previous requirements
* An Auth0 account [register here](https://auth0.com/)
* An Auth0 app configurated (clientId, allowed urls, etc.)

## How to configure?
* Download this template 
* Modify the name of the project in **angular.json** and **package.json**
* Modify environment  files to set the credentials of your Auth0 application.
   ``` typescript
   const  domain = 'YOUR-AUT0-DOMAIN.auth0.com';
   export  const  environment = {
		production:  false,
		appName:  jsonPackage.name,
		version:  'dev.' + jsonPackage.version,
		auth: {
		clientID:  'YOUR-AUT0-CLIENTID',
		domain,
		redirectUri:  'http://localhost:3000/callback',
		returnTo:  'http://localhost:3000',
		scope:  'openid profile email',
		audience:  `https://${domain}/userinfo`,
		responseType:  'token',
		}
	};
   ``` 
 * Run npm install
 * Run npm start
 * ENJOY !

