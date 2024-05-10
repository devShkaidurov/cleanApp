import { trigger } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CleanerAdminDTO } from 'src/app/models/CleanerAdminDTO';
import { Order } from 'src/app/models/Order';
import { AdminService } from 'src/app/services/AdminService';
import { ModalService } from 'src/app/services/ModalService';
import { OrderManager } from 'src/app/services/OrderManager';
import { ActiveOrderListComponent } from '../../active-order-list/active-order-list.component';
import { HistoryOrderComponent } from '../../history-order/history-order.component';
import { TableAdminPanelComponent } from '../table-admin-panel/table-admin-panel.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [ActiveOrderListComponent, HistoryOrderComponent, TableAdminPanelComponent]
})
export class AdminPanelComponent implements OnInit {
  activeOrders: Order[];
  doneOrders: Order[];
  cleaners: CleanerAdminDTO[];
  modalService: ModalService = undefined;
  orderManager: OrderManager = undefined;

  constructor (
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getActive().subscribe({
      next: (orders) => {
        this.activeOrders = orders;
      },
      error: () => {
        console.error("Ошибка получения активных заказов (или их нет)");
      }
    });
    this.adminService.getDone().subscribe({
      next: (orders) => {
        this.doneOrders = orders;
      },
      error: () => {
        console.error("Ошибка получения выполненных заказов (или их нет)");
      }
    });
    this.adminService.getCleaners().subscribe({
      next: (cleaners) => {
        this.cleaners = cleaners;
      },
      error: () => {
        console.dir("Ошибка получения клинеров (или их нет)");
      }
    })
  }

  handleGoAuth(): void {
    this.router.navigate(['auth']);
  }


}
