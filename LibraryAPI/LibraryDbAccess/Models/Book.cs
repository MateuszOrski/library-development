using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class Book
    {
        public Book()
        {
            Borrowings = new HashSet<Borrowing>();
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int IdPublishingHouse { get; set; }
        public int IdAuthor { get; set; }
        public int IdCategory { get; set; }
        public string BookDescription { get; set; } = null!;
        public int YearOfPublishment { get; set; }
        public int Quantity { get; set; }

        public virtual Author IdAuthorNavigation { get; set; } = null!;
        public virtual Category IdCategoryNavigation { get; set; } = null!;
        public virtual PublishingHouse IdPublishingHouseNavigation { get; set; } = null!;
        public virtual ICollection<Borrowing> Borrowings { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
