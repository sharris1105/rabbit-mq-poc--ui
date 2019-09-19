import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { ErrorService } from './error.service';


describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule]
  }));

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });
});
