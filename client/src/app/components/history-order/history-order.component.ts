import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-history-order',
  standalone: true,
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css'],
  imports: [CommonModule]
})
export class HistoryOrderComponent {
  @Input() orderList: Order[];
}
