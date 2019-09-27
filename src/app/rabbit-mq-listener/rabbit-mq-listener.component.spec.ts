import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitMqListenerComponent } from './rabbit-mq-listener.component';

describe('RabbitMqListenerComponent', () => {
  let component: RabbitMqListenerComponent;
  let fixture: ComponentFixture<RabbitMqListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabbitMqListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabbitMqListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
