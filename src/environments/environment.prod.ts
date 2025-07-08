export const environment = {
  production: true,
  // apiUrl: 'https://algamoney-api.herokuapp.com',
  // tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  // tokenDisallowedRoutes: [/\/oauth\/token/],
  //oauthCallbackUrl: 'https://algamoney-api.herokuapp.com/authorized'

  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [/localhost:8080/],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'http://local-algamoney.com:8000/authorized'
};
