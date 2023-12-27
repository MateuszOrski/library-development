using LibraryDbAccess;

namespace LibraryAPI
{
    public class ExpiredReservationsDeletionService : BackgroundService
    {
        private readonly ILogger<ExpiredReservationsDeletionService> _logger;

        public ExpiredReservationsDeletionService(ILogger<ExpiredReservationsDeletionService> logger)
        {
            _logger = logger;
        }        

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogDebug($"serwis is starting.");

            stoppingToken.Register(() =>
                _logger.LogDebug($" serwis background task is stopping."));

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogDebug($"GracePeriod task doing background work.");

                DeleteExpiredReservations();

                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }

            _logger.LogDebug($"serwis background task is stopping.");
        }

        private void DeleteExpiredReservations()
        {
            var dbContext = new LibraryDBContext();

            var expiredReservations = dbContext.Reservations.Where(r => r.BookingDate.AddDays(14) < DateTime.Today).ToArray();

            dbContext.RemoveRange(expiredReservations);
            dbContext.SaveChanges();
        }
    }
}
