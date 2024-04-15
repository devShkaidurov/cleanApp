import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-active-order-customer',
  standalone: true,
  templateUrl: './active-order-customer.component.html',
  styleUrls: ['./active-order-customer.component.css']
})
export class ActiveOrderCustomerComponent {
  @Input() order: Order;
  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;

  getStatus(status: number): string {
    return this.orderStatus.find(item => item.key === status)?.value;
  }

  getCleanType(type: number): string {
    return this.cleanType.find(item => item.key === type)?.value;
  }

  getObjectType(type: number): string {
    return this.objectType.find(item => item.key === type)?.value;
  }
}
