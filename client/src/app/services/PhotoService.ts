import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Photo } from "../models/Photo";

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    constructor (
        private http: HttpClient
    ) {}

    public getPhotoById (reviewId: number): Observable<Photo[]> {
        return this.http.get<Photo[]>(`${environment.url}/${reviewId}/photo`);
    }
}