# Solution MicroService Starter

## why microservice?

- 兼容旧有系统
- 协作开发

## targets

- [ ] static type
- [ ] code gen
- [ ] monorepo
- [ ] local test friendly
- [ ] monitor
  - [ ] distributed tracing
  - [ ] logging
- [ ] graphql and rest

## structure

```mermaid
graph TD
  subgraph client
    web
    other-client[others]
  end

  subgraph Cloud
    apigateway

    subgraph bff
      bff-web
      bff-others
    end

    %% services
    subgraph services
      graphql-mesh-api
      sso
      dashboard
      admin-console
      business-svc
      task-svc
    end

    subgraph basic
      DB[(DB)]
      MQ
    end
  end

  web --> apigateway --> bff-web

  bff-web --> sso
  bff-others --> sso
  bff-web .-> admin-console
  bff-web .-> business-svc

  sso --- DB
  admin-console --- DB
  business-svc --- DB
 

```

## road map

- [ ] sso

## References

- <https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture>
