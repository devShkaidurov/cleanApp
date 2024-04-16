import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Review } from "../models/Review";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor (
        private http: HttpClient
    ) {}

    sendReview(orderId: number, photos: any, text: string, value: number): Observable<Review> {
        const payload = new FormData();
        payload.append("text", text);
        payload.append("value", value.toString());
        for (let i = 0; i < photos.length; i++) {
            payload.append("files", photos[i]);
        }
        return this.http.post<Review>(`${environment.url}/${orderId}/review`, payload);
    }

    getReviewById(orderId: number): Observable<Review> {
        return this.http.get<Review>(`${environment.url}/${orderId}/review`);
    }
}