import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { ActiveOrderCustomerComponent } from '../active-order-customer/active-order-customer.component';

@Component({
  selector: 'app-active-order-list',
  standalone: true,
  templateUrl: './active-order-list.component.html',
  styleUrls: ['./active-order-list.component.css'],
  imports: [ActiveOrderCustomerComponent, CommonModule]
})
export class ActiveOrderListComponent {
  @Input() orders: Order[] | undefined;
}
