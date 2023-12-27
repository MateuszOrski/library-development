using LibraryDbAccess;

namespace LibraryAPI
{
    public interface IHomeDetailsService
    {
        public Task<BookDetailsModel> GetBookDetails(int IdBook);

        public Task<bool> AddNewReservation(int IdBook, int idUser);



    }
    public class HomeDetailsService : IHomeDetailsService
    {
        private readonly LibraryDBContext _libraryDBContext;

        public HomeDetailsService(LibraryDbAccess.LibraryDBContext libraryDBContext)
        {
            _libraryDBContext = libraryDBContext;

        }
        public async Task<BookDetailsModel?> GetBookDetails(int IdBook)
        {

            BookDetailsModel? book = _libraryDBContext
                .Books
                .Where(x => x.Id == IdBook)
                .Join(
                _libraryDBContext.PublishingHouses,
                b => b.IdPublishingHouse,
                p => p.Id,
                (b, p) => new { b, p }
                )
                .Join(
                _libraryDBContext.Authors,
                ba => ba.b.IdAuthor,
                a => a.Id,
                (ba, a) => new {ba, a}
                )
                .Join(
                _libraryDBContext.Categories,
                bc => bc.ba.b.IdCategory,
                c => c.Id,
                (bc, c) => new BookDetailsModel
                {
                    Id = bc.ba.b.Id,
                    Title = bc.ba.b.Title,
                    Publishing = bc.ba.p.PublishingName,
                    Author = bc.a.AuthorName,
                    Category = c.CategoryName,
                    Description = bc.ba.b.BookDescription,
                    YearOfPublishment = bc.ba.b.YearOfPublishment,
                    Quantity = bc.ba.b.Quantity
                    
                })
                .FirstOrDefault();




            return book;
        }


        public async Task<bool> AddNewReservation(int IdBook, int idUser)
        {

            Reservation reservation = new Reservation();

            try
            {
               


                reservation.BookingDate = DateTime.Now.Date;
                reservation.IdBook = IdBook;
                reservation.IdClient = idUser;
                

                _libraryDBContext.Reservations.Add(reservation);
                _libraryDBContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

      

    }
}
