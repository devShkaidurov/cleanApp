import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerMainComponent } from './cleaner-main.component';

describe('CleanerMainComponent', () => {
  let component: CleanerMainComponent;
  let fixture: ComponentFixture<CleanerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleanerMainComponent]
    });
    fixture = TestBed.createComponent(CleanerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
