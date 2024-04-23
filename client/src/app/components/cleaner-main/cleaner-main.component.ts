import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservedValuesFromArray, Subscription } from 'rxjs';
import { ActiveOrderCleanerComponent } from 'src/app/components/active-order-cleaner/active-order-cleaner.component';
import { Cleaner } from 'src/app/models/Cleaner';
import { Order } from 'src/app/models/Order';
import { CleanerService } from 'src/app/services/CleanerService';
import { OrderManager } from 'src/app/services/OrderManager';
import { ActiveOrderListComponent } from '../active-order-list/active-order-list.component';
import { HistoryOrderComponent } from '../history-order/history-order.component';

@Component({
  selector: 'app-cleaner-main',
  standalone: true,
  templateUrl: './cleaner-main.component.html',
  styleUrls: ['./cleaner-main.component.css'],
  imports: [ActiveOrderListComponent, HistoryOrderComponent, ActiveOrderCleanerComponent]
})
export class CleanerMainComponent implements OnInit {
  activeOrders: Order[] = [];
  doneOrders: Order[] = [];
  currentOrder: Order;
  cleaner: Cleaner
  subsDone: Subscription;

  constructor (
    private router: Router,
    private cleanerService: CleanerService,
    public orderManager: OrderManager
  ) {}

    ngOnInit(): void {
      const cleanerId = Number(localStorage.getItem("id"));
      this.cleanerService.getById(cleanerId).subscribe({
        next: (cleaner) => {
          this.cleaner = cleaner;
          console.dir(cleaner);
          this.cleaner.orders.forEach(order => {
            if (order.status == -1 || order.status == -2)
              this.doneOrders.push(order);
            else
              this.activeOrders.push(order);
          })
          if (this.activeOrders.length == 0)
            return
          if (this.activeOrders.length == 1) {
            this.currentOrder = this.activeOrders.pop();
            return;
          }

          this.currentOrder = this.activeOrders[0];
          this.activeOrders.splice(0, 1);
        },
        error: () => {
          console.dir("Ошибка получение клинера!");
          this.router.navigate(['auth']);
        }
      })

      
      this.subsDone = this.orderManager.doneOrder$.subscribe(order => {
        this.doneOrders.splice(this.doneOrders.indexOf(order), 1);
        if (this.activeOrders.length == 0) {
          this.currentOrder = undefined;
          return
        }
          if (this.activeOrders.length == 1) {
            this.currentOrder = this.activeOrders.pop();
            return;
          }

          this.currentOrder = this.activeOrders[0];
          this.activeOrders.splice(0, 1);
      })
    }

  handleGoToUserPanel(): void {
    this.router.navigate(['cleaner', 'profile']);
  }

  setCurrentOrder (list: Order[], order: Order) {
    
  }
}
