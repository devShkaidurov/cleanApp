import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdminPanelComponent } from './table-admin-panel.component';

describe('TableAdminPanelComponent', () => {
  let component: TableAdminPanelComponent;
  let fixture: ComponentFixture<TableAdminPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAdminPanelComponent]
    });
    fixture = TestBed.createComponent(TableAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
