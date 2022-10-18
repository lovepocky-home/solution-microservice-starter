import { AuthnMiddleware } from './authn.middleware';

describe('AuthnMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthnMiddleware()).toBeDefined();
  });
});
