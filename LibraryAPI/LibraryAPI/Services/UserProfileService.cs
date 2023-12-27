using LibraryDbAccess;

namespace LibraryAPI
{
    public interface IUserProfileService
    {
        public Task<UserModel> GetUser(int userID);
        public Task<IQueryable<BorrowingForUserProfile>> GetCurrentBorrowings(string userName);

        public Task<IQueryable<ReservationForUserProfileModel>> GetCurrentReservations(string userName);

        public Task<IQueryable<BorrowingForUserProfile>> GetHistoryOfBorrowings(string userName);
        
        public Task<bool> CancelReservation(string userName, int idReservation);
        public Task<bool> DeleteReservation(int id, int? userID);
      
    }
    public class UserProfileService : IUserProfileService
    {
        private readonly LibraryDBContext _libraryDBContext;

        public UserProfileService(LibraryDBContext libraryDBContext)
        {
            _libraryDBContext = libraryDBContext;
        }
      


        public async Task<UserModel> GetUser(int userID)
        {
            User? user = _libraryDBContext.Users.Where(u => u.Id == userID).FirstOrDefault();

            if (user == null) return null;

            UserModel userModel = new UserModel();

            userModel.Id = userID;
            userModel.Email = user.Email;
            userModel.FirstName = user.FirstName;
            userModel.LastName = user.LastName;
            userModel.Role = _libraryDBContext.Roles.Where(role => role.Id == user.IdRole).First().RoleName;
            userModel.Login = user.UserName;
            userModel.IsActive = user.IsActive;

            return userModel;
        }

        public async Task<IQueryable<ReservationForUserProfileModel>> GetCurrentReservations(string userName)
        {
           
            IQueryable<ReservationForUserProfileModel> result = _libraryDBContext
                .Reservations
                .Where(x => x.IdClient == getUserID(userName))
                .Join(_libraryDBContext
                .Books,
                x => x.IdBook,
                b => b.Id,
                (x, b) => new {x, b} )
                .Join(_libraryDBContext
                .Authors,
                z => z.b.IdAuthor,
                a => a.Id,
                (z, a) => new ReservationForUserProfileModel
                {
                    Id = z.x.Id,
                    Title = z.b.Title,
                    Author = a.AuthorName,
                    BookingDate = z.x.BookingDate
                }
                )
                .AsQueryable();

            return result;
           
        }

        public async Task<bool> CancelReservation(string userName, int idReservation)
        {
          
            var reservation = _libraryDBContext.Reservations.FirstOrDefault(x => x.Id == idReservation && x.IdClient == getUserID(userName));
            if (reservation == null)
            {
                return false;
            }
            _libraryDBContext.Reservations.Remove(reservation);
            _libraryDBContext.SaveChanges();
            return true;

        }


        public async Task<IQueryable<BorrowingForUserProfile>> GetCurrentBorrowings(string userName)
        {
          
            var borrowings = GetBorrowings(userName, 1);
            return borrowings;
        }


        public async Task<IQueryable<BorrowingForUserProfile>> GetHistoryOfBorrowings(string userName)
        {

            return GetBorrowings(userName, 2);
        }


        private int getUserID(string login)
        {
            int userId = _libraryDBContext.Users.Where(x => x.UserName == login).Select(x => x.Id).FirstOrDefault();
            return userId;
        }

        private IQueryable<BorrowingForUserProfile> GetBorrowings(string userName, int option)
        {
        
         

            IQueryable<BorrowingForUserProfile> result = _libraryDBContext
               .Borrowings
               .Where(x => x.IdClient == getUserID(userName) && (x.DateOfReturning < getForGetBorrowings(option) || x.DateOfReturning == getForGetBorrowings(option)))
               .Join(_libraryDBContext
               .Books,
               x => x.IdBook,
               b => b.Id,
               (x, b) => new { x, b })
               .Join(_libraryDBContext
               .Authors,
               z => z.b.IdAuthor,
               a => a.Id,
               (z, a) => new BorrowingForUserProfile
               {
                   ID = z.x.Id,
                   Title = z.b.Title,
                   Author = a.AuthorName,
                   DateOfBorrowing = z.x.DateOfBorrowing,
                   DateOfReturning = z.x.DateOfReturning
               }
               )
               .AsQueryable();

            return result;


        }

        private DateTime? getForGetBorrowings(int option)
        {
            if(option == 1)
            {

                return null;
            }
            else
            {
                return DateTime.Now.Date;
            }
        }






        public async Task<bool> DeleteReservation(int id, int? userID=null)
        {
            if(userID != null)
            {
                var approveRow = _libraryDBContext.Reservations.Where(x => x.IdClient == userID).FirstOrDefault();
                if(approveRow == null)
                {
                    return false;
                }
            }
            var reservation = _libraryDBContext.Reservations.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                return false;
            }
            _libraryDBContext.Reservations.Remove(reservation);
            _libraryDBContext.SaveChanges();
            return true;
        }

    }
}
