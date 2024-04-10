import { Component } from '@angular/core';
import { ActiveOrderCustomerComponent } from '../active-order-customer/active-order-customer.component';
import { HistoryOrderComponent } from '../history-order/history-order.component';
import { MakeOrderComponent } from '../make-order/make-order.component';

@Component({
  selector: 'app-main-customer',
  standalone: true,
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css'],
  imports: [ActiveOrderCustomerComponent, MakeOrderComponent, HistoryOrderComponent]
})
export class MainCustomerComponent {

}
