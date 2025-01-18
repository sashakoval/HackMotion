using HackMotionApi.Models;

namespace HackMotionApi.Contracts
{
    public interface IAnalyticsService
    {
        public void LogEvent(AnalyticsEvent analyticsEvent);
    }
}
