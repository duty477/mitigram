import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notification} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private path = 'assets/data/notifications.json';

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves a list of notifications from the API.
   * @returns {Observable<Notification[]>} - An observable of notification data.
   */
  get notifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.path);
  }
}
