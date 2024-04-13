import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-active-order-customer',
  standalone: true,
  templateUrl: './active-order-customer.component.html',
  styleUrls: ['./active-order-customer.component.css']
})
export class ActiveOrderCustomerComponent {
  @Input() order: Order;

  getStatus(status: number): string {
    switch(status) {
      case 1:
        return "Принят, ждет очереди";
      case 2:
        return "Клинер к Вам выехал";
      case 3:
        return "Проходит уборка";
      default:
        return "Неизвестно";
    }
  }

  getCleanType(type: number): string {
    switch(type) {
      case 1:
        return "Стандартная";
      case 2:
        return "Сухая";
      case 3:
        return "После ремонта";
      case 4:
        return "Стандартная и окна";
      case 5:
        return "Генеральная";
      default:
        return "Неизвестно"
    }
  }

  getObjectType(type: number): string {
    switch(type) {
      case 1:
        return "Квартира";
      case 2:
        return "Частный дом";
      case 3:
        return "Частный дом и участок";
      case 4:
        return "Гараж";
      default:
        return "Неизвестно"
    }
  }
}
