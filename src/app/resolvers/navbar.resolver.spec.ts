import { TestBed } from '@angular/core/testing';

import { NavbarResolver } from './navbar.resolver';

describe('NavbarResolver', () => {
  let resolver: NavbarResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NavbarResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
