import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { CleanerAdminDTO } from "../models/CleanerAdminDTO";
import { MakeOrder } from "../models/MakeOrder";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor (
        private http: HttpClient
    ) {}

    getCleaners (): Observable<CleanerAdminDTO[]> {
        return this.http.get<CleanerAdminDTO[]>(`${environment.url}/admin/cleaners`);
    }

    getActive (): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.url}/admin/active`);
    }

    getDone (): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.url}/admin/done`);
    }
}