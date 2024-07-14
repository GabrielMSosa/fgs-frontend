import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { itemsproviderResolver } from './itemsprovider.resolver';

describe('itemsproviderResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => itemsproviderResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
