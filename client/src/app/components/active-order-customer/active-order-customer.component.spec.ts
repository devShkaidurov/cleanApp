import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrderCustomerComponent } from './active-order-customer.component';

describe('ActiveOrderCustomerComponent', () => {
  let component: ActiveOrderCustomerComponent;
  let fixture: ComponentFixture<ActiveOrderCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveOrderCustomerComponent]
    });
    fixture = TestBed.createComponent(ActiveOrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
