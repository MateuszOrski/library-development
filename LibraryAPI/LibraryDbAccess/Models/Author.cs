using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class Author
    {
        public Author()
        {
            Books = new HashSet<Book>();
        }

        public int Id { get; set; }
        public string AuthorName { get; set; } = null!;

        public virtual ICollection<Book> Books { get; set; }
    }
}
