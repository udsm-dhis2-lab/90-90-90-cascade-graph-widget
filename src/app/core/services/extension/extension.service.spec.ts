import { TestBed } from '@angular/core/testing';
import { ExtensionService } from './extension.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ExtensionService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    })
  );

  it('should be created', () => {
    const service: ExtensionService = TestBed.get(ExtensionService);
    expect(service).toBeTruthy();
  });
});
