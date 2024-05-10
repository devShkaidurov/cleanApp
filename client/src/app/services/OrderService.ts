import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { MakeOrder } from "../models/MakeOrder";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor (
        private http: HttpClient
    ) {}

    getActiveOrders (userId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.url}/${userId}/order/active`);
    }

    getDoneOrders (userId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.url}/${userId}/order/done`);
    }

    makeOrder (userId: number, order: MakeOrder): Observable<Order> {
        return this.http.post<Order>(`${environment.url}/${userId}/order`, order);
    }
    
    cancelOrder (userId: number, orderId: number): Observable<Order> {
        return this.http.get<Order>(`${environment.url}/${userId}/order/${orderId}/cancel`);
    }

    getOrderById (userId: number, orderId: number): Observable<Order> {
        return this.http.get<Order>(`${environment.url}/${userId}/order/${orderId}`);
    }

    updateById(userId: number, orderId: number, order: Order):Observable<Order> {
        return this.http.put<Order>(`${environment.url}/${userId}/order/${orderId}`, order);
    }

}