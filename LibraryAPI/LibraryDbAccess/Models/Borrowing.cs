using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class Borrowing
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public int IdBook { get; set; }
        public DateTime DateOfBorrowing { get; set; }
        public int IdBorrowingEmployee { get; set; }
        public DateTime? DateOfReturning { get; set; }
        public int? IdPuttingEmployee { get; set; }

        public virtual Book IdBookNavigation { get; set; } = null!;
        public virtual User IdBorrowingEmployeeNavigation { get; set; } = null!;
        public virtual User IdClientNavigation { get; set; } = null!;
        public virtual User? IdPuttingEmployeeNavigation { get; set; }
    }
}
