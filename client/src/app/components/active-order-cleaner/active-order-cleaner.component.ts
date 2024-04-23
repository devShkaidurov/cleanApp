import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../../models/Order';
import { OrderManager } from '../../services/OrderManager';
import { OrderService } from '../../services/OrderService';

@Component({
  selector: 'app-active-order-cleaner',
  standalone: true,
  templateUrl: './active-order-cleaner.component.html',
  styleUrls: ['./active-order-cleaner.component.css'],
  imports: [DatePipe]
})
export class ActiveOrderCleanerComponent {
  @Input() order: Order;
  @Input() orderManager: OrderManager;
  orderStatus = environment.orderStatus;
  cleanType   = environment.cleanType;
  objectType  = environment.objectType;

  constructor (
    private orderService: OrderService
  ) {}
  
  getStatus(status: number): string {
    return this.orderStatus.find(item => item.key === status)?.value;
  }

  getCleanType(type: number): string {
    return this.cleanType.find(item => item.key === type)?.value;
  }

  getObjectType(type: number): string {
    return this.objectType.find(item => item.key === type)?.value;
  }

  getNextStatus(type: number): string {
    switch (type) {
      case 0:
        return "Я в пути!";
      case 1:
        return "Я на месте! Убираюсь...";
      case 2:
        return "Уборка завершена!";
      default: 
        return "Статус неизвестен! Возможно, заказ отмене!";
    }
  }

  handleChangeStatus(status: number): void {
    switch (status) {
      case 0:
        this.order.status = 1;
        break;
      case 1:
        this.order.status = 2;
        break;
      case 2:
        this.order.status = -1;
        break;
    }
    this.orderService.updateById(Number(localStorage.getItem("id")), this.order.id, this.order).subscribe({
      next: (order) => {
        this.order = order;
        if (this.order.status == -1) {
          // Удалить отсюда этот заказ и дать следующий из активных

          // Добавить его в историю заказов 

          // Из очереди удалить новый (который взяли в активный)
        }
      },
      error: () => {
        console.dir("Ошибка при изменении статуса текущего заказа!");
      }
    })
  }

  
}
