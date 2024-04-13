import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserRegister } from "../models/UserRegister";
import { Observable } from "rxjs";
import { Customer } from "../models/Customer";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor (private http: HttpClient) { }

    register(user: UserRegister): Observable<Customer> {
        return this.http.post<Customer>(`${environment.url}/customer/register`, user);
    }

    auth(user: UserRegister): Observable<Customer> {
        return this.http.get<Customer>(`${environment.url}/customer/auth?login=${user.login}&password=${user.password}`);
    }

    get (id: number): Observable<Customer> {
        return this.http.get<Customer>(`${environment.url}/customer?id=${id}`);
    }
}