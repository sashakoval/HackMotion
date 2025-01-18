import { Device } from "./device";

export interface AnalyticsEvent {
    timestamp: string;
    eventType: string;
    userId: string;
    pageUrl: string;
    browserInfo: string;
    device: Device;
    ipAddress: string;
    additionalData: string;
}
