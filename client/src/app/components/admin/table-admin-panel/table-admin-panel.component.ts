import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CleanerAdminDTO } from 'src/app/models/CleanerAdminDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdminService } from 'src/app/services/AdminService';

@Component({
  selector: 'app-table-admin-panel',
  standalone: true,
  templateUrl: './table-admin-panel.component.html',
  styleUrls: ['./table-admin-panel.component.css'],
  imports: [CommonModule, MatTableModule, MatSortModule]
})
export class TableAdminPanelComponent implements AfterViewInit {
  cols: string[] = ['id', 'fio', 'avgReview', 'countOrders', 'salary'];
  dataSource = new MatTableDataSource(); 

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private adminService: AdminService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  
  ngAfterViewInit() {
    this.adminService.getCleaners().subscribe({
      next: (cleaners) => {
        this.dataSource = new MatTableDataSource(cleaners);
        this.dataSource.sort = this.sort;
      },
      error: () => {
        console.dir("Ошибка получения клинеров!");
      }
    })
  }

  announceSortChange(sortState: Sort) {
    console.dir(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handleChooseCleaner(e: Event): void {
    console.dir(e)
  }

  handleCreateCleaner(): void {
    
  }
}
