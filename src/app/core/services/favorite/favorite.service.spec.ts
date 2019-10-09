import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FavoriteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    })
  );

  it('should be created', () => {
    const service: FavoriteService = TestBed.get(FavoriteService);
    expect(service).toBeTruthy();
  });
});
