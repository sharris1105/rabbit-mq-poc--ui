import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExampleDataService } from './example-data.service';


describe('ExampleDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ExampleDataService = TestBed.get(ExampleDataService);
    expect(service).toBeTruthy();
  });
});
