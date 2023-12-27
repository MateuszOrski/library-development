using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class User
    {
        public User()
        {
            BorrowingIdBorrowingEmployeeNavigations = new HashSet<Borrowing>();
            BorrowingIdClientNavigations = new HashSet<Borrowing>();
            BorrowingIdPuttingEmployeeNavigations = new HashSet<Borrowing>();
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Passwd { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int IdRole { get; set; }
        public bool IsActive { get; set; }

        public virtual Role IdRoleNavigation { get; set; } = null!;
        public virtual ICollection<Borrowing> BorrowingIdBorrowingEmployeeNavigations { get; set; }
        public virtual ICollection<Borrowing> BorrowingIdClientNavigations { get; set; }
        public virtual ICollection<Borrowing> BorrowingIdPuttingEmployeeNavigations { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
