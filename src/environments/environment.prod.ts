export const environment = {
  production: true,
  apiUrl: 'https://algamoney-angular.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
