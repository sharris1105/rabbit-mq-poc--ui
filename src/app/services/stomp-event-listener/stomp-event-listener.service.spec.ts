import { inject, TestBed } from '@angular/core/testing';
import { StompEventListenerService } from './stomp-event-listener.service';


describe('MessageQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StompEventListenerService]
    });
  });

  it('should be created', inject([StompEventListenerService], (service: StompEventListenerService) => {
    expect(service).toBeTruthy();
  }));
});
