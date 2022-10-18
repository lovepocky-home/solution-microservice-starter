// not include secret variables

config = {
  configName: "default",

  // backend host
  host: "http://localhost:14200",

  // log
  logto: {
    endpoint: 'https://logto.pocki.cc',
    appId: 'AIONBgkMNra8acZnzpDEp',
    resources: [
      'http://localhost:14201/api/graphql'
    ]
  }
}
