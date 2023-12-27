using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class PublishingHouse
    {
        public PublishingHouse()
        {
            Books = new HashSet<Book>();
        }

        public int Id { get; set; }
        public string PublishingName { get; set; } = null!;

        public virtual ICollection<Book> Books { get; set; }
    }
}
