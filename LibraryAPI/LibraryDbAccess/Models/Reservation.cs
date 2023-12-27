using System;
using System.Collections.Generic;

namespace LibraryDbAccess
{
    public partial class Reservation
    {
        public int Id { get; set; }
        public DateTime BookingDate { get; set; }
        public int IdBook { get; set; }
        public int IdClient { get; set; }
       

        public virtual Book IdBookNavigation { get; set; } = null!;
        public virtual User IdClientNavigation { get; set; } = null!;
    }
}
