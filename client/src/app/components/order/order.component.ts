import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order
  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
      const userId = Number(localStorage.getItem("id"));
      const orderId = Number(this.route.snapshot.paramMap.get('id')); 
      if (!orderId) {
        console.dir("Не могу найти идентификатор заказа");
        this.router.navigate(['customer', 'main']);
        return;
      } 
      this.orderService.getOrderById(userId, orderId).subscribe({
        next: (order) => {
          this.order = order;
        },
        error: () => {
          console.dir("Ошибка при получении заказа по идентификатору");
          this.router.navigate(['customer', 'main']);
          return;
        }
      })
  }

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
