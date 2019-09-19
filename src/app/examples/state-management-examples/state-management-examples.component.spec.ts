import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateManagementExamplesComponent } from './state-management-examples.component';

describe('StateManagementExamplesComponent', () => {
  let component: StateManagementExamplesComponent;
  let fixture: ComponentFixture<StateManagementExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateManagementExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateManagementExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
