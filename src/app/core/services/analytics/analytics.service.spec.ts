import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('AnalyticsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    })
  );

  it('should be created', () => {
    const service: AnalyticsService = TestBed.get(AnalyticsService);
    expect(service).toBeTruthy();
  });
});
