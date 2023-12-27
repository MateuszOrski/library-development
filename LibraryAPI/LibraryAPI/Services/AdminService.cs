using LibraryDbAccess;

namespace LibraryAPI
{
    public interface IAdminService
    {
        public Task<bool> ChangeUserRole(int accountID, int newRoleID);
        public Task<bool> ChangeAccountStatus(int accountID, bool newStatus);

    }

    public class AdminService : IAdminService
    {
        private readonly LibraryDBContext _libraryDBContext;

        public AdminService(LibraryDBContext libraryDBContext)
        {
            _libraryDBContext = libraryDBContext;
        }

        public async Task<bool> ChangeAccountStatus(int accountID, bool newStatus)
        {
            User? account = _libraryDBContext.Users.Where(user => user.Id == accountID).FirstOrDefault();

            if (account == null) return false;

            account.IsActive = newStatus;

            _libraryDBContext.Users.Update(account);
            _libraryDBContext.SaveChanges();

            return true;
        }

        public async Task<bool> ChangeUserRole(int accountID, int newRoleID)
        {
            User? account = _libraryDBContext.Users.Where(user => user.Id == accountID).FirstOrDefault();

            if (account == null) return false;

            account.IdRole = newRoleID;

            _libraryDBContext.Users.Update(account);
            _libraryDBContext.SaveChanges();

            return true;
        }
    }
}
