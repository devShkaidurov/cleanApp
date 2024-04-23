import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderManager {
    public order$ = new Subject<Order>();
    public canceledOrder$ = new Subject<Order>();
    public doneOrder$ = new Subject<Order>();
}