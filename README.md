# Solution MicroService Starter

## Introduction

A sample fullstack codebase with MicroService structure, using monorepo to maintain the codes, and deployed in kubernetes

Online Sample Site:

- https://books.pocki.cc `app`
  - a sample fullstack app: angular + nest.js  
    <img src="./docs/img/sample-books-ui.png" alt="drawing" width="200"/>
- https://books.pocki.cc/api/v1 `backend rest api doc`
  <img src="./docs/img/api-swagger.png" alt="drawing" width="300"/>
  - you can login in with oauth accounts like google/github
- https://kubeview.pocki.cc `overall sight of services`  
    <img src="./docs/img/sample-kubeview.png" alt="drawing" width="600"/>
- helm repo is not public, containing environment specific configs

## TOC

- [Solution MicroService Starter](#solution-microservice-starter)
  - [Introduction](#introduction)
  - [TOC](#toc)
  - [Targets](#targets)
  - [Structure](#structure)
  - [Support Features](#support-features)
  - [Road map](#road-map)
  - [Contact Me](#contact-me)
  - [Thanks to](#thanks-to)
  - [References](#references)

## Targets

- High Efficient
  - Code Generation / Code First API
- Easy to maintain, Easy to develop business features
  - Unit Test and EndToEnd Test Coverage => Feature Correctness
  - Automatic Test
- Easy to Cooperate
  - Monorepo
  - Static Types
  - Generated Codes
  - Generated Docs
- Easy for Operations and Monitoring
  - service arranged by kubernetes
  - environment specific configuration
  - gitops: Operations managed by git

## Structure

```mermaid
graph TD
  subgraph client
    web(web::books-ui)
    other-client[others]
  end

  subgraph Cloud
    apigateway(ingress)
    authentication-center(authentication-center::keycloak)

    subgraph public-access
      bff-web(apigateway)
    end

    bff-web -- check access token --> authentication-center

    subgraph private-access
      proxy(proxy/vpn/...)
    end

    proxy -.-> business-svc
    proxy -.-> admin-console

    %% services
    subgraph services
      admin-console(admin-svc::not-implement)
      business-svc(business::books-service)
      task-svc(task-svc::not-implement)
    end

    subgraph basic
      DB[(DB)]
      MQ
      
    end
  end

  web -- route by url --> apigateway -- carry access token --> bff-web
  apigateway -- get access token -.- authentication-center

  bff-web
  bff-web 
  bff-web .-> business-svc

  admin-console --- DB
  business-svc --- DB
  authentication-center --- DB

```

## Support Features

- [x] containerized
  - [x] deployment arranged by helm
- [x] static type: typescript
- [ ] code gen
  - [x] rest-api(code-first): backend-code --> swagger/openapi schema/docs --> frontend client code
  - [ ] graphql (nodejs)
- [x] monorepo  

  ```bash
  # folder tree
  .
  ├── docs
  ├── packages
  │   ├── admin-service
  │   ├── admin-ui
  │   ├── books-service
  │   ├── books-ui
  │   └── task-service
  └── thirdparts
  ```

- [x] configs are transparent to code: config depends on environment
- [x] test
  - [x] local test friendly
  - [x] e2e test coverage  
    `overall coverage`  
    <img src="./docs/img/cov.png" alt="drawing" width="600"/>
    `src details`  
    <img src="./docs/img/cov2.png" alt="drawing" width="600"/>

## Road map

- [x] client code generated by api schema
- [x] sso, auth
  - [x] public/internal access
  - [ ] ? update account: username/password, user-info
- [ ] testing
  - [x] temporary service: database, etc..
  - [ ] ? mock third-party service
- [ ] ? polyglot backend
- [ ] ? RPC
- [ ] ? task queue
- [ ] CI
  - [ ] build image
  - [ ] testing and report
- [ ] CD
  - [ ] multi environment: production/test
- [ ] monitor
  - [ ] distributed tracing
  - [ ] logging collect

## Contact Me

Mail: pockynwaffle@gmail.com

Looking for backend full/part-time jobs

## Thanks to

- deployment
  - https://github.com/kubernetes/ `deployment solution`
  - https://github.com/helm/helm `deploy tool`
  - https://github.com/k3s-io/k3s/ `real runtime`
- infrastructure
  - https://github.com/keycloak/keycloak `SSO`
  - https://github.com/apache/apisix `application gateway`
- app
  - https://github.com/angular/angular `frontend`
  - https://github.com/nestjs `backend in nodejs`

## References

- https://12factor.net/
- <https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture>
- https://xuorig.medium.com/why-we-dont-see-many-public-graphql-apis-ad972bcb201e
- http://biercoff.com/my-small-investigation-about-swagger-codegen-generation-in-typescript/
- https://evgeniy-khyst.com/podman-testcontainers/ `testing`
