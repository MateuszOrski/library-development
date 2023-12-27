using LibraryDbAccess;

namespace LibraryAPI
{
    public interface IEmployeeService 
    {
        public Task<IQueryable<UserModel>> SearchUser(string searchString);
        public Task<bool> AddNewBorrowing(NewBorrowingModel newBorrowingModel, int employeeID);

        public Task<bool> UpdateBorrowing(int idBorrowing, int employeeID);

   


    }

    public class EmployeeService : IEmployeeService
    {
        private readonly LibraryDBContext _libraryDBContext;
        private UserProfileService _userProfileService;

        public EmployeeService(LibraryDBContext libraryDBContext)
        {
            _libraryDBContext = libraryDBContext;
            _userProfileService = new UserProfileService(libraryDBContext);
        }
      

        public async Task<IQueryable<UserModel>> SearchUser(string searchString)
        {


            IQueryable<UserModel> user = _libraryDBContext
                .Users
                .Where(x => x.UserName.Contains(searchString) || x.Email.Contains(searchString) || x.FirstName.Contains(searchString) || x.LastName.Contains(searchString))
                .Take(50)
                .Join(
                _libraryDBContext.Roles,
                x => x.IdRole,
                r => r.Id,
                (x, r) => new UserModel
                {

                    Id = x.Id,
                    Login = x.UserName,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    IsActive = x.IsActive,
                    Role = r.RoleName

                }
                )
                .AsQueryable();


                return user;


        }

        public async Task<bool> AddNewBorrowing(NewBorrowingModel newBorrowingModel, int employeeID)
        {
            try
            {
                Borrowing borrowing = new Borrowing();
                
                int x = 0;
                x = _libraryDBContext.Reservations.Where(x => x.IdClient == newBorrowingModel.ID_Client && x.IdBook == newBorrowingModel.ID_Book).Select(x => x.Id).FirstOrDefault();
                if (x != 0)
                {
                  
                    if (await _userProfileService.DeleteReservation(x) == false)
                    {
                        return false;
                    }
                }


                borrowing.IdClient = newBorrowingModel.ID_Client;
                borrowing.IdBook = newBorrowingModel.ID_Book;
                borrowing.DateOfBorrowing = DateTime.Now.Date;
                borrowing.IdBorrowingEmployee = employeeID;

                _libraryDBContext.Add(borrowing);
                _libraryDBContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

     


        public async Task<bool> UpdateBorrowing(int idBorrowing, int employeeID)
        {
          

            if (employeeID == 0)
            {
                return false;
            }
            var borrowning = _libraryDBContext.Borrowings.FirstOrDefault(b => b.Id == idBorrowing);

            if (borrowning == null)
            {
                return false;
            }
            borrowning.DateOfReturning = DateTime.Now.Date;
            borrowning.IdPuttingEmployee = employeeID;
            _libraryDBContext.SaveChanges();


            return true;
        }



       
    }
}
