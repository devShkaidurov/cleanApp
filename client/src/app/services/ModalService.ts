import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    public isModalOpen = false;
    public currentOrder: Order;
    public order$ = new Subject<Order>();
    
    openModal (order: Order): void {
        this.currentOrder = order;
        this.isModalOpen = true;
    }

    closeModal (): void {
        this.isModalOpen = false;
    }

    cancelOrder (order: Order): void {
        this.order$.next(order);
    }
}