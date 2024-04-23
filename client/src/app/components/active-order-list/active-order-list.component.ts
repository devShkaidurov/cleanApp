import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { ActiveOrderCustomerComponent } from '../active-order-customer/active-order-customer.component';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from 'src/app/services/ModalService';
import { Subject, Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/OrderService';
import { OrderManager } from 'src/app/services/OrderManager';
@Component({
  selector: 'app-active-order-list',
  standalone: true,
  templateUrl: './active-order-list.component.html',
  styleUrls: ['./active-order-list.component.css'],
  imports: [ModalComponent, ActiveOrderCustomerComponent, CommonModule, FormsModule]
})
export class ActiveOrderListComponent implements OnInit {
  @Input() modalService: ModalService | undefined;
  @Input() orders: Order[];
  @Input() orderManager: OrderManager;

  subs: Subscription;
  subsOrderAdd: Subscription;

  constructor (
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem("id"));
    if (this.modalService) {
      this.subs = this.modalService.order$.subscribe((order) => {
        this.orderService.cancelOrder(userId, order.id).subscribe({
          next: () => {
            const index = this.orders.findIndex(item => item.id === order.id);
            this.orders.splice(index, 1);
            this.modalService.isModalOpen = false;
            this.orderManager.canceledOrder$.next(order);
          },
          error: () => {
            console.dir("Возникла ошибка при отмене заказа!");
          }
        })
      })
    }

    this.subsOrderAdd = this.orderManager.order$.subscribe((order) => {
      if (!this.orders) {
        this.orders = [];
      }
      this.orders.push(order);
    })
  }

  openModal(order: Order): void {
    this.modalService.isModalOpen = true;
    this.modalService.currentOrder = order;
  }
  
}

