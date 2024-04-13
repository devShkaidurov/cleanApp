import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class MainCustomerComponent implements OnInit {
  customerId: number = -1;

  constructor (
    private router: Router
  ) {}

  ngOnInit(): void {
      this.customerId = Number(localStorage.getItem("id"));

      // взять историю заказов 
      // взять текущий заказ
  }

  handleGoToUserPanel(): void {
    this.router.navigate(['customer', 'profile']);
  }
}
