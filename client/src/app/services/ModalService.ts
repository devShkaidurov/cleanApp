import { Injectable } from "@angular/core";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    public isModalOpen = true;
    public currentOrder: Order;
    
    openModal (order: Order): void {
        this.currentOrder = order;
        this.isModalOpen = true;
    }

    closeModal (): void {
        this.isModalOpen = false;
    }

    cancelOrder (order: Order): void {
        console.dir("Заказ отменен");
        console.dir(order);
    }
}