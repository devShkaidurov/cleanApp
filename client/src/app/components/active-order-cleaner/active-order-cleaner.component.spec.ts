import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrderCleanerComponent } from './active-order-cleaner.component';

describe('ActiveOrderCleanerComponent', () => {
  let component: ActiveOrderCleanerComponent;
  let fixture: ComponentFixture<ActiveOrderCleanerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveOrderCleanerComponent]
    });
    fixture = TestBed.createComponent(ActiveOrderCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
