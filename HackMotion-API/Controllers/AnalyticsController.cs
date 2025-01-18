using HackMotionApi.Contracts;
using HackMotionApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HackMotionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        // POST api/analytics/log
        [HttpPost("log")]
        public IActionResult LogEvent([FromBody] AnalyticsEvent analyticsEvent)
        {
            if (analyticsEvent == null)
            {
                return BadRequest(new { message = "Invalid event data." });
            }

            _analyticsService.LogEvent(analyticsEvent);

            return Ok(new { message = "Event logged successfully" });
        }
    }
}
