import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { ActiveOrderCustomerComponent } from '../active-order-customer/active-order-customer.component';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from 'src/app/services/ModalService';
@Component({
  selector: 'app-active-order-list',
  standalone: true,
  templateUrl: './active-order-list.component.html',
  styleUrls: ['./active-order-list.component.css'],
  imports: [ModalComponent, ActiveOrderCustomerComponent, CommonModule, FormsModule]
})
export class ActiveOrderListComponent {
  @Input() modalService: ModalService;
  @Input() orders: Order[] | undefined;

  constructor () {

  }

  openModal(order: Order): void {
    this.modalService.isModalOpen = true;
    this.modalService.currentOrder = order;
  }
  
}

