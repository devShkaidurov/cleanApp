import { CommonModule, formatNumber } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Cleaner } from 'src/app/models/Cleaner';
import { MakeOrder } from 'src/app/models/MakeOrder';
import { Order } from 'src/app/models/Order';
import { CleanerService } from 'src/app/services/CleanerService';
import { OrderManager } from 'src/app/services/OrderManager';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-make-order',
  standalone: true,
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class MakeOrderComponent implements OnInit {
  @Input() orderManager: OrderManager;

  orderForm = new FormGroup({
    order_type: new FormControl(""),
    clean_type: new FormControl(""),
    square: new FormControl(""),
    order_address: new FormControl(""),
    date: new FormControl(""),
    order_cleaner_id: new FormControl("")
  });

  objectType = environment.objectType;
  cleanType = environment.cleanType;
  cleanerList: string[] | undefined;
  cleaners: Cleaner[] | undefined;
  @Input() customerId: number;

  constructor (
    private orderService: OrderService,
    private cleanerService: CleanerService,
  ) {}

  ngOnInit(): void {
    this.cleanerService.getAll().subscribe({
      next: (cleaners) => {
        this.cleaners = cleaners;
        console.dir(this.cleaners);
      },
      error: () => {
        console.dir("Ошибка при получении клинеров, возможно их нет в системе!");
      }
    })
  }

  handleMakeOrder(): void {
    const order = {
      order_type: Number(this.orderForm.value.order_type),
      clean_type: Number(this.orderForm.value.clean_type),
      square: Number(this.orderForm.value.square),
      order_address: this.orderForm.value.order_address,
      date: new Date(this.orderForm.value.date),
      order_cleaner_id: Number(this.orderForm.value.order_cleaner_id)
    } as MakeOrder;

    this.orderService.makeOrder(this.customerId, order).subscribe({
      next: (order) => {
        console.dir("New order has ordered");
        console.dir(order);
        this.orderManager.order$.next(order);
      },
      error: () => {
        console.dir("Ошибка при создании заказа!");
      }
    })
  }
}
