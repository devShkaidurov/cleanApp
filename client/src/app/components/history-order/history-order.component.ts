import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';
import { OrderManager } from 'src/app/services/OrderManager';

@Component({
  selector: 'app-history-order',
  standalone: true,
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css'],
  imports: [CommonModule]
})
export class HistoryOrderComponent implements OnInit {
  @Input() orders: Order[];
  @Input() orderManager: OrderManager;
  @Input() isCustomer: boolean;

  subs: Subscription;
  doneSubs: Subscription;
  orderStatus = environment.orderStatus;

  constructor (
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.orderManager)
      return; 
    this.subs = this.orderManager.canceledOrder$.subscribe((order) => {
      console.dir(order);
      if (!this.orders)
        this.orders = [];
      this.orders.push(order);
    })
    this.doneSubs = this.orderManager.doneOrder$.subscribe((order) => {
      if (!this.orders)
        this.orders = [];
      this.orders.push(order);
    })
  }

  getStatus(status: number): string {
    return this.orderStatus.find(item => item.key === status)?.value;
  }

  handleGoToOrder(id: number): void {
    if (this.isCustomer) {
      this.router.navigate(['customer', 'order', id]);
      return;
    }
    this.router.navigate(['cleaner', 'order', id]);
  }
}
