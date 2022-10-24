// not include secret variables

config = {
  configName: "default",

  // main host
  host: "http://localhost:14200",
  backendHost: "http://localhost:14201",

  // log
  logto: {
    endpoint: 'https://logto.pocki.cc',
    appId: 'AIONBgkMNra8acZnzpDEp',
    resources: [
      'http://localhost:14201/api/graphql',
      'http://localhost:14201/api/v1',
      'https://api.logto.io',
    ]
  },

  // keycloak
  keycloak: {
    realm: "showcase",
    clientId: "books-ui",
    url: "https://keycloak.pocki.cc/"
  }
}
