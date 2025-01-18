import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';
import { Device } from './models/device';
import { AnalyticsEvent } from './models/analytics-event';
import { v4 as uuidv4 } from 'uuid';
import { IpifyService } from './services/apify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private FULL_VIDEO_WATCH_MESSAGE = 'Full Video Watch Event logged';
  private PAGE_VIEW_MESSAGE = 'Full Video Watch Event logged';
  private userId!: string;
  private userIp!: string;

  constructor(private analyticsService: AnalyticsService, private ipyfyService: IpifyService) { }

  public ngOnInit(): void {
    this.userId = uuidv4();

    this.ipyfyService.getIp().subscribe({
      next: (response) => {
        this.userIp = response.ip;
      },
      error: (err) => {
        console.error('Error fetching IP:', err);
      }
    });

    this.logPageViewEvent();
  }

  public onVideoEnded(): void {
    const deviceData = this.getDeviceData();

    const analyticsEvent = this.getAnalyticsEvent('fullVideoWatch', deviceData, 'Full video watch event');

    this.logEventData(analyticsEvent, this.FULL_VIDEO_WATCH_MESSAGE);
  }

  private logPageViewEvent(): void {
    const deviceData = this.getDeviceData();

    const analyticsEvent = this.getAnalyticsEvent('pageView', deviceData, 'Page View Event');

    this.logEventData(analyticsEvent, this.PAGE_VIEW_MESSAGE);
  }

  private getAnalyticsEvent(eventType: string, deviceData: Device, additionalData: string): AnalyticsEvent {
    return {
      timestamp: new Date().toISOString(),
      eventType: eventType,
      userId: this.userId,
      pageUrl: window.location.href,
      browserInfo: this.getBrowserInfo(),
      device: deviceData,
      ipAddress: this.userIp,
      additionalData: additionalData
    }
  }

  private logEventData(analyticsEvent: AnalyticsEvent, successMessage: string) {
    this.analyticsService.logEvent(analyticsEvent).subscribe({
      next: (response) => {
        console.log(successMessage, response);
      },
      error: (err) => {
        console.error('An error occurred while logging the event', err);
      }
    });
  }

  private getDeviceData(): Device {
    return {
      name: navigator.platform,
      type: this.getDeviceType(),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    };
  }

  private getDeviceType(): string {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('iphone') || platform.includes('android')) return 'mobile';
    if (platform.includes('ipad') || platform.includes('tablet')) return 'tablet';
    return 'desktop';
  }

  private getBrowserInfo(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    const browserRegex = {
      chrome: /chrome\/([\d.]+)/,
      firefox: /firefox\/([\d.]+)/,
      safari: /version\/([\d.]+).*safari/,
      edge: /edge\/([\d.]+)/
    };

    for (const [browser, regex] of Object.entries(browserRegex)) {
      const match = userAgent.match(regex);
      if (match) return `${browser.charAt(0).toUpperCase() + browser.slice(1)} ${match[1]}`;
    }

    return 'Unknown browser';
  }
}

