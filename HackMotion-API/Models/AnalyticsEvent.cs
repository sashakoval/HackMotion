namespace HackMotionApi.Models
{
    public class AnalyticsEvent
    {
        public required string UserId { get; set; }
        public required string EventType { get; set; }
        public required string PageUrl { get; set; }
        public DateTime Timestamp { get; set; }
        public required string BrowserInfo { get; set; }
        public DeviceInfo? Device { get; set; }
        public string? IPAddress { get; set; }
        public object? AdditionalData { get; set; }
    }
}
