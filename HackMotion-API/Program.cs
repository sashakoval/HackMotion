using HackMotionApi.Contracts;
using HackMotionApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()
              .SetIsOriginAllowed(origin => true);
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
