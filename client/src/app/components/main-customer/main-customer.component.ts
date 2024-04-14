import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/OrderService';
import { ActiveOrderListComponent } from '../active-order-list/active-order-list.component';
import { HistoryOrderComponent } from '../history-order/history-order.component';
import { MakeOrderComponent } from '../make-order/make-order.component';

@Component({
  selector: 'app-main-customer',
  standalone: true,
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css'],
  imports: [ActiveOrderListComponent, MakeOrderComponent, HistoryOrderComponent]
})
export class MainCustomerComponent implements OnInit {
  customerId: number = -1;
  activeOrders: Order[] | undefined;
  doneOrders: Order[] | undefined;

  constructor (
    private router: Router,
    private orderService: OrderService
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


      // forkJoin([
      //   this.orderService.getActiveOrders(this.customerId),
      //   this.orderService.getDoneOrders(this.customerId)
      // ]).subscribe(([active, done]) => {
      //   this.activeOrders = active;
      //   console.dir(this.activeOrders);
      //   this.doneOrders = done;
      // });
  }

  handleGoToUserPanel(): void {
    this.router.navigate(['customer', 'profile']);
  }
}
