import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ModalComponent implements OnInit {
  @Input() order: Order;
  @Output() closeEvent = new EventEmitter<Event>();
  @Output() cancelOrder = new EventEmitter<Order>();

  userId = null;
  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;
  
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
      this.userId = Number(localStorage.getItem("userId"));
      if (this.userId == null) {
        this.close();
      }
  }


  close(): void {
    this.closeEvent.emit();
  }

   cancel(): void {
    this.orderService.cancelOrder(this.userId, this.order.id).subscribe({
      next: (order) => {
        this.cancelOrder.emit(order);
        console.dir("Статус заказа изменен! ");
      },
      error: () => {
        console.dir("Ошибка изменения заказа!")
      }
    })
  }

  getStatus(status: number): string {
    return this.orderStatus.find(item => item.key === status).value;
  }

  getCleanType(type: number): string {
    return this.cleanType.find(item => item.key === type).value;
  }

  getObjectType(type: number): string {
    return this.objectType.find(item => item.key === type).value;
  }

}
