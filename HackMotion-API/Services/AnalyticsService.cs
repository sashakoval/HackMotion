using HackMotionApi.Contracts;
using HackMotionApi.Models;

namespace HackMotionApi.Services
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly string logFilePath = "analytics_log.txt";

        public void LogEvent(AnalyticsEvent analyticsEvent)
        {
            var logData = $"{analyticsEvent.Timestamp:yyyy-MM-dd HH:mm:ss} | {analyticsEvent.EventType} | " +
                          $"{analyticsEvent.UserId} | {analyticsEvent.PageUrl} | {analyticsEvent.BrowserInfo} | " +
                          $"{analyticsEvent.Device?.Name} | {analyticsEvent.Device?.Type} | {analyticsEvent.Device?.ScreenWidth}x{analyticsEvent.Device?.ScreenHeight} | " +
                          $"{analyticsEvent.IPAddress} | {analyticsEvent.AdditionalData}";

            File.AppendAllText(logFilePath, logData + Environment.NewLine);
        }
    }
}
