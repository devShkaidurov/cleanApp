import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ModalComponent {
  @Input() order: Order;
  @Output() closeEvent = new EventEmitter<Event>();
  @Output() cancelOrder = new EventEmitter<Order>();

  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;

  close(): void {
    this.closeEvent.emit();
  }

  cancel(): void {
    this.cancelOrder.emit(this.order);
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
