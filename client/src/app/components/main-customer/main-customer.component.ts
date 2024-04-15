import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { ModalService } from 'src/app/services/ModalService';
import { OrderManager } from 'src/app/services/OrderManager';
import { OrderService } from 'src/app/services/OrderService';
import { ActiveOrderListComponent } from '../active-order-list/active-order-list.component';
import { HistoryOrderComponent } from '../history-order/history-order.component';
import { MakeOrderComponent } from '../make-order/make-order.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main-customer',
  standalone: true,
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css'],
  imports: [ModalComponent, ActiveOrderListComponent, MakeOrderComponent, HistoryOrderComponent, CommonModule]
})
export class MainCustomerComponent implements OnInit {
  customerId: number = -1;
  activeOrders: Order[] | undefined;
  doneOrders: Order[] | undefined;

  // isModalOpen = false;
  // currentOrder: Order;

  constructor (
    private router: Router,
    private orderService: OrderService,
    public modalService: ModalService,
    public orderManager: OrderManager
  ) {}

  ngOnInit(): void {
      this.customerId = Number(localStorage.getItem("id"));

      this.orderService.getActiveOrders(this.customerId).subscribe({
        next: (orders) => {
          this.activeOrders = orders;
          console.dir(this.activeOrders);
        },
        error: () => {
          console.dir("Ошибка при получении активных заказов!");
        }
      });

      this.orderService.getDoneOrders(this.customerId).subscribe({
        next: (orders) => {
          this.doneOrders = orders;
        },
        error: () => {
          console.dir("Ошибка при получении выполненных заказов!");
        }
      })
  }

  handleGoToUserPanel(): void {
    this.router.navigate(['customer', 'profile']);
  }

  // openModal (order: Order): void {
  //   this.currentOrder = order;
  //   this.isModalOpen = true;
  // }

  // closeModal (): void {
  //   this.isModalOpen = false;
  // }

  // cancelOrder (order: Order): void {
  //   console.dir("Заказ отменен");
  //   console.dir(order);
  // }
}
