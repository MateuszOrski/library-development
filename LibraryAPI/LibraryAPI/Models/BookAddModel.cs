namespace LibraryAPI
{
    public class BookAddModel
    {
      

        public int? BookId { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string Title { get; set; }
        public string Description { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public int AuthorID { get; set; }
        public int CategoryID { get; set; }
        public int PublishingHouseID { get; set; }
        public int YearOfPublishment { get; set; }
        public int Quantity { get; set; }
    }
}
