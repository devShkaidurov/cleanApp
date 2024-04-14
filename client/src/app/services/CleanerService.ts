import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../environments/environment";
import { Cleaner } from "../models/Cleaner";
import { UserRegister } from "../models/UserRegister";

@Injectable({
    providedIn: 'root'
})
export class CleanerService {
    constructor (private http: HttpClient) { }

    register(user: UserRegister): Observable<Cleaner> {
        return this.http.post<Cleaner>(`${environment.url}/cleaner/register`, user);
    }

    auth(user: UserRegister): Observable<Cleaner> {
        return this.http.get<Cleaner>(`${environment.url}/cleaner/auth?login=${user.login}&password=${user.password}`);
    }

    getAll (): Observable<Cleaner[]> {
        return this.http.get<Cleaner[]>(`${environment.url}/cleaner`);
    }
}