import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerProfileComponent } from './cleaner-profile.component';

describe('CleanerProfileComponent', () => {
  let component: CleanerProfileComponent;
  let fixture: ComponentFixture<CleanerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleanerProfileComponent]
    });
    fixture = TestBed.createComponent(CleanerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
