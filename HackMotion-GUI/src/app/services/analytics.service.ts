import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyticsEvent } from '../models/analytics-event';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:7200/api/analytics/log';

  constructor(private http: HttpClient) {}

  logEvent(event: AnalyticsEvent): Observable<any> {
    return this.http.post(this.apiUrl, event, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}